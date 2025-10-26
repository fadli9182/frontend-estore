import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { ChevronDown, Printer } from "lucide-react";
import { useReactToPrint } from "react-to-print";
import DokumenPrintMintaBarang from "../../permintaan-barang-admin/components/DokumenPrint";
import ModalEditPermintaanUser from "./ModalEditPermintaan";
import ModalKonfirmasiDelete from "../../permintaan-barang-admin/components/ModalKonfirmasiDelete";

const DropdownAksiMintaBarangUser = ({
  data,
  dataBarang,
  refetch,
  listUser,
}) => {
  const [showModalEdit, setShowModalEdit] = React.useState(false);

  const printRef = React.useRef(null);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  return (
    <>
      {data[0]?.status_permintaan === "pending" ? (
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

                <ModalKonfirmasiDelete
                  data={data}
                  refetch={refetch}
                  isAdmin={false}
                />
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

export default DropdownAksiMintaBarangUser;
