import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import FormInputSelect from "@/components/features/input/FormInputSelect";
import FormInput from "@/components/features/input/FormInput";
import { axiosServices } from "@/services/axios";
import { toast } from "@/components/ui/use-toast";
import TypoH1 from "@/components/typhography/TypoH1";
import { DialogClose } from "@radix-ui/react-dialog";

const ModalTambahUser = ({ refetch, open, setOpen }) => {
  const [selectedRole, setSelectedRole] = React.useState<any>(null);

  const formSchema = z.object({
    fullname: z.string().min(1, "Mohon masukan nama lengkap anda"),
    username: z.string().min(1, "Mohon masukan username anda"),
    email: z.string().email("Bukan email yang valid"),
    no_wa: z.string().min(1, "Mohon masukan No. Whatsapp anda"),
    password: z.string().min(4, "Minimal 4 karakter"),
    confirm_password: z
      .string()
      .min(4, "Minimal 4 karakter")
      .refine((data) => {
        return data === form.getValues().password;
      }, "Kata sandi tidak sama"),
    role: z.string().min(1, "Mohon pilih role"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      username: "",
      email: "",
      no_wa: "",
      password: "",
      confirm_password: "",
      role: "",
    },
  });

  async function onSubmit(data: any) {
    try {
      const response = await axiosServices().post("/api/users/add-user", {
        ...data,
        role: selectedRole.value,
        status: "active",
      });
      if (response.status === 200) {
        toast({
          title: "Berhasil",
          description: "Akun berhasil dibuat",
        });
        refetch();
        setOpen(false);
      }
    } catch (error: any) {
      toast({
        title: "Gagal",
        description:
          "Akun gagal dibuat : " + error?.response?.data?.message || "",
        variant: "destructive",
      });
    }
  }

  const optionsRole = [
    {
      value: "user",
      label: "User",
    },
    {
      value: "admin",
      label: "Admin",
    },
  ];

  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>
          <Plus className="mr-2" size={18} /> Tambah
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[700px] max-h-full overflow-auto p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <TypoH1 className="text-center mb-4">Buat Akun</TypoH1>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <FormInput
                name="fullname"
                label="Nama Lengkap"
                placeholder={"Masukan nama lengkap Anda"}
                types={"text"}
                type={""}
              />

              <FormInput
                name={"username"}
                types={"text"}
                type={""}
                label={"Username"}
                placeholder={"Masukan Username"}
              />

              <FormInputSelect
                name="role"
                options={optionsRole}
                placeholder="Pilih Role Akun"
                setSelected={(e) => {
                  form.setValue("role", e.value);
                  setSelectedRole(e);
                }}
                label="Role Akun"
              />

              <FormInput
                name={"email"}
                label={"Email"}
                placeholder={"Masukan Email"}
                types={"text"}
                type={""}
              />

              <FormInput
                name={"no_wa"}
                types={"number"}
                label={"No. Whatsapp"}
                placeholder={"Masukan No. Whatsapp"}
                type={""}
              />

              <div></div>

              <FormInput
                name={"password"}
                label={"Password"}
                placeholder={"Masukan Password"}
                types={"password"}
                type={""}
              />

              <FormInput
                name={"confirm_password"}
                types="password"
                label={"Konfirmasi Password"}
                placeholder={"Masukan Konfirmasi Password"}
                type={""}
              />
            </div>

            <DialogClose asChild>
              <Button type="submit" className="w-full">
                Daftar
              </Button>
            </DialogClose>
          </form>
        </Form>
        <DialogClose asChild>
          <Button
            type="button"
            className="w-full"
            variant={"outline"}
            onClick={() => setOpen(false)}
          >
            Batal
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default ModalTambahUser;
