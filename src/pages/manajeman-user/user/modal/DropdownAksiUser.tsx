import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import ModalNonaktifkanUser from "./ModalNonaktifUser";
import ModalAktifkanUser from "./ModalAktifkanUser";
import ModalUbahUser from "./ModalUbahUser";
import { useState } from "react";

const DropdownAksiUser = ({ data, refetch }) => {
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
          <ModalUbahUser
            dataUser={data}
            refetch={refetch}
            open={open}
            setOpen={setOpen}
          />
          {data.status === "active" ? (
            <ModalNonaktifkanUser data={data} refetch={refetch} />
          ) : (
            <ModalAktifkanUser data={data} refetch={refetch} />
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownAksiUser;
