import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/features/input/FormInput";
import { axiosServices } from "@/services/axios";
import TypoH1 from "@/components/typhography/TypoH1";
import TypoParagraph from "@/components/typhography/TypoParagraph";
import { BASE_TITLE } from "@/config";

const RegisterPage = () => {
  const navigate = useNavigate();

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
    },
  });

  async function onSubmit(data: any) {
    try {
      const response = await axiosServices().post("/api/users/add-user", {
        ...data,
        role: "user",
        status: "active",
      });
      if (response.status === 200) {
        toast({
          title: "Berhasil",
          description: "Akun berhasil dibuat",
        });
        navigate("/login");
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

  document.title = "Register" + BASE_TITLE;

  return (
    <div className="w-screen h-screen overflow-y-auto flex flex-col bg-[#FAFAFA]">
      <div className="rounded-xl flex justify-center items-center flex-auto my-3 w-full">
        <div className="p-12 items-center bg-background shadow-lg rounded-xl m-auto w-[350px] lg:w-[500px] xl:w-[600px] h-full md:h-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
              <TypoH1 className="text-center mb-4">Register Akun</TypoH1>

              <div className="mb-6 space-y-3">
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

              <Button type="submit" className="w-full">
                Daftar
              </Button>
            </form>
          </Form>

          <TypoParagraph className="font-normal mt-2">
            Sudah punya akun ? Silahkan{" "}
            <NavLink to="/login">
              <strong>Login</strong>
            </NavLink>
          </TypoParagraph>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
