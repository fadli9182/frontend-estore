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

const ModalTambahSuplier = ({ refetch, open, setOpen }) => {
  const [loadingTambahUser, setLoadingTambahUser] = React.useState(false);

  const formSchema = z.object({
    nama_supplier: z.string().min(1, "Mohon masukan nama supplier"),
    no_telp_supplier: z.string().min(1, "Mohon masukan no telepon supplier"),
    alamat_supplier: z.string().min(1, "Mohon masukan alamat supplier"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama_supplier: "",
      no_telp_supplier: "",
      alamat_supplier: "",
    },
  });

  async function onSubmit(values) {
    setLoadingTambahUser(true);
    try {
      const res = await axiosServices().post("/api/supplier/add-supplier", {
        ...values,
      });
      if (res.status === 200) {
        toast({
          title: "Berhasil",
          description: "Suplier berhasil ditambahkan",
        });
        refetch();
        setOpen(false);
      }
    } catch (error) {
      toast({
        title: "Gagal",
        description: "Terjadi kesalahan",
      });
    }

    setLoadingTambahUser(false);
  }

  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>
          <Plus className="mr-2" size={18} /> Tambah Suplier
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[700px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader className="p-6">
              <DialogTitle className="flex justify-between font-bold mb-4">
                {"Tambah"} Suplier
              </DialogTitle>
              <Separator />
              <div className="grid grid-cols-1 gap-4 text-start">
                <FormInput
                  name="nama_supplier"
                  label="Nama Suplier"
                  type={"text"}
                  types={""}
                  placeholder={"Masukan nama suplier"}
                />

                <FormInput
                  name="no_telp_supplier"
                  label="Nomor Telepon"
                  type={"text"}
                  types={""}
                  placeholder={"Masukan no telepon supplier"}
                />
                <FormInput
                  name="alamat_supplier"
                  label="Alamat"
                  type={"textarea"}
                  placeholder={"Masukan alamat supplier"}
                  types={""}
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
                disabled={loadingTambahUser}
              >
                {loadingTambahUser ? "Loading..." : "Simpan"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ModalTambahSuplier;
