import { toast } from "@/components/ui/use-toast";
import { axiosServices } from "@/services/axios";
import { useQuery } from "react-query";

export const useGetRole = () => {
  const fetchData = async () => {
    try {
      const response = await axiosServices().get(`/api/role/list`);
      return response.data.data_role;
    } catch (err: any) {
      toast({
        title: "Gagal",
        description: err.response.data.message,
        variant: "destructive",
      });
    }
  };

  const { data, error, isLoading } = useQuery({
    queryKey: "roles",
    queryFn: fetchData,
    refetchOnWindowFocus: false,
  });

  const dataList = data?.data?.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  return { data, dataList, error, isLoading };
};
