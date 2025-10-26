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
import { Delete, Plus } from "lucide-react";
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
import {
  formatDate,
  formatDatePayload,
  formatNumber,
  getNowHour,
} from "@/utils/utils";

type ModalTambahType = {
  refetch: () => void;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalTambah = ({ refetch, open, setOpen }: ModalTambahType) => {
  const [loadingTambahUser, setLoadingTambahUser] = React.useState(false);
  const [stockBarang, setStockBarang] = React.useState(0);
  const [selectedSupplier, setSelectedSupplier] = React.useState<any>(null);
  const [selectedBarang, setSelectedBarang] = React.useState<any>(null);
  const [date, setDate] = React.useState(new Date());
  const [dataBarang, setDataBarang] = React.useState<any>([]);

  const generateIdTransaksi = () => {
    const randomNum = Math.floor(Math.random() * 10000) + 1; // Generate random number between 1 and 9999
    const paddedNum = randomNum.toString().padStart(4, "0"); // Pad the number with leading zeros if it's less than 4 digits
    const result = `T-BM-${paddedNum}`;
    return result;
  };

  const id_transaksi = generateIdTransaksi();

  const { dataList: optionsSupplier } = useGetSupplier();
  const { dataList: optionsBarang } = useGetListBarang();

  const formSchema = z.object({
    id_supplier: z.number().min(1, "Mohon pilih supplier"),
    id_barang: z.string().min(1, "Mohon pilih barang"),
    jumlah_barang_masuk: z.number().min(1, "Mohon masukan jumlah masuk"),
    total_harga: z.number().optional(),
    tanggal_masuk: z.string().min(1, "Mohon masukan tanggal masuk"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id_supplier: "",
      id_barang: "",
      jumlah_barang_masuk: 0,
      total_harga: 0,
      tanggal_masuk: formatDatePayload(date),
    },
  });

  const fetchDetailBarang = async (id_barang: string) => {
    try {
      const res = await axiosServices().post(
        `api/master-data/get-data-barang/detail`,
        {
          id_barang: id_barang,
        }
      );
      if (res.status === 200) {
        setStockBarang(res.data[0].stok_barang);
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
    setLoadingTambahUser(true);

    try {
      const res = await axiosServices().post(
        "/api/transaksi/add-barang-masuk",
        dataBarang
      );

      if (res.status === 200) {
        toast({
          title: "Berhasil",
          description: "Barang masuk berhasil ditambahkan",
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

  function addDataBarang() {
    // const selectedDate = ;
    setDataBarang((prev) => [
      ...prev,
      {
        id_transaksi: id_transaksi,
        id_barang: form.watch("id_barang"),
        id_supplier: form.watch("id_supplier"),
        nama_supplier: selectedSupplier,
        nama_barang: selectedBarang,
        jumlah_barang_masuk: form.watch("jumlah_barang_masuk"),
        total_harga: form.watch("total_harga"),
        tgl_masuk: formatDatePayload(
          new Date(form.watch("tanggal_masuk") as string)
        ),
        jam_masuk: getNowHour(),
      },
    ]);
  }

  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <Button className="whitespace-nowrap" onClick={() => setOpen(true)}>
          <Plus className="mr-2" size={18} /> Tambah Barang
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-full max-h-full overflow-y-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader className="p-6">
              <DialogTitle className="flex justify-between font-bold mb-4">
                {"Tambah"} Barang Masuk
              </DialogTitle>
              <Separator />

              <section className="grid grid-cols-1 md:grid-cols-2 gap-7">
                <div className="">
                  <h2 className="font-bold mb-2">Daftar Barang</h2>
                  <Separator />
                  <div className="max-h-[500px] overflow-auto scroll__primary">
                    {dataBarang.length > 0 ? (
                      dataBarang.map((item, index) => {
                        return (
                          <div className="flex items-center w-full" key={index}>
                            <div
                              className="text-end text-destructive cursor-pointer mr-2"
                              onClick={() => {
                                setDataBarang((prev) =>
                                  prev.filter((_, i) => i !== index)
                                );
                              }}
                            >
                              <Delete />
                            </div>
                            <div
                              key={index}
                              className="flex justify-between items-center gap-3 border-b border-gray-300 py-2"
                            >
                              <p className="text-sm ">{item.id_transaksi} :</p>
                              <p className="text-sm  font-normal">
                                {item.nama_barang} <br />{" "}
                                {item.jumlah_barang_masuk}{" "}
                              </p>
                              <p className="text-sm  font-normal">
                                {item.nama_supplier} <br />{" "}
                                {formatDate(item.tgl_masuk)}
                              </p>
                              <p className="text-sm font-normal">
                                {formatNumber(item.total_harga)}
                              </p>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-center">Belum ada barang</p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 text-start">
                  {/* <FormInput
                    name="id_transaksi"
                    label="ID Transaksi"
                    type={""}
                    types={"text"}
                    defaultValue={id_transaksi}
                    placeholder={"Masukan stok Barang"}
                    disabled
                  /> */}

                  <div className="flex flex-col">
                    <Label className="font-semibold">Tanggal Masuk</Label>
                    <InputDate
                      value={date}
                      handleSelectDate={(date) => {
                        setDate(date);
                        form.setValue("tanggal_masuk", formatDatePayload(date));
                      }}
                      label={"Tanggal Masuk"}
                    />
                  </div>

                  <FormInputSelect
                    name="id_supplier"
                    label="Supplier"
                    options={optionsSupplier}
                    placeholder={"Masukan supplier"}
                    setSelected={(e) => {
                      form.setValue("id_supplier", e.value);
                      setSelectedSupplier(e.label);
                    }}
                  />

                  <FormInputSelect
                    name="id_barang"
                    label="Barang"
                    options={optionsBarang?.sort((a, b) =>
                      a.label.localeCompare(b.label)
                    )}
                    placeholder={"Masukan Barang"}
                    setSelected={(e) => {
                      form.setValue("id_barang", e.value);
                      setSelectedBarang(e.label);
                    }}
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
                  <Button type="button" onClick={addDataBarang}>
                    Tambah
                  </Button>
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
                disabled={loadingTambahUser || dataBarang.length === 0}
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

export default ModalTambah;
