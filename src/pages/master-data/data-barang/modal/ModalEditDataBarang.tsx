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
import { BsPencilFill } from "react-icons/bs";
import { axiosServices, baseURL } from "@/services/axios";
import { useGetKategori } from "@/hooks/useGetKategori";
import { useGetSatuan } from "@/hooks/useGetSatuan";
import FormInputSelect from "@/components/features/input/FormInputSelect";
import { Label } from "@/components/ui/label";
import { FileUpload } from "primereact/fileupload";
import FormInputNumber from "@/components/features/input/FormInputNumber";

type ModalEditType = {
  refetch: () => void;
  data?: any;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalEditDataBarang = ({
  refetch,
  data,
  open,
  setOpen,
}: ModalEditType) => {
  const [loading, setLoading] = React.useState(false);
  const [selectedFiles, setSelectedFiles] = React.useState([]);
  const [selectedKategori, setSelectedKategori] = React.useState(null);
  const [selectedSatuan, setSelectedSatuan] = React.useState(null);

  const { dataList: optionsKategori } = useGetKategori();

  const { dataList: optionsSatuan } = useGetSatuan();

  const formSchema = z.object({
    nama_barang: z.string().min(1, "Mohon masukan nama Barang"),
    id_kategori: z.number().min(1, "Mohon pilih kategori Barang"),
    stok_barang: z.number().optional(),
    id_satuan: z.number().min(1, "Mohon pilih satuan Barang"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama_barang: "",
      id_kategori: "",
      stok_barang: 0,
      id_satuan: "",
    },
  });

  useEffect(() => {
    if (data) {
      form.setValue("nama_barang", data.nama_barang);
      form.setValue("id_kategori", data.id_kategori);
      form.setValue("stok_barang", data.stok_barang);
      form.setValue("id_satuan", data.id_satuan);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  async function onSubmitEdit(values) {
    setLoading(true);

    const formData = new FormData();
    formData.append("id_barang", data.id_barang);
    formData.append("nama_barang", values.nama_barang);
    formData.append("stok_barang", values.stok_barang);
    formData.append("id_kategori", values.id_kategori);
    formData.append("nama_kategori", selectedKategori || data.nama_kategori);
    formData.append("id_satuan", values.id_satuan);
    formData.append("nama_satuan", selectedSatuan || data.nama_satuan);
    // Cek apakah gambar dipilih
    if (selectedFiles && selectedFiles.length > 0) {
      // Jika gambar dipilih, tambahkan gambar ke FormData
      selectedFiles.forEach((file) => {
        formData.append("gambar", file);
      });
    }

    try {
      const res = await axiosServices().put(
        "/api/master-data/update-data-barang",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.status === 200) {
        toast({
          title: "Berhasil",
          description: "Data barang berhasil diupdate",
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
        <div
          className="flex items-center hover:font-bold w-full px-2 cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <BsPencilFill className="mr-3" size={16} /> Ubah
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-[700px] h-full overflow-auto md:h-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmitEdit)}>
            <DialogHeader className="p-6">
              <DialogTitle className="flex justify-between font-bold mb-4">
                {"Edit"} Ruang Kerja
              </DialogTitle>
              <Separator />
              <div className="grid grid-cols-1 gap-4 text-start">
                <div>
                  <Label className="font-bold">Pilih Gambar</Label>

                  <div className="flex justify-center my-3 gap-3">
                    {data?.gambar_barang &&
                      data?.gambar_barang?.map((item, index) => {
                        return (
                          <img
                            key={index}
                            src={`${baseURL}/uploads/${item}`}
                            alt={data.item}
                            className="w-20 h-20 object-cover rounded-md text-center"
                          />
                        );
                      })}
                  </div>

                  <FileUpload
                    name="gambar"
                    multiple={false}
                    accept="image/*"
                    maxFileSize={500000}
                    chooseLabel="Pilih"
                    uploadOptions={{
                      style: { display: "none" },
                    }}
                    onSelect={(e: any) => {
                      setSelectedFiles(e.files);
                    }}
                  />
                </div>
                <FormInput
                  name="nama_barang"
                  label="Nama Barang"
                  type={""}
                  types={"text"}
                  placeholder={"Masukan nama Barang"}
                />
                <FormInputNumber
                  label="Stok Barang"
                  name="stok_barang"
                  placeholder="Masukan jumlah stock barang"
                />
                <FormInputSelect
                  name="id_kategori"
                  label="Kategori Barang"
                  options={optionsKategori}
                  placeholder={"Masukan kategori Barang"}
                  defaultValue={{
                    value: data?.id_kategori,
                    label: data?.nama_kategori,
                  }}
                  setSelected={(e) => {
                    form.setValue("id_kategori", e.value);
                    setSelectedKategori(e.label);
                  }}
                />
                <FormInputSelect
                  name="id_satuan"
                  label="Satuan Barang"
                  options={optionsSatuan}
                  placeholder={"Masukan satuan Barang"}
                  defaultValue={{
                    value: data?.id_satuan,
                    label: data?.nama_satuan,
                  }}
                  setSelected={(e) => {
                    form.setValue("id_satuan", e.value);
                    setSelectedSatuan(e.label);
                  }}
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

export default ModalEditDataBarang;
