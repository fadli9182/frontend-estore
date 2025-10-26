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
import { toast } from "@/components/ui/use-toast";
import { BsPencilFill } from "react-icons/bs";
import { axiosServices } from "@/services/axios";
import { NumericFormat } from "react-number-format";
import { Label } from "@radix-ui/react-dropdown-menu";
import { formatNumber } from "@/utils/utils";

type ModalEditType = {
  refetch: () => void;
  data?: any;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalEditPermintaanUser = ({
  refetch,
  data,
  open,
  setOpen,
}: ModalEditType) => {
  const [loadingTambahUser, setLoadingTambahUser] = React.useState(false);
  const [melebihiStok, setMelebihiStok] = React.useState(false);

  const form = useForm({
    // resolver: zodResolver(formSchema),
    defaultValues: {
      jumlah_barang_minta: 0,
    },
  });

  useEffect(() => {
    form.setValue("jumlah_barang_minta", data.jumlah_barang_minta);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  async function onSubmitEdit() {
    setLoadingTambahUser(true);
    try {
      const res = await axiosServices().post(
        "/api/transaksi/update-permintaan-barang",
        data
      );
      if (res.status === 200) {
        toast({
          title: "Berhasil",
          description: "Ruang Kerja berhasil diupdate",
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

    refetch();
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
      <DialogContent className="max-w-[700px] max-h-[90%] overflow-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmitEdit)}>
            <DialogHeader className="p-6">
              <DialogTitle className="flex justify-between font-bold mb-4">
                {"Edit"} Jumlah Barang Minta
              </DialogTitle>
              <Separator />
              <div className="grid grid-cols-1 gap-4 text-start">
                {data.map((item) => {
                  return (
                    <div key={item.id_permintaan_barang}>
                      <Label className="font-semibold">
                        {item.nama_barang} <br />{" "}
                        <span className="text-sm">
                          Stock: {formatNumber(item.stok_barang)}
                        </span>
                      </Label>
                      <NumericFormat
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder={"Masukan jumlah barang yang diminta"}
                        value={item.jumlah_barang_minta}
                        onValueChange={(e: any) => {
                          if (e.floatValue > item.stok_barang) {
                            toast({
                              title: "Gagal",
                              description: "Stock tidak mencukupi",
                              variant: "destructive",
                            });
                            setMelebihiStok(true);
                            return;
                          } else {
                            data.find(
                              (x) => x.nama_barang === item.nama_barang
                            ).jumlah_barang_minta = e.floatValue;

                            setMelebihiStok(false);
                          }
                        }}
                        thousandSeparator={true}
                      />
                    </div>
                  );
                })}
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
                disabled={loadingTambahUser || melebihiStok}
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

export default ModalEditPermintaanUser;
