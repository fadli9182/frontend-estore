/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import FormInput from "@/components/features/input/FormInput";
import { toast } from "@/components/ui/use-toast";
import { axiosServices } from "@/services/axios";
import { BsPencilFill } from "react-icons/bs";

type ModalEditType = {
  refetch: () => void;
  data?: any;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalEditSatuan = ({ refetch, data, open, setOpen }: ModalEditType) => {
  const [loadingTambahUser, setLoadingTambahUser] = React.useState(false);

  const formSchema = z.object({
    nama_satuan: z.string().min(1, "Mohon masukan nama Satuan"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama_satuan: "",
    },
  });

  useEffect(() => {
    form.setValue("nama_satuan", data.nama_satuan);
  }, [data]);

  async function onSubmitEdit(values: any) {
    setLoadingTambahUser(true);
    try {
      const res = await axiosServices().put("/api/master-data/update-satuan", {
        ...values,
        id_satuan: data.id_satuan,
      });
      if (res.status === 200) {
        toast({
          title: "Berhasil",
          description: "Satuan berhasil diubah",
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
        <div
          className="flex items-center hover:font-bold w-full px-2 cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <BsPencilFill className="mr-3" size={16} /> Ubah
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-[700px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmitEdit)}>
            <DialogHeader className="p-6">
              <DialogTitle className="flex justify-between font-bold mb-4">
                {"Edit"} Satuan
              </DialogTitle>
              <Separator />
              <div className="grid grid-cols-1 gap-4 text-start">
                <FormInput
                  name="nama_satuan"
                  label="Nama Satuan"
                  type={""}
                  types={"text"}
                  placeholder={"Masukan nama satuan"}
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

export default ModalEditSatuan;
