import React, { useEffect, useState } from "react";
import FormInputIcon from "@/components/features/input/FormInputIcon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { axiosServices, baseURL } from "@/services/axios";
import { toast } from "@/components/ui/use-toast";
import { useQuery } from "react-query";
import { formatNumber } from "@/utils/utils";
import { useNavigate } from "react-router-dom";
import { useGetKategori } from "@/hooks/useGetKategori";
import ModalPreviewBarang from "./modal/ModalPreviewBarang";
import ModalKeranjang from "./modal/ModalKeranjang";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import LoadingFile from "@/components/loader/LoadingFile";
import { BASE_TITLE } from "@/config";
import GambarDenganPlaceholder from "../components/GambarDenganPlaceholder";

const PermintaanBarangUserAdminPage = () => {
  const [cartItem, setCartItem] = React.useState<any[]>([]);
  const [filteredData, setFilteredData] = React.useState<any[]>([]);
  const [currentItems, setCurrentItems] = React.useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [filteredKategori, setFilteredKategori] = React.useState<any>({
    value: "",
    label: "Semua",
  });
  const [inputFilter, setInputFilter] = useState("");
  const [melebihiStok, setMelebihiStok] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const navigate = useNavigate();

  const { dataList: optionsKategori, isLoading: isLoadingKategori } =
    useGetKategori();

  optionsKategori?.unshift({
    value: "",
    label: "Semua",
  });

  const fetchData = async () => {
    try {
      const res = await axiosServices().get("/api/master-data/get-data-barang");
      return res.data;
    } catch (error: any) {
      toast({
        title: "Gagal",
        description: error.response.data.message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (cartItem) {
      // tambahkan property quantity ke dalam cartItem
      const updatedCartItem = cartItem.map((item) => ({
        ...item,
        quantity: 1,
      }));

      setCartItem(updatedCartItem);
    }
  }, []);

  const { data: dataBarang, isLoading } = useQuery({
    queryKey: "data-list-barang",
    queryFn: fetchData,
    refetchOnWindowFocus: false,
    refetchInterval: 1000 * 60 * 5,
  });

  const addToCart = (item) => {
    setCartItem([
      ...cartItem,
      {
        ...item,
        quantity: 1,
      },
    ]);
  };

  const removeFromCart = (itemId) => {
    setCartItem(cartItem?.filter((item) => item.id_barang !== itemId));
  };

  const isItemInCart = (itemId) => {
    return cartItem?.some((item) => item.id_barang === itemId);
  };

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

  useEffect(() => {
    let filtered = dataBarang;

    if (inputFilter !== "") {
      filtered = filtered?.filter((item) =>
        item.nama_barang.toLowerCase().includes(inputFilter.toLowerCase())
      );
    }

    if (filteredKategori.value !== "") {
      filtered = filtered?.filter(
        (item) => item.id_kategori === filteredKategori.value
      );
    }

    // sort filtered data by nama_barang
    filtered = filtered?.sort((a, b) =>
      a.nama_barang.localeCompare(b.nama_barang)
    );

    // Set hasil filter ke state utama
    setFilteredData(filtered);

    // Reset currentPage saat filter berubah
    setCurrentPage(1);

    // Hitung total halaman
    const totalPages = Math.ceil((filtered?.length || 0) / itemsPerPage);
    setTotalPages(totalPages);
  }, [inputFilter, dataBarang, filteredKategori]);

  useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems =
      filteredData?.slice(indexOfFirstItem, indexOfLastItem) || [];
    setCurrentItems(currentItems);
  }, [filteredData, currentPage]);

  if (isLoading || isLoadingKategori) {
    return <LoadingFile open={true} />;
  }

  if (!filteredData) {
    return <LoadingFile open={true} />;
  }

  document.title = "Permintaan Barang" + BASE_TITLE;

  return (
    <main className="base-card  gap-3 h-[calc(100dvh-100px)] relative bg-gradient-to-b from-slate-50 to-blue-400 shadow">
      {/* List Item */}
      <section className="flex flex-col w-full overflow-hidden scroll col-span-4 lg:col-span-3">
        <div className="flex flex-col lg:flex-row gap-3 justify-between">
          <h1 className="text-xl md:text-2xl font-bold mb-2">
            Daftar Barang Admin
          </h1>
        </div>
        <section className="flex flex-col gap-3 my-2">
          <div className="flex flex-row gap-1 items-start mx-1 ">
            <ScrollArea className="w-full">
              <div className=" flex flex-row gap-3 mb-3">
                {optionsKategori?.map((item) => (
                  <p
                    key={item.label}
                    onClick={() => {
                      setFilteredKategori(item);
                    }}
                    className={cn(
                      "px-3 cursor-pointer whitespace-nowrap",
                      filteredKategori?.value === item.value
                        ? "border-b-2 border-primary text-primary"
                        : ""
                    )}
                  >
                    {item.label}
                  </p>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size={"icon"}
                  className="h-fit focus-visible:ring-0"
                >
                  <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-screen">
                <DropdownMenuLabel>Kategori</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={filteredKategori.value}
                  onValueChange={(e) => {
                    setFilteredKategori({
                      value: e,
                      label: optionsKategori?.find((item) => item.value === e)
                        ?.label,
                    });
                  }}
                >
                  {optionsKategori?.map((item) => (
                    <DropdownMenuRadioItem key={item.value} value={item.value}>
                      {item.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <FormInputIcon
            className="w-full"
            value={inputFilter}
            onChange={(e) => {
              setInputFilter(e.target.value);
              setFilteredData(
                dataBarang.filter((item) =>
                  item.nama_barang
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase())
                )
              );
            }}
          />
        </section>

        <div className="px-2 mt-3 grid grid-cols-1 md:grid-cols-5 gap-2 overflow-y-scroll scroll__primary">
          {currentItems
            ?.sort((a, b) => a.nama_barang.localeCompare(b.nama_barang))
            .map((item) => (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="base-card bg-white shadow-sm flex-row md:flex-col w-full gap-2 space-y-2 p-3 h-fit relative"
                key={item.name}
              >
                <div className="relative w-fit justify-center m-auto">
                  <GambarDenganPlaceholder
                    src={`${baseURL}/uploads/${item.gambar_barang[0]}`}
                    alt={item.nama_barang}
                    className="w-full h-16 md:h-32 md:w-32"
                  />
                </div>

                <div className="flex w flex-col w-full">
                  <div className="flex flex-row md:flex-col justify-between md:justify-normal gap-1">
                    <div className="w-full space-y-2 mb-3">
                      <p className="text-sm whitespace-break-spaces">
                        {item?.nama_barang}
                      </p>
                      {/* <p className="text-xs font-normal underline italic">
                        {item?.nama_kategori}
                      </p> */}
                      <p className="font-normal text-xs">
                        Stock: <strong>{formatNumber(item.stok_barang)}</strong>
                      </p>
                      <p className="font-normal text-xs">
                        Satuan: <strong>{item.nama_satuan}</strong>
                      </p>
                    </div>
                    <ModalPreviewBarang
                      addToCart={addToCart}
                      isItemInCart={isItemInCart}
                      item={item}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
        <div className="flex justify-center items-center mt-4 gap-2">
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Prev
          </Button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </section>

      <section
        className={cn(
          "fixed left-0 w-full bg-white z-50 flex h-14 justify-between items-center p-3 rounded-lg shadow",
          {
            "-bottom-20": cartItem.length === 0,
            "bottom-0": cartItem.length > 0,
          }
        )}
      >
        <div className="p-2 relative flex">
          <ModalKeranjang
            cartItem={cartItem}
            melebihiStok={melebihiStok}
            setMelebihiStok={setMelebihiStok}
            removeFromCart={removeFromCart}
            updateQuantity={updateQuantity}
          />
          <span className="absolute top-0 right-0">{cartItem.length}</span>
        </div>
        <div className="flex flex-row items-center gap-4">
          <p className="whitespace-nowrap">{cartItem.length} Barang</p>
          <Button
            className="w-full"
            onClick={() => {
              navigate("/keranjang-barang-admin", { state: { cartItem } });
            }}
          >
            Ajukan
          </Button>
        </div>
      </section>
    </main>
  );
};

export default PermintaanBarangUserAdminPage;
