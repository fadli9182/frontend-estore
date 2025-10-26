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

const ModalHapusBarangMasuk = ({ data, refetch }) => {
  async function onDelete() {
    try {
      const res = await axiosServices().post(
        `/api/transaksi/delete-barang-masuk`,
        {
          id_transaksi: data.id_transaksi,
          id_barang: data.id_barang,
          stock_kurang: data.jumlah_barang_masuk,
        }
      );
      if (res.status === 200) {
        toast({
          title: "Berhasil",
          description: "Barang Masuk Berhasil Dihapus",
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
          <Power className="mr-2" size={15} /> <span>Hapus</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-destructive">
            Hapus Barang Masuk ?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Apakah anda yakin ingin mehapus data barang masuk{" "}
            {data?.id_transaksi} ini?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction
            className="text-white bg-destructive"
            onClick={onDelete}
          >
            Hapus
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ModalHapusBarangMasuk;
