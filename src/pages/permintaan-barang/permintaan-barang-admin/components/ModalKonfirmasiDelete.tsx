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
import { toast } from "@/components/ui/use-toast";
import { axiosServices } from "@/services/axios";
import { CheckCheck } from "lucide-react";
import React from "react";
import { BsEraserFill } from "react-icons/bs";

const ModalKonfirmasiDelete = ({ data, refetch, isAdmin = false }) => {
  const [loading, setLoading] = React.useState(false);

  const onConfirm = async () => {
    setLoading(true);
    try {
      const res = await axiosServices().post(
        `/api/transaksi/delete-permintaan-barang`,
        data.map((item) => ({
          ...item,
        }))
      );
      if (res.status === 200) {
        toast({
          title: "Berhasil",
          description: "Berhasil menghapus permintaan barang",
        });
        refetch();
        setLoading(false);
      }
    } catch (error: any) {
      toast({
        title: "Gagal",
        description: error.response.data.message,
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {isAdmin ? (
          <Button variant={"destructive"}>
            <CheckCheck className="mr-2" size={16} /> Hapus
          </Button>
        ) : (
          <div className="flex items-center hover:font-bold w-full p-2 cursor-pointer text-destructive">
            <BsEraserFill className="mr-3" size={16} /> Batalkan
          </div>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-destructive">
            Konfirmasi Hapus Permintaan
          </AlertDialogTitle>
          <AlertDialogDescription>
            Apakah anda yakin ingin hapus permintaan tersebut?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              className="bg-destructive"
              variant={"destructive"}
              onClick={() => {
                onConfirm();
                close();
              }}
            >
              {loading ? "Loading..." : "Ya Hapus"}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ModalKonfirmasiDelete;
