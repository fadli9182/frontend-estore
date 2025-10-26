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
import { CheckCheck } from "lucide-react";

const ModalKonfirmasiApprove = ({ onConfirm, loading }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full text-left flex flex-row items-center gap-2 p-2 py-1 transition-colors hover:bg-accent focus:text-accent-foreground cursor-pointer">
        <CheckCheck className="mr-2" size={16} /> Terima
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Konfirmasi Terima Permintaan</AlertDialogTitle>
          <AlertDialogDescription>
            Apakah anda yakin ingin terima permintaan tersebut?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              onClick={() => {
                onConfirm();
                close();
              }}
            >
              {loading ? "Loading..." : "Ya Terima"}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ModalKonfirmasiApprove;
