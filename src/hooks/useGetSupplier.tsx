import { toast } from "@/components/ui/use-toast";
import { axiosServices } from "@/services/axios";
import { useQuery } from "react-query";

export const useGetSupplier = () => {
  const fetchData = async () => {
    try {
      const response = await axiosServices().get(`api/supplier/get-supplier`);
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
    queryKey: "list-supplier",
    queryFn: fetchData,
    refetchOnWindowFocus: false,
  });

  const dataList = data?.map((item) => ({
    label: item.nama_supplier,
    value: item.id_supplier,
  }));

  return { data, dataList, error, isLoading, refetch };
};
