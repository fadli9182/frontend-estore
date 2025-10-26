import FormInputLabel from "@/components/features/input/FormInputLabel";
import InputDate from "@/components/features/input/InputDate";
import TypoH1 from "@/components/typhography/TypoH1";
import TypoParagraph from "@/components/typhography/TypoParagraph";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { axiosServices, baseURL } from "@/services/axios";
import { getLocalStorage } from "@/services/localStorageService";
import { formatDatePayload, formatNumber } from "@/utils/utils";
import { Minus, Plus } from "lucide-react";
import React from "react";
import { NumericFormat } from "react-number-format";
import { useLocation, useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const [keterangan, setKeterangan] = React.useState("");
  const [cartItem, setCartItem] = React.useState<any[]>([]);
  const [date, setDate] = React.useState<Date | null>(new Date());
  const [melebihiStok, setMelebihiStok] = React.useState(false);

  const navigate = useNavigate();

  const userData = getLocalStorage("userData");

  const location = useLocation();
  const { state } = location;

  React.useEffect(() => {
    if (state) {
      setCartItem(
        state.cartItem.map((item) => ({
          ...item,
        }))
      );
    }
  }, []);

  const updateQuantity = (productId, newQuantity) => {
    const updatedCart = cartItem.map((item) =>
      item.id_barang === productId
        ? {
            ...item,
            quantity: Math.min(
              parseInt(newQuantity, 10) || 1,
              item.stok_barang
            ),
          }
        : item
    );

    setCartItem(updatedCart);
  };

  const onProsesPesanan = async () => {
    const id_permintaan = `MNT-${Math.floor(1000 + Math.random() * 9000)}`;

    try {
      const res: any = await axiosServices().post(
        "/api/transaksi/add-permintaan-barang",
        {
          data: cartItem.map((item) => ({
            id_permintaan: id_permintaan,
            id_barang: item.id_barang,
            nama_barang: item.nama_barang,
            id_kategori: item.id_kategori,
            nama_kategori: item.nama_kategori,
            id_user: userData.id,
            nama_user: userData.fullname,
            id_ruang_kerja: userData.id_ruang_kerja,
            nama_ruang_kerja: userData.nama_ruang_kerja,
            stok_barang: item.stok_barang,
            jumlah_barang_minta: item.quantity,
            tgl_permintaan: formatDatePayload(date),
            status_permintaan: "pending",
            ket_minta: keterangan,
          })),
        }
      );

      if (res.status === 200) {
        toast({
          title: "Berhasil",
          description: "Permintaan Barang Berhasil",
        });

        navigate("/list-permintaan-barang-user");
      }
    } catch (error: any) {
      toast({
        title: "Gagal",
        description: error.response.data.message,
        variant: "destructive",
      });
    }
  };

  const removeFromCart = (itemId) => {
    setCartItem(cartItem.filter((item) => item.id_barang !== itemId));
  };

  if (!cartItem) return <h1>Loading...</h1>;

  return (
    <main className="base-card">
      <TypoH1 className="mb-4">Konfirmasi Barang</TypoH1>
      <section className="flex md:flex-row flex-col-reverse gap-2">
        <div className="h-[calc(100dvh-300px)] w-full overflow-y-auto scroll__primary relative col-span-2 flex flex-col gap-2">
          {cartItem?.map((item) => (
            <div className="base-card flex w-full gap-2" key={item.id}>
              <div className="flex flex-row gap-3 ">
                <img
                  src={`${baseURL}/uploads/${item.gambar_barang[0]}`}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex flex-col md:flex-row justify-between w-full">
                  <div className="flex flex-col w-full gap-1 overflow-hidden p-2">
                    <p className="line-clamp-1 text-xl mb-2">
                      {item?.nama_barang}
                    </p>

                    <div className="flex flex-col gap-2">
                      <p className="">
                        Stock: <strong>{formatNumber(item.stok_barang)}</strong>
                      </p>
                      <p>
                        Satuan: <strong>{item.nama_satuan}</strong>
                      </p>
                      <div className="flex flex-row items-center gap-2 mb-2">
                        <Button
                          size={"icon"}
                          onClick={() => {
                            if (item.quantity > 1) {
                              updateQuantity(item.id_barang, item.quantity - 1);
                            }
                          }}
                        >
                          <Minus size={18} />
                        </Button>
                        <NumericFormat
                          className="flex h-10 max-w-[90px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          value={item.quantity || 1}
                          onValueChange={(e: any) => {
                            if (e?.floatValue > item.stok_barang) {
                              toast({
                                title: "Gagal",
                                description: "Stock tidak mencukupi",
                                variant: "destructive",
                              });
                              setMelebihiStok(true);
                              return;
                            } else {
                              updateQuantity(item.id_barang, e.floatValue || 1);
                              setMelebihiStok(false);
                            }
                          }}
                          thousandSeparator={true}
                        />
                        <Button
                          size={"icon"}
                          onClick={() => {
                            if (item.quantity < item.stok_barang) {
                              updateQuantity(item.id_barang, item.quantity + 1);
                            } else {
                              toast({
                                title: "Gagal",
                                description: "Stock tidak mencukupi",
                                variant: "destructive",
                              });
                              setMelebihiStok(true);
                            }
                          }}
                        >
                          <Plus size={18} />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Button
                    size={"sm"}
                    className="text-xs w-fit mx-2"
                    variant={"destructive"}
                    onClick={() => removeFromCart(item.id_barang)}
                  >
                    Hapus
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="base-card space-y-3 min-w-[250px]">
          <TypoParagraph>Permohonan Barang</TypoParagraph>

          <Separator />
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <Label className="font-semibold">Tgl. Keluar</Label>
              <InputDate
                value={date}
                handleSelectDate={(date) => {
                  setDate(date);
                }}
                label={"Tgl. Keluar"}
              />
            </div>
            <FormInputLabel
              placeholder="Masukan Keterangan"
              label="Keterangan"
              type="textarea"
              value={keterangan}
              onChange={(e) => setKeterangan(e.target.value)}
            />
          </div>
          <Button
            className="w-full"
            onClick={onProsesPesanan}
            disabled={melebihiStok || cartItem.length === 0}
          >
            Ajukan Sekarang
          </Button>
        </div>
      </section>
    </main>
  );
};

export default CheckoutPage;
