import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import React from "react";
import ModalEditSatuan from "./ModalEdit";
import ModalHapusSatuan from "./ModalHapus";

const DropdownAksiSatuan = ({ data, refetch }) => {
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
          <ModalEditSatuan
            data={data}
            refetch={refetch}
            open={showModalEdit}
            setOpen={setShowModalEdit}
          />
          <ModalHapusSatuan data={data} refetch={refetch} />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownAksiSatuan;
