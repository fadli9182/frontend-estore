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

const ModalHapusBarang = ({ data, refetch }) => {
  async function onDelete() {
    try {
      const res = await axiosServices().delete(
        `/api/master-data/delete-data-barang`,
        {
          data: {
            id_barang: data.id_barang,
          },
        }
      );
      if (res.status === 200) {
        toast({
          title: "Berhasil",
          description: "Barang berhasil dihapus",
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
        <div className="flex items-center hover:font-bold w-full px-2 cursor-pointer text-destructive">
          <Delete className="mr-3" size={16} /> Hapus
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-destructive">
            Hapus Data Barang?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Apakah anda yakin ingin menghapus data barang ini?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction
            className="text-white bg-destructive"
            onClick={onDelete}
          >
            Hapus Barang
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ModalHapusBarang;
