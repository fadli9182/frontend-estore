import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { BsTrashFill } from "react-icons/bs";

const ModalHapusData = ({ onDelete, loading }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full text-left flex flex-row items-center gap-2 p-2 py-1 transition-colors hover:bg-accent focus:text-accent-foreground cursor-pointer">
        <BsTrashFill className="mr-3 text-lg" />
        Hapus
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-destructive">
            Konfirmasi Hapus Data
          </AlertDialogTitle>
          <AlertDialogDescription>
            Apakah anda yakin ingin menghapus data tersebut?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              onClick={() => {
                onDelete();
                close();
              }}
              className={"bg-destructive"}
            >
              {loading ? "Loading..." : "Ya Hapus Sekarang"}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ModalHapusData;
