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
import { Edit } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "@/components/ui/use-toast";
import FormInputSelect from "@/components/features/input/FormInputSelect";
import InputDate from "@/components/features/input/InputDate";
import { Label } from "@/components/ui/label";
import { useGetSupplier } from "@/hooks/useGetSupplier";
import { useGetListBarang } from "@/hooks/useGetListBarang";
import { axiosServices } from "@/services/axios";
import { InputNumber } from "primereact/inputnumber";
import FormInputNumber from "@/components/features/input/FormInputNumber";
import { formatDatePayload } from "@/utils/utils";

type ModalUbahBarangMasukType = {
  refetch: () => void;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dataBarangMasuk: any;
};

const ModalUbahBarangMasuk = ({
  refetch,
  dataBarangMasuk,
  open,
  setOpen,
}: ModalUbahBarangMasukType) => {
  const [loadingTambah, setLoadingTambah] = React.useState(false);
  const [stockBarang, setStockBarang] = React.useState(0);
  const [selectedSupplier, setSelectedSupplier] = React.useState<any>(null);
  const [selectedBarang, setSelectedBarang] = React.useState<any>(null);
  const [date, setDate] = React.useState(new Date());

  const { dataList: optionsSupplier } = useGetSupplier();
  const { dataList: optionsBarang } = useGetListBarang();

  const formSchema = z.object({
    id_supplier: z.number().min(1, "Mohon pilih supplier"),
    id_barang: z.string().min(1, "Mohon pilih barang"),
    jumlah_barang_masuk: z.number().min(1, "Mohon masukan jumlah masuk"),
    total_harga: z.number().optional(),
    tgl_masuk: z.string().min(1, "Mohon masukan tanggal masuk"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id_supplier: "",
      id_barang: "",
      jumlah_barang_masuk: 0,
      total_harga: 0,
      tgl_masuk: formatDatePayload(date),
    },
  });

  useEffect(() => {
    form.setValue("id_supplier", dataBarangMasuk.id_supplier);
    form.setValue("id_barang", dataBarangMasuk.id_barang);
    form.setValue("jumlah_barang_masuk", dataBarangMasuk.jumlah_barang_masuk);
    form.setValue("total_harga", dataBarangMasuk.total_harga);
    form.setValue("tgl_masuk", dataBarangMasuk.tgl_masuk);
    setSelectedSupplier({
      value: dataBarangMasuk.id_supplier,
      label: dataBarangMasuk.nama_supplier,
    });
    setSelectedBarang({
      value: dataBarangMasuk.id_barang,
      label: dataBarangMasuk.nama_barang,
    });
    setDate(new Date(dataBarangMasuk.tgl_masuk));
  }, [dataBarangMasuk]);

  const fetchDetailBarang = async (id_barang: string) => {
    try {
      const res = await axiosServices().post(
        `api/master-data/get-data-barang/detail`,
        {
          id_barang: id_barang,
        }
      );
      if (res.status === 200) {
        setStockBarang(
          res.data[0].stok_barang - dataBarangMasuk.jumlah_barang_masuk
        );
      }
    } catch (error: any) {
      toast({
        title: "Gagal",
        description: error.response.data.message,
        variant: "destructive",
      });
    }
  };

  React.useEffect(() => {
    if (form.watch("id_barang")) {
      const idBarang = form.watch("id_barang");
      fetchDetailBarang(idBarang);
    }
  }, [form.watch("id_barang")]);

  async function onSubmit(values) {
    setLoadingTambah(true);

    try {
      const res = await axiosServices().post(
        "/api/transaksi/update-barang-masuk",
        {
          ...values,
          tgl_masuk: formatDatePayload(date),
          id_transaksi: dataBarangMasuk.id_transaksi,
          stock_barang_sekarang:
            stockBarang + Number(values.jumlah_barang_masuk),
        }
      );

      if (res.status === 200) {
        toast({
          title: "Berhasil",
          description: "Barang masuk berhasil diubah",
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
    setLoadingTambah(false);
  }

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
      <DialogContent className="max-w-[800px] max-h-full overflow-y-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader className="p-6">
              <DialogTitle className="flex justify-between font-bold mb-4">
                Ubah Barang Masuk
              </DialogTitle>
              <Separator />

              <section className="grid grid-cols-1 gap-7">
                <div className="grid grid-cols-1 gap-4 text-start">
                  <div className="flex flex-col">
                    <Label className="font-semibold">Tanggal Masuk</Label>
                    <InputDate
                      value={date}
                      handleSelectDate={(date) => {
                        setDate(date);
                        form.setValue("tgl_masuk", formatDatePayload(date));
                      }}
                      label={"Tanggal Masuk"}
                    />
                  </div>

                  <FormInputSelect
                    name="id_supplier"
                    label="Supplier"
                    options={optionsSupplier}
                    placeholder={"Masukan supplier"}
                    value={selectedSupplier}
                    setSelected={(e) => {
                      form.setValue("id_supplier", e.value);
                      setSelectedSupplier(e.label);
                    }}
                    isDisabled
                  />

                  <FormInputSelect
                    name="id_barang"
                    label="Barang"
                    options={optionsBarang}
                    value={selectedBarang}
                    placeholder={"Masukan Barang"}
                    setSelected={(e) => {
                      form.setValue("id_barang", e.value);
                      setSelectedBarang(e.label);
                    }}
                    isDisabled
                  />

                  <div>
                    <Label className="font-semibold">Stok Barang</Label>
                    <InputNumber
                      value={stockBarang}
                      className="w-full"
                      disabled
                    />
                  </div>

                  <FormInputNumber
                    label="Jumlah Barang Masuk"
                    name="jumlah_barang_masuk"
                    placeholder="Masukan jumlah barang masuk"
                    value={form.watch("jumlah_barang_masuk")}
                    onValueChange={(e) => {
                      form.setValue("jumlah_barang_masuk", e.floatValue);
                    }}
                  />

                  <FormInputNumber
                    label="Total Harga"
                    name="total_harga"
                    placeholder="Masukan total harga"
                    value={form.watch("total_harga")}
                    onValueChange={(e) => {
                      form.setValue("total_harga", e.floatValue);
                    }}
                  />

                  <div>
                    <Label className="font-semibold">Stok Barang</Label>
                    <InputNumber
                      value={
                        stockBarang + Number(form.watch("jumlah_barang_masuk"))
                      }
                      className="w-full"
                      disabled
                    />
                  </div>
                </div>
              </section>
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
                disabled={loadingTambah}
              >
                {loadingTambah ? "Loading..." : "Simpan"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ModalUbahBarangMasuk;
