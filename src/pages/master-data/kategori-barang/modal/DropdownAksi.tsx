import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import ModalEditKategori from "./ModalEdit";
import ModalHapusKategori from "./ModalHapus";

const DropdownAksiKategori = ({ data, refetch }) => {
  const [showModalEdit, setShowModalEdit] = React.useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full">
          Pilih <ChevronDown className="ml-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup className="flex flex-col gap-2 my-2">
          <ModalEditKategori
            data={data}
            refetch={refetch}
            open={showModalEdit}
            setOpen={setShowModalEdit}
          />
          <ModalHapusKategori data={data} refetch={refetch} />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownAksiKategori;
