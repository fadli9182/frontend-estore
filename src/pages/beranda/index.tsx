import { BASE_TITLE } from "@/config";
import { Card, CardContent } from "@/components/ui/card";
import { Container, PackageSearch, User } from "lucide-react";
import Chart from "react-apexcharts";
import { cn } from "@/lib/utils";
import { useGetDataBarang } from "@/hooks/useGetDataBarang";
import { useGetSupplier } from "@/hooks/useGetSupplier";
import { useQuery } from "react-query";
import { axiosServices } from "@/services/axios";
import { Skeleton } from "primereact/skeleton";
import { toast } from "@/components/ui/use-toast";
import LoadingFile from "@/components/loader/LoadingFile";

const Beranda = () => {
  const { data: dataBarang, isLoading: isLoadingBarang } = useGetDataBarang();
  const { data: dataSupplier, isLoading: isLoadingSupplier } = useGetSupplier();

  const fetchData = async () => {
    try {
      const response = await axiosServices().get(`/api/users/get-user`);
      return response.data;
    } catch (err: any) {
      toast({
        title: "Gagal",
        description: err.response.data.message,
        variant: "destructive",
      });
    }
  };

  const { data: dataListUser, isLoading: loadingListUser } = useQuery({
    queryKey: "listUser",
    queryFn: fetchData,
    refetchOnWindowFocus: false,
  });

  const cardMenu = [
    {
      title: "Total Barang",
      value: dataBarang?.length || 0,
      icon: <PackageSearch size={58} className="opacity-25" />,
      className: "bg-gradient-to-r from-yellow-600 to-yellow-300",
    },
    {
      title: "Total Supplier",
      value: dataSupplier?.length || 0,
      icon: <Container size={58} className="opacity-25" />,
      className: "bg-gradient-to-r from-purple-600 to-purple-300",
    },
    {
      title: "Total User",
      value: dataListUser?.length || 0,
      icon: <User size={58} className="opacity-25" />,
      className: "bg-gradient-to-r from-blue-600 to-blue-300",
    },
  ];

  const fetchBarangMasukPerbulan = async () => {
    try {
      const res = await axiosServices().get(
        "/api/transaksi/get-barang-masuk-perbulan"
      );
      return res.data;
    } catch (err: any) {
      toast({
        title: "Gagal",
        description: err.response.data.message,
        variant: "destructive",
      });
    }
  };

  const {
    data: dataBarangMasukPerbulan,
    isLoading: loadingBarangMasukPerbulan,
  } = useQuery({
    queryKey: "data-barang-masuk-perbulan",
    queryFn: fetchBarangMasukPerbulan,
    refetchOnWindowFocus: false,
  });

  const fetchBarangKeluarPerbulan = async () => {
    try {
      const res = await axiosServices().get(
        "/api/transaksi/get-permintaan-barang-perbulan"
      );
      return res.data;
    } catch (err: any) {
      toast({
        title: "Gagal",
        description: err.response.data.message,
        variant: "destructive",
      });
    }
  };

  const {
    data: dataBarangKeluarPerbulan,
    isLoading: loadingBarangKeluarPerbulan,
  } = useQuery({
    queryKey: "data-barang-keluar-perbulan",
    queryFn: fetchBarangKeluarPerbulan,
    refetchOnWindowFocus: false,
  });

  const chartData = {
    height: 350,
    type: "line",
    options: {
      chart: {
        stacked: false,
      },
      stroke: {
        width: [0, 5],
        curve: "smooth",
      },
      plotOptions: {
        bar: {
          columnWidth: "50%",
        },
      },
      colors: ["#4099ff", "#2ed8b6"],
      fill: {
        opacity: [0.85, 1],
      },
      labels: dataBarangMasukPerbulan?.map((item) => item.bulan),
      markers: {
        size: 0,
      },
      yaxis: {
        min: 0,
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: function (y) {
            if (typeof y !== "undefined") {
              return y.toFixed(0) + " Transaksi";
            }
            return y;
          },
        },
      },
      legend: {
        labels: {
          useSeriesColors: true,
        },
        markers: {
          customHTML: [
            function () {
              return "";
            },
            function () {
              return "";
            },
          ],
        },
      },
    },
    series: [
      {
        name: "Barang Masuk",
        type: "column",
        data: dataBarangMasukPerbulan?.map((item) => item.total_barang_masuk),
      },
      {
        name: "Barang Keluar",
        type: "line",
        data: dataBarangKeluarPerbulan?.map(
          (item) => item.total_permintaan_barang
        ),
      },
    ],
  };

  if (
    isLoadingBarang ||
    isLoadingSupplier ||
    loadingListUser ||
    loadingBarangMasukPerbulan ||
    loadingBarangKeluarPerbulan
  ) {
    return <LoadingFile open />;
  }

  document.title = "Beranda" + BASE_TITLE;

  return (
    <section className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 gap-3 w-full">
        {cardMenu.map((item, index) => (
          <Card key={index} className="w-full h-full">
            <CardContent
              className={cn(
                "flex items-center justify-between p-4 rounded-lg h-full",
                item.className
              )}
            >
              <div className="text-white min-w-[100px] space-y-3">
                <p className="text-xl xl:text-2xl font-normal">
                  {isLoadingBarang ? <Skeleton width="w-full" /> : item.title}
                </p>
                <p className="text-2xl xl:text-3xl font-bold">
                  {isLoadingBarang ? <Skeleton width="w-[50px]" /> : item.value}
                </p>
              </div>
              {item.icon}
            </CardContent>
          </Card>
        ))}
      </div>
      <section className="w-full">
        <div className="base-card w-full">
          <p className="text-2xl self-start">
            Transaksi Barang Perbulan Tahun 2025
          </p>
          <Chart {...chartData} />
        </div>
      </section>
    </section>
  );
};

export default Beranda;
