import { toast } from "@/components/ui/use-toast";
import { axiosServices } from "@/services/axios";
import { useQuery } from "react-query";

export const useGetRuangKerja = () => {
  const fetchData = async () => {
    try {
      const response = await axiosServices().get(
        `api/master-data/get-ruang-kerja`
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
    queryKey: "list-ruang-kerja",
    queryFn: fetchData,
    refetchOnWindowFocus: false,
  });

  const dataList = data?.map((item) => ({
    label: item.nama_ruang,
    value: item.id_ruang_kerja,
  }));

  return { data, dataList, error, isLoading, refetch };
};
