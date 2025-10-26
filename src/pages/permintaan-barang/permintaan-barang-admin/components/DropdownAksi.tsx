import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { axiosServices } from "@/services/axios";
import { ChevronDown, Printer } from "lucide-react";
import ModalKonfirmasiApprove from "./ModalKonfirmasiApprove";
import React from "react";
import { getLocalStorage } from "@/services/localStorageService";
import { useReactToPrint } from "react-to-print";
import DokumenPrintMintaBarang from "./DokumenPrint";
import { cn } from "@/lib/utils";
import ModalEditPermintaanUser from "../../daftar-permintaan-barang-user/components/ModalEditPermintaan";
import ModalKonfirmasiSuccess from "./ModalKonfirmasiSuccess";

const DropdownAksiMintaBarangAdmin = ({
  data,
  dataBarang,
  refetch,
  listUser,
}) => {
  const [showModalEdit, setShowModalEdit] = React.useState(false);
  const [loadingSetuju, setLoadingSetuju] = React.useState(false);
  const userData = getLocalStorage("userData");

  const printRef = React.useRef(null);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  const onConfirmApprove = async () => {
    setLoadingSetuju(true);
    try {
      const res = await axiosServices().post(
        "/api/transaksi/update-permintaan-barang",
        data.map((item) => ({
          ...item,
          status_permintaan: "success",
          disetujui_oleh: userData.id,
        }))
      );
      if (res.status === 200) {
        toast({
          title: "Berhasil",
          description: "Berhasil menyetujui permintaan barang",
        });
        refetch();
        setLoadingSetuju(false);
      }
    } catch (error: any) {
      toast({
        title: "Gagal",
        description: error.message,
        variant: "destructive",
      });
      setLoadingSetuju(false);
    }
  };

  const onApprove = async () => {
    setLoadingSetuju(true);
    try {
      const res = await axiosServices().post(
        "/api/transaksi/update-permintaan-barang",
        data.map((item) => ({
          ...item,
          status_permintaan: "approved",
          disetujui_oleh: userData.id,
        }))
      );
      if (res.status === 200) {
        toast({
          title: "Berhasil",
          description: "Berhasil menyetujui permintaan barang",
        });
        refetch();
        setLoadingSetuju(false);
      }
    } catch (error: any) {
      toast({
        title: "Gagal",
        description: error.message,
        variant: "destructive",
      });
      setLoadingSetuju(false);
    }
  };

  return (
    <>
      {data[0]?.status_permintaan === "pending" ||
      data[0]?.status_permintaan === "approved" ? (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant={"outline"}
                className="focus-visible:ring-0 focus-visible:ring-offset-0"
                disabled={
                  data[0]?.status_permintaan === "success" ? true : false
                }
              >
                Pilih <ChevronDown className="ml-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-34">
              <DropdownMenuGroup>
                <ModalEditPermintaanUser
                  open={showModalEdit}
                  setOpen={setShowModalEdit}
                  refetch={refetch}
                  data={data}
                />
                <Separator className="my-1" />

                <div
                  className={cn(
                    data?.stok_barang < data?.jumlah_barang_minta
                      ? "hidden"
                      : ""
                  )}
                >
                  {data[0]?.status_permintaan !== "approved" && (
                    <>
                      <ModalKonfirmasiApprove
                        onConfirm={() => onApprove()}
                        loading={loadingSetuju}
                      />
                      <Separator className="my-1" />
                    </>
                  )}

                  <ModalKonfirmasiSuccess
                    onConfirm={() => onConfirmApprove()}
                    loading={loadingSetuju}
                  />
                </div>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      ) : (
        <>
          <Button
            variant={"outline"}
            className="focus-visible:ring-0 focus-visible:ring-offset-0"
            onClick={handlePrint}
          >
            <Printer className="mr-6" /> Print
          </Button>
        </>
      )}
      <div className="hidden">
        <DokumenPrintMintaBarang
          data={data}
          ref={printRef}
          dataBarang={dataBarang}
          listUser={listUser}
        />
      </div>
    </>
  );
};

export default DropdownAksiMintaBarangAdmin;
