import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { axiosServices } from "@/services/axios";
import {
  getLocalStorage,
  setLocalStorage,
} from "@/services/localStorageService";
import { useGetRuangKerja } from "@/hooks/useGetRuangKerja";
import FormInput from "@/components/features/input/FormInput";
import FormInputSelect from "@/components/features/input/FormInputSelect";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import LoadingFile from "@/components/loader/LoadingFile";
import { BASE_TITLE } from "@/config";

const UserProfilePage = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [selectedRuangKerja, setSelectedRuangKerja] = useState<any>(null);

  const dataUser = getLocalStorage("userData");

  const { dataList: optionsRuangKerja, isLoading: isLoadingRuangKerja } =
    useGetRuangKerja();

  const formSchema = z.object({
    fullname: z.string().min(1, "Mohon masukan nama lengkap anda"),
    no_identitas: z.string().min(1, "Mohon masukan NIP/NRP/NIK anda"),
    email: z.string().email("Bukan email yang valid"),
    no_wa: z.any(),
    id_ruang_kerja: z.number().min(1, "Mohon pilih ruang kerja anda"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      email: "",
      no_wa: "",
      no_identitas: "",
      id_ruang_kerja: "",
    },
  });

  useEffect(() => {
    if (dataUser) {
      form.setValue("fullname", dataUser.fullname);
      form.setValue("email", dataUser.email);
      form.setValue("no_wa", dataUser.no_wa);
      form.setValue("no_identitas", dataUser.no_identitas);
      form.setValue("id_ruang_kerja", dataUser.id_ruang_kerja);
    }
  }, []);

  async function onSubmit(data) {
    try {
      const response = await axiosServices().put("/api/users/update-profile", {
        ...data,
        id: dataUser.id,
        nama_ruang_kerja:
          selectedRuangKerja?.label || dataUser.nama_ruang_kerja,
        tipe_identitas: dataUser.tipe_identitas,
        username: dataUser.username,
      });
      if (response.status === 200) {
        toast({
          title: "Berhasil",
          description: "Data berhasil diubah",
        });
        setIsEdit(false);
        setLocalStorage("userData", {
          ...dataUser,
          fullname: data.fullname,
          email: data.email,
          no_wa: data.no_wa,
          no_identitas: data.no_identitas,
          id_ruang_kerja: data.id_ruang_kerja,
          nama_ruang_kerja:
            selectedRuangKerja?.label || dataUser.nama_ruang_kerja,
        });
      }
    } catch (error: any) {
      toast({
        title: "Gagal",
        description: error.response,
        variant: "destructive",
      });
    }
  }

  if (isLoadingRuangKerja) return <LoadingFile open={true} />;

  document.title = "Profil" + BASE_TITLE;

  return (
    <div className="h-[calc(100dvh-8rem)] flex flex-col ">
      <div className="bg-background rounded-xl border w-full">
        <h1 className="text-2xl font-bold px-3 pt-3 pb-2">Profil</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="w-full px-4">
              <Separator className="" />
              <div className="grid xl:grid-cols-2 my-3 gap-3 h-full">
                <FormInput
                  name="fullname"
                  label="Nama Lengkap"
                  placeholder={"Masukan nama lengkap Anda"}
                  types={"text"}
                  type={""}
                  disabled={!isEdit}
                />
                <FormInput
                  name="no_identitas"
                  label="NIP/NRP/NIK"
                  placeholder={"Masukan nomor identitas Anda"}
                  types={"text"}
                  type={""}
                  disabled={!isEdit}
                />
                <FormInput
                  name="email"
                  label="Email"
                  placeholder={"Masukan nama lengkap Anda"}
                  types={"text"}
                  type={""}
                  disabled={!isEdit}
                />

                <FormInput
                  name="no_wa"
                  label="No. WhatsApp"
                  placeholder={"Masukan nomor WhatsApp Anda"}
                  type={"number"}
                  types={"number"}
                  disabled={!isEdit}
                />

                <FormInputSelect
                  name="id_ruang_kerja"
                  options={optionsRuangKerja}
                  defaultValue={{
                    label: dataUser?.nama_ruang_kerja,
                    value: dataUser?.id_ruang_kerja,
                  }}
                  placeholder="Pilih Ruang Kerja"
                  setSelected={(e) => {
                    form.setValue("id_ruang_kerja", e.value);
                    setSelectedRuangKerja(e);
                  }}
                  label="Ruang Kerja"
                  isDisabled={!isEdit}
                />
              </div>
            </div>
            <div className="flex gap-3 justify-end p-4 bg-primary-foreground rounded-b-xl">
              {isEdit ? (
                <>
                  <Button className="w-40">Simpan</Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-40"
                    onClick={() => setIsEdit(false)}
                  >
                    Batal
                  </Button>
                </>
              ) : (
                <>
                  <div
                    onClick={() => setIsEdit(true)}
                    className="w-40 bg-primary rounded-lg text-background p-2 text-center cursor-pointer"
                  >
                    Edit
                  </div>
                </>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default UserProfilePage;
