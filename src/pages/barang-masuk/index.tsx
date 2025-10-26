import { BaseTable } from "@/components/features/table/BaseTable";
import React from "react";
import ModalTambah from "./modal/ModalTambah";
import { axiosServices } from "@/services/axios";
import { toast } from "@/components/ui/use-toast";
import { useQuery } from "react-query";
import { formatDate, formatDatePayload, formatNumber } from "@/utils/utils";
import { Button } from "@/components/ui/button";
import FormFilterLaporanPenerimaan from "../laporan/lap-rincian-penerimaan/components/FormFilterLaporanPenerimaan";
import LoadingFile from "@/components/loader/LoadingFile";
import DropdownAksiBarangMasuk from "./components/DropdownAksiBarangMasuk";
import { BASE_TITLE } from "@/config";

const BarangMasukPage = () => {
  const [showModalTambah, setShowModalTambah] = React.useState(false);

  const [date, setDate] = React.useState<any>([
    new Date(new Date().setDate(new Date().getDate() - 30)),
    new Date(),
  ]);

  const [selectedSupplier, setSelectedSupplier] = React.useState<any>({
    value: "",
    label: "Semua",
  });

  const fetchData = async () => {
    try {
      const res = await axiosServices().post(
        "/api/transaksi/get-barang-masuk",
        {
          startDate: formatDatePayload(date[0]),
          endDate: formatDatePayload(date[1]),
          id_supplier: selectedSupplier.value,
        }
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
    data: dataBarangMasuk,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: "data-barang-masuk",
    queryFn: fetchData,
    refetchOnWindowFocus: false,
    refetchInterval: 1000 * 60 * 5,
  });

  const columns = React.useMemo(
    () => [
      {
        accessorKey: "no",
        id: "no",
        accessorFn: (row, index) => index + 1,
        header: () => <span>No</span>,
        enableColumnFilter: false,
      },
      {
        accessorFn: (row) => row.id_transaksi,
        id: "id_transaksi",
        cell: (info) => info.getValue(),
        header: () => <span className="whitespace-nowrap">ID Transaksi</span>,
        enableColumnFilter: false,
      },
      {
        accessorFn: (row) => row.tgl_masuk,
        id: "tgl_masuk",
        cell: (info) => (
          <span>
            {formatDate(info.getValue())} -{" "}
            {info.row.original.jam_masuk || "00:00"}
          </span>
        ),
        header: () => <span className="whitespace-nowrap">Tanggal Masuk</span>,
        enableColumnFilter: false,
      },

      {
        accessorFn: (row) => row.nama_supplier,
        id: "nama_supplier",
        cell: (info) => info.getValue(),
        header: () => <span className="whitespace-nowrap">Supplier</span>,
        enableColumnFilter: true,
      },
      {
        accessorFn: (row) => row.nama_barang,
        id: "nama_barang",
        cell: (info) => info.getValue(),
        header: () => <span className="whitespace-nowrap">Barang</span>,
        enableColumnFilter: true,
      },

      {
        accessorFn: (row) => row.jumlah_barang_masuk,
        id: "jumlah_barang_masuk",
        cell: (info) => formatNumber(info.getValue()),
        header: () => <span className="whitespace-nowrap">Jumlah</span>,
        enableColumnFilter: false,
      },
      {
        accessorFn: (row) => row.total_harga,
        id: "total_harga",
        cell: (info) => formatNumber(info.getValue()),
        header: () => <span className="whitespace-nowrap">Harga</span>,
        enableColumnFilter: false,
      },
      {
        accessorKey: "aksi",
        header: "Aksi",
        footer: (props) => props.column.id,
        enableColumnFilter: false,
        cell: ({ row }) => {
          return (
            <div className="flex justify-center items-center gap-2">
              <DropdownAksiBarangMasuk data={row?.original} refetch={refetch} />
            </div>
          );
        },
      },
    ],
    []
  );

  if (isLoading) return <LoadingFile open={true} />;

  document.title = "Barang Masuk" + BASE_TITLE;

  return (
    <section className="base-card">
      <h1 className="text-3xl font-bold">Barang Masuk</h1>
      <section className="flex flex-col md:flex-row gap-2 md:justify-between md:items-end mt-4">
        <FormFilterLaporanPenerimaan
          date={date}
          setDate={setDate}
          title="Barang Masuk"
          selectedSupplier={selectedSupplier}
          setSelectedSupplier={setSelectedSupplier}
        />
        <Button className="w-full md:w-28" onClick={() => refetch()}>
          Filter
        </Button>
      </section>
      <section className="base-card mt-3">
        <div className="flex justify-between items-center">
          <p>Data Barang Masuk</p>
          <ModalTambah
            refetch={refetch}
            open={showModalTambah}
            setOpen={setShowModalTambah}
          />
        </div>
        <section className="overflow-auto Flipped scroll__primary mt-3">
          <BaseTable data={dataBarangMasuk} columns={columns} />
        </section>
      </section>
    </section>
  );
};

export default BarangMasukPage;
