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

const ModalConfirmStatus = (props) => {
  const { obj, title } = props;
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className={`text-sm w-4/5 border rounded-md font-semibold ${
            obj.is_active
              ? "bg-green-200 border-green-500 text-green-700"
              : "bg-red-200 border-red-500 text-red-700"
          }`}
        >
          {obj.is_active ? "Aktif" : "Tidak Aktif"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle
            className={obj.is_active ? "text-destructive" : "text-primary"}
          >
            Konfirmasi {obj.is_active === "aktif" ? "Non-Aktifkan" : "Aktifkan"}{" "}
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription>
            Apakah Anda yakin untuk{" "}
            <strong
              className={obj.is_active ? "text-destructive" : "text-primary"}
            >
              {obj.is_active ? "Non-Aktifkan" : "Aktifkan"}{" "}
            </strong>{" "}
            menu ini?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction
            className={obj.is_active ? "bg-destructive" : "bg-primary"}
            onClick={() => props.handleSubmitUbahStatus(obj)}
          >
            Ya, Saya yakin
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ModalConfirmStatus;
