import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import ModalHapusBarangMasuk from "../modal/ModalHapusBarangMasuk";
import ModalUbahBarangMasuk from "../modal/ModalUbahBarangMasuk";
import { useState } from "react";

const DropdownAksiBarangMasuk = ({ data, refetch }) => {
  const [open, setOpen] = useState(false);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full">
          Pilih <ChevronDown className="ml-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup className="flex flex-col gap-2 my-2">
          <ModalUbahBarangMasuk
            open={open}
            setOpen={setOpen}
            dataBarangMasuk={data}
            refetch={refetch}
          />
          <ModalHapusBarangMasuk data={data} refetch={refetch} />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownAksiBarangMasuk;
