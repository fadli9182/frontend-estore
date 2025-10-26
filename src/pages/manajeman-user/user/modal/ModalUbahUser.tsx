import React, { useEffect } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
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

const ModalUbahUser = ({ dataUser, refetch, open, setOpen }) => {
  const [selectedRole, setSelectedRole] = React.useState<any>(null);

  const formSchema = z.object({
    fullname: z.string().min(1, "Mohon masukan nama lengkap anda"),
    username: z.string().min(1, "Mohon masukan username anda"),
    email: z.string().email("Bukan email yang valid"),
    no_wa: z.string().min(1, "Mohon masukan No. Whatsapp anda"),
    current_password: z.string().optional(),
    new_password: z.string().optional(),
    role: z.string().min(1, "Mohon pilih role"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      username: "",
      email: "",
      no_wa: "",
      role: "",
      current_password: "",
      new_password: "",
    },
  });

  useEffect(() => {
    form.setValue("fullname", dataUser.fullname);
    form.setValue("username", dataUser.username);
    form.setValue("email", dataUser.email);
    form.setValue("no_wa", dataUser.no_wa);
    form.setValue("role", dataUser.role);

    setSelectedRole({
      value: dataUser.role,
      label: dataUser.role,
    });
  }, [dataUser]);

  async function onSubmit(data: any) {
    try {
      const response = await axiosServices().put("/api/users/update-user", {
        ...data,
        id: dataUser?.id,
        role: selectedRole.value,
        status: "active",
      });
      if (response.status === 200) {
        toast({
          title: "Berhasil",
          description: "Akun berhasil diubah",
        });
        refetch();
        setOpen(false);
      }
    } catch (error: any) {
      toast({
        title: "Gagal",
        description:
          "Akun gagal diubah : " + error?.response?.data?.message || "",
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
        <Button
          variant="ghost"
          className="w-full items-center justify-start"
          onClick={() => setOpen(true)}
        >
          <Edit className="mr-2" size={15} /> <span>Edit</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[700px] max-h-full overflow-auto p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <TypoH1 className="text-center mb-4">Ubah Akun</TypoH1>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <FormInput
                name="fullname"
                label="Nama Lengkap"
                placeholder={"Masukan nama lengkap Anda"}
                types={"text"}
                type={""}
              />

              <FormInput
                name="no_identitas"
                types={"text"}
                type={""}
                label={"NIP/NRP/NIK"}
                placeholder={"Masukan NIP/NRP/NIK"}
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
                value={selectedRole}
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

              <FormInput
                name={"current_password"}
                label={"Password Lama (Opsional)"}
                placeholder={"Masukan Password Lama"}
                types={"text"}
                type={""}
              />

              <FormInput
                name={"new_password"}
                types="text"
                label={"Password Baru (Opsional)"}
                placeholder={"Masukan Password Baru"}
                type={""}
              />
            </div>

            <DialogClose asChild>
              <Button type="submit" className="w-full">
                Ubah User
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

export default ModalUbahUser;
