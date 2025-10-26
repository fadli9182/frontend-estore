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
import { Power } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { axiosServices } from "@/services/axios";
import { Button } from "@/components/ui/button";

const ModalAktifkanUser = ({ data, refetch }) => {
  async function onDelete() {
    try {
      const res = await axiosServices().put(`/api/users/enable-user`, {
        id: data.id,
      });
      if (res.status === 200) {
        toast({
          title: "Berhasil",
          description: "User berhasil diaktifkan",
        });
        refetch();
      }
    } catch (error: any) {
      toast({
        title: "Gagal",
        description: error.response.data.message,
        variant: "destructive",
      });
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" className="w-full justify-start text-primary">
          <Power className="mr-2" size={15} /> <span>Aktifkan</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Aktifkan User?</AlertDialogTitle>
          <AlertDialogDescription>
            Apakah anda yakin ingin mengaktifkan user ini?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction className="" onClick={onDelete}>
            Aktifkan
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ModalAktifkanUser;
