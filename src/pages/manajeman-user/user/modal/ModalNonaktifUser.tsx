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
import { Delete } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { axiosServices } from "@/services/axios";
import { Button } from "@/components/ui/button";

const ModalNonaktifkanUser = ({ data, refetch }) => {
  async function onDelete() {
    try {
      const res = await axiosServices().put(`/api/users/disable-user`, {
        id: data.id,
      });
      if (res.status === 200) {
        toast({
          title: "Berhasil",
          description: "User berhasil dinonaktifkan",
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
        <Button
          variant="ghost"
          className="w-full justify-start text-destructive"
        >
          <Delete className="mr-2" size={15} /> <span>Hapus</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-destructive">
            Nonaktifkan User?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Apakah anda yakin ingin menonaktifkan user ini?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction
            className="text-white bg-destructive"
            onClick={onDelete}
          >
            Nonaktifkan
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ModalNonaktifkanUser;
