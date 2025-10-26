import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { baseURL } from "@/services/axios";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ModalPreviewBarang = ({ addToCart, isItemInCart, item }) => {
  const navigate = useNavigate();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="text-xs font-bold h-10 w-11 md:w-full md:h-auto"
          //   onClick={() => addToCart(item)}
          disabled={isItemInCart(item.id_barang) || item.stok_barang === 0}
        >
          <Plus size={18} />
        </Button>
      </SheetTrigger>
      <SheetContent className="p-6 m-6 rounded-xl" side={"bottom"}>
        <div className="flex flex-row gap-2 items-center w-full">
          <div className="relative w-fit">
            <img
              src={`${baseURL}/uploads/${item?.gambar_barang[0]}`}
              alt={item?.title}
              width="128"
              height="128"
              className="w-32 h-32 object-cover aspect-square rounded-lg border"
            />
            <p className="absolute top-0 right-0 text-xs p-2 bg-background rounded-bl-lg ">
              {item?.nama_kategori}
            </p>
          </div>
          <div className="flex flex-col gap-5 w-full">
            <div className="flex flex-col">
              <h1 className="text-lg font-bold">{item?.nama_barang}</h1>
              <p className="text-sm">Stock: {item?.stok_barang}</p>
              <p className="text-sm">Satuan: {item?.nama_satuan}</p>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-3 w-full">
              <SheetTrigger asChild>
                <Button
                  className="w-[200px]"
                  onClick={() => addToCart(item)}
                  disabled={isItemInCart(item.id_barang)}
                  variant={"outline"}
                >
                  <Plus size={18} className="mr-3" /> Keranjang
                </Button>
              </SheetTrigger>
              <Button
                className="w-[200px]"
                onClick={() => {
                  navigate("/keranjang-barang-admin", {
                    state: {
                      //add quantity
                      cartItem: [
                        {
                          ...item,
                          quantity: 1,
                        },
                      ],
                    },
                  });
                }}
              >
                Ajukan
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ModalPreviewBarang;
