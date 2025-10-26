import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import FormInput from "@/components/features/input/FormInput";
import { toast } from "@/components/ui/use-toast";
import { axiosServices } from "@/services/axios";

type ModalTambahType = {
  isEdit: boolean;
  refetch: () => void;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalTambah = ({ isEdit, refetch, open, setOpen }: ModalTambahType) => {
  const [loadingTambahUser, setLoadingTambahUser] = React.useState(false);

  const formSchema = z.object({
    nama_kategori: z.string().min(1, "Mohon masukan nama Kategori"),
    order_number: z.string().min(1, "Mohon masukan urutan Kategori"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama_kategori: "",
      order_number: "",
    },
  });

  async function onSubmit(values) {
    setLoadingTambahUser(true);
    try {
      const res = await axiosServices().post("/api/master-data/add-kategori", {
        ...values,
      });
      if (res.status === 200) {
        toast({
          title: "Berhasil",
          description: "Kategori berhasil ditambah",
        });
        refetch();
        setOpen(false);
      }
    } catch (error: any) {
      toast({
        title: "Gagal",
        description: error.response.data.message,
        variant: "destructive",
      });
    }
    setLoadingTambahUser(false);
  }

  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <Button
          variant={isEdit ? "outline" : "default"}
          onClick={() => setOpen(true)}
        >
          <Plus className="mr-2" size={18} /> Tambah Kategori
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[700px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader className="p-6">
              <DialogTitle className="flex justify-between font-bold mb-4">
                {isEdit ? "Edit" : "Tambah"} Kategori
              </DialogTitle>
              <Separator />
              <div className="grid grid-cols-1 gap-4 text-start">
                <FormInput
                  name="nama_kategori"
                  label="Nama Kategori"
                  type={""}
                  types={"text"}
                  placeholder={"Masukan nama Kategori"}
                />
                <FormInput
                  name="order_number"
                  label="Urutan Kategori"
                  type={""}
                  types={"text"}
                  placeholder={"Masukan urutan Kategori"}
                />
              </div>
            </DialogHeader>
            <DialogFooter className="bg-slate-50 p-4 rounded-b-lg flex gap-2 ">
              <DialogTrigger asChild>
                <Button
                  variant={"outline"}
                  className="w-full md:w-32"
                  onClick={() => setOpen(false)}
                >
                  Batal
                </Button>
              </DialogTrigger>
              <DialogTrigger asChild>
                <Button
                  type="submit"
                  className="w-full md:w-32"
                  disabled={loadingTambahUser}
                >
                  {loadingTambahUser ? "Loading..." : "Simpan"}
                </Button>
              </DialogTrigger>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ModalTambah;
