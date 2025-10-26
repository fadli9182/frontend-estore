import { toast } from "@/components/ui/use-toast";
import { axiosServices } from "@/services/axios";
import { useQuery } from "react-query";

export const useGetListBarang = () => {
  const fetchData = async () => {
    try {
      const response = await axiosServices().get(
        `api/master-data/get-data-barang`
      );
      return response.data;
    } catch (err: any) {
      toast({
        title: "Gagal",
        description: err.response.data.message,
        variant: "destructive",
      });
    }
  };

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: "list-barang",
    queryFn: fetchData,
    refetchOnWindowFocus: false,
  });

  const dataList = data?.map((item) => ({
    label: item.nama_barang,
    value: item.id_barang,
  }));

  return { data, dataList, error, isLoading, refetch };
};
