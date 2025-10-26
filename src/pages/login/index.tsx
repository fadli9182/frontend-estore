import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useForm } from "react-hook-form";

import useAuth from "../../hooks/useAuth";
import { BASE_TITLE } from "@/config";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import TypoParagraph from "@/components/typhography/TypoParagraph";
import TypoH1 from "@/components/typhography/TypoH1";
import { Label } from "@/components/ui/label";

type TData = {
  username: string;
  password: string;
};

const LoginPage = () => {
  const [type, setType] = useState("password");

  const { isLoading, login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (data: TData) => {
    login(data.username, data.password);
  };

  document.title = "Login" + BASE_TITLE;

  return (
    <main className="w-screen h-screen grid grid-cols-1 md:grid-cols-2 overflow-hidden bg-blue-200">
      <div className="w-full h-full bg-blue-500 shadow-2xl relative items-center justify-center hidden md:flex">
        <div className="w-full h-full bg-amber-500 shadow-2xl transform rotate-6 absolute top-0 left-0 rounded-3xl"></div>
        <div className="w-3/4 h-3/4 bg-blue-300 shadow-2xl transform -rotate-6 absolute top-22 left-22 rounded-3xl"></div>
        <div className="w-full h-full flex flex-col items-center justify-center z-10 gap-6">
          <h1 className="text-3xl font-bold">Selamat Datang di</h1>
          <div className="text-center"></div>
          <img
            src="/images/LogoBinaMarga.JPG"
            alt=""
            width={200}
            className="text-center mx-auto rounded-xl"
          />
          <p>Website Persediaan Kepegawaian dan Umum</p>
        </div>
      </div>
      <div className="rounded-xl flex justify-center items-center flex-auto">
        <div className="p-8 md:py-20 items-center shadow-2xl rounded-xl m-auto w-[350px] lg:w-[500px] xl:w-[600px] bg-background">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            {/* <h1 className="text-4xl text-center font-serif">Logo</h1> */}
            <img
              src="/images/LogoBinaMarga.JPG"
              alt=""
              width={200}
              className="text-center mx-auto block md:hidden"
            />

            <TypoH1 className="text-center my-4">Masuk Ke Akun</TypoH1>

            <div className="form-input w-full mb-6">
              <Label className="text-base font-semibold">Username</Label>

              <TypoParagraph className="text-xs text-gray-400">
                Masukan Username
              </TypoParagraph>

              <InputText
                className="form-input"
                placeholder="Masukan Username"
                {...register("username", { required: true })}
              />
              {errors.username && (
                <span
                  role="alert"
                  className="text-red-600 text-xs font-semibold"
                >
                  Mohon Masukan Username !
                </span>
              )}
            </div>
            <div className="form-control w-full mb-6">
              <Label className="text-base font-semibold">Kata Sandi</Label>
              <p className="text-xs text-gray-400">
                Masukan kata sandi yang sesuai
              </p>
              <div className="p-inputgroup">
                <InputText
                  className="form-input"
                  placeholder="Masukan Kata Sandi"
                  type={type}
                  {...register("password", { required: true })}
                />
                <span
                  className="p-inputgroup-addon"
                  onClick={() =>
                    setType(type === "password" ? "text" : "password")
                  }
                >
                  {type === "password" ? <AiFillEye /> : <AiFillEyeInvisible />}
                </span>
              </div>
              {errors.password && (
                <span
                  role="alert"
                  className="text-red-600 text-xs font-semibold"
                >
                  Mohon Masukan Kata Sandi !
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 items-center justify-center">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Loading..." : "Masuk"}
              </Button>

              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Atau
                </span>
              </div>
              <Link className="font-bold" to={"/register"}>
                <Button type="button" variant={"outline"} className="w-full">
                  Daftar
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
