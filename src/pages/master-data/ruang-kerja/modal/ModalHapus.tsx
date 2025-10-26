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

const ModalHapusRuangKerja = ({ data, refetch }) => {
  async function onDelete() {
    try {
      const res = await axiosServices().delete(
        `/api/master-data/delete-ruang-kerja`,
        {
          data: {
            id_ruang_kerja: data.id_ruang_kerja,
          },
        }
      );
      if (res.status === 200) {
        toast({
          title: "Berhasil",
          description: "Ruang Kerja berhasil dihapus",
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
            Hapus Data Ruang kerja?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Apakah anda yakin ingin menghapus data ruang kerja ini?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction
            className="text-white bg-destructive"
            onClick={onDelete}
          >
            Hapus Ruang kerja
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ModalHapusRuangKerja;
