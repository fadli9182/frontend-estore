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

type ModalEditType = {
  refetch: () => void;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalTambah = ({ refetch, open, setOpen }: ModalEditType) => {
  const [loading, setLoading] = React.useState(false);

  const formSchema = z.object({
    nama_ruang: z.string().min(1, "Mohon masukan nama Ruang Kerja"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama_ruang: "",
    },
  });

  async function onSubmit(values) {
    setLoading(true);
    try {
      const res = await axiosServices().post(
        "/api/master-data/add-ruang-kerja",
        {
          ...values,
        }
      );
      if (res.status === 200) {
        toast({
          title: "Berhasil",
          description: "Ruang Kerja berhasil diupdate",
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
    setLoading(false);
  }

  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>
          <Plus className="mr-2" size={18} /> Tambah Ruang Kerja
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[700px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader className="p-6">
              <DialogTitle className="flex justify-between font-bold mb-4">
                {"Tambah"} Ruang Kerja
              </DialogTitle>
              <Separator />
              <div className="grid grid-cols-1 gap-4 text-start">
                <FormInput
                  name="nama_ruang"
                  label="Nama Ruang Kerja"
                  type={""}
                  types={"text"}
                  placeholder={"Masukan nama Ruang Kerja"}
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
              <Button
                type="submit"
                className="w-full md:w-32"
                disabled={loading}
              >
                {loading ? "Loading..." : "Simpan"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ModalTambah;
