import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { toast } from "@/components/ui/use-toast";
import { baseURL } from "@/services/axios";
import { formatNumber } from "@/utils/utils";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { InputNumber } from "primereact/inputnumber";
import { useNavigate } from "react-router-dom";

const ModalKeranjang = ({
  cartItem,
  updateQuantity,
  setMelebihiStok,
  removeFromCart,
  melebihiStok,
}) => {
  const navigate = useNavigate();
  return (
    <Sheet>
      <SheetTrigger>
        <ShoppingCart className="text-orange-600" />
      </SheetTrigger>
      <SheetContent className="w-[300px] sm:w-[540px]">
        <section>
          <div>
            <div className="flex justify-between items-center">
              <p className="text-xl md:text-2xl font-bold">Keranjang</p>
              <Button variant="ghost">
                <ShoppingCart size={24} />
              </Button>
            </div>
            <div className="h-[calc(100dvh-150px)] overflow-y-auto scroll__primary relative">
              {cartItem?.map((item) => (
                <div className="base-card mt-3 flex w-full gap-2" key={item.id}>
                  <div className="flex flex-row gap-3 ">
                    <img
                      src={`${baseURL}/uploads/${item?.gambar_barang[0]}`}
                      alt={item.name}
                      className="h-16 w-16 object-cover rounded-lg"
                    />
                    <div className="flex flex-col w-full overflow-hidden p-2">
                      <p className="line-clamp-1 text-lg">
                        {item?.nama_barang}
                      </p>

                      <p className="font-normal text-xs">
                        Stock: <strong>{formatNumber(item.stok_barang)}</strong>
                      </p>
                      <p className="font-normal text-xs">
                        Satuan: <strong>{item.nama_satuan}</strong>
                      </p>
                      <div className="flex flex-row items-center gap-1 mt-2">
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
                        <InputNumber
                          inputClassName="w-16 h-10"
                          value={item.quantity || 1}
                          min={1}
                          max={item.stok_barang}
                          onChange={(e: any) => {
                            if (e.value > item.stok_barang) {
                              toast({
                                title: "Gagal",
                                description: "Stock tidak mencukupi",
                                variant: "destructive",
                              });
                              setMelebihiStok(true);
                              return;
                            } else {
                              updateQuantity(item.id_barang, e.value);
                              setMelebihiStok(false);
                            }
                          }}
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
                    className="text-xs"
                    variant={"destructive"}
                    onClick={() => removeFromCart(item.id_barang)}
                  >
                    Hapus
                  </Button>
                </div>
              ))}
            </div>
          </div>
          <div>
            <Button
              className="w-full"
              onClick={() => {
                navigate("/keranjang-barang-admin", { state: { cartItem } });
              }}
              disabled={cartItem.length === 0 || melebihiStok}
            >
              Ajukan
            </Button>
          </div>
        </section>
      </SheetContent>
    </Sheet>
  );
};

export default ModalKeranjang;
