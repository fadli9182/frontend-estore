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
import FormInputSelect from "@/components/features/input/FormInputSelect";
import { useGetKategori } from "@/hooks/useGetKategori";
import { useGetSatuan } from "@/hooks/useGetSatuan";
import { axiosServices } from "@/services/axios";
import { FileUpload } from "primereact/fileupload";
import { Label } from "@/components/ui/label";

type ModalTambahType = {
  refetch: () => void;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalTambah = ({ refetch, open, setOpen }: ModalTambahType) => {
  const [loading, setLoading] = React.useState(false);
  const [selectedFiles, setSelectedFiles] = React.useState([]);
  const [selectedKategori, setSelectedKategori] = React.useState(null);
  const [selectedSatuan, setSelectedSatuan] = React.useState(null);

  const { dataList: optionsKategori } = useGetKategori();

  const { dataList: optionsSatuan } = useGetSatuan();

  const formSchema = z.object({
    nama_barang: z.string().min(1, "Mohon masukan nama barang"),
    id_kategori: z.number().min(1, "Mohon masukan kategori barang"),
    id_satuan: z.number().min(1, "Mohon pilih satuan barang"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama_barang: "",
      id_kategori: "",
      id_satuan: "",
    },
  });

  async function onSubmit(values) {
    setLoading(true);

    const randomedId = `BRG-${Math.floor(1000 + Math.random() * 9000)}`;

    const formData = new FormData();
    formData.append("id_barang", randomedId);
    formData.append("nama_barang", values.nama_barang);
    formData.append("stok_barang", values.stok_barang);
    formData.append("id_kategori", values.id_kategori);
    formData.append("nama_kategori", selectedKategori || "");
    formData.append("id_satuan", values.id_satuan);
    formData.append("nama_satuan", selectedSatuan || "");
    if (Array.isArray(selectedFiles) && selectedFiles.length > 0) {
      (selectedFiles as File[]).forEach((file) => {
        formData.append("gambar", file);
      });
    }

    try {
      const res = await axiosServices().post(
        "/api/master-data/add-data-barang",
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
          description: "Data Barang berhasil ditambah",
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
          <Plus className="mr-2" size={18} /> Tambah Barang
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[700px] max-h-full overflow-y-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader className="p-6">
              <DialogTitle className="flex justify-between font-bold mb-4">
                {"Tambah"} Barang
              </DialogTitle>
              <Separator />
              <div className="grid grid-cols-1 gap-4 text-start">
                <div>
                  <Label className="font-bold">Pilih Gambar</Label>
                  <FileUpload
                    name="gambar"
                    multiple={false}
                    accept="image/*"
                    maxFileSize={1100000}
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
                {/* <FormInputNumber
                  value={form.watch("stok_barang")}
                  onValueChange={(e) => {
                    form.setValue("stok_barang", e.value);
                  }}
                  label="Stok Barang"
                  name="stok_barang"
                  placeholder="Masukan jumlah stock barang"
                /> */}

                <FormInputSelect
                  name="id_kategori"
                  label="Kategori Barang"
                  options={optionsKategori}
                  placeholder={"Masukan kategori Barang"}
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
                disabled={loading || selectedFiles.length === 0}
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
