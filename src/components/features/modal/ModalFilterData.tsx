import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FilterIcon } from "lucide-react";

const ModalFilterData = ({
  onClearFilter,
  roleAkun,
  statusAkun,
  selected3 = "",
  children,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="w-full md:w-auto">
          <FilterIcon size={18} className="mr-2" /> Filter{" "}
          {roleAkun !== "" || statusAkun !== "" || selected3 !== ""
            ? "diterapkan"
            : ""}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="p-6">
          <DialogTitle className="flex justify-between">
            Filter
            <span
              className="text-sm hover:underline hover:cursor-pointer"
              onClick={() => onClearFilter()}
            >
              Hapus semua filter
            </span>
          </DialogTitle>
          <div>{children}</div>
        </DialogHeader>
        <DialogFooter className="bg-slate-50 p-4 rounded-b-lg flex gap-2 ">
          <DialogTrigger asChild>
            <Button variant={"outline"}>Batal</Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalFilterData;
