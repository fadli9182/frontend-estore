import { BaseTable } from "@/components/features/table/BaseTable";
import TypoH1 from "@/components/typhography/TypoH1";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { axiosServices } from "@/services/axios";
import { formatDate, formatDatePayload, formatNumber } from "@/utils/utils";
import React from "react";
import { useQuery } from "react-query";
import FormFilterLaporanPenerimaan from "./components/FormFilterLaporanPenerimaan";
import { Download, Filter, Printer } from "lucide-react";
import { useReactToPrint } from "react-to-print";
import DokumenPrintLaporanMasuk from "./components/DokumenPrintLaporanMasuk";
import { utils, writeFile } from "xlsx";
import { BASE_TITLE } from "@/config";
import { useGetDataBarang } from "@/hooks/useGetDataBarang";

const LaporanPenerimaan = () => {
  const [date, setDate] = React.useState<any>([
    new Date(new Date().setDate(new Date().getDate() - 30)),
    new Date(),
  ]);
  const [selectedSupplier, setSelectedSupplier] = React.useState<any>({
    value: "",
    label: "Semua",
  });

  const printRef = React.useRef<any>(null);
  const excelRef = React.useRef<any>(null);

  const print = useReactToPrint({
    content: () => printRef.current,
  });

  const { data: dataBarang } = useGetDataBarang();

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

  const xport = React.useCallback(() => {
    /* Create worksheet from HTML DOM TABLE */
    const wb = utils.table_to_book(excelRef.current);

    /* Export to file (start a download) */
    writeFile(wb, "Laporan Pengeluaran Barang.xlsx");
  }, [dataBarangMasuk]);

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
        cell: (info) => <span>{formatDate(info.getValue())}</span>,
        header: () => <span className="whitespace-nowrap">Tanggal Masuk</span>,
        enableColumnFilter: false,
      },
      {
        accessorFn: (row) => row.nama_supplier,
        id: "nama_supplier",
        cell: (info) => info.getValue(),
        header: () => <span className="whitespace-nowrap">Supplier</span>,
        enableColumnFilter: false,
      },
      {
        accessorFn: (row) => row.nama_barang,
        id: "nama_barang",
        cell: (info) => info.getValue(),
        header: () => <span className="whitespace-nowrap">Barang</span>,
        enableColumnFilter: false,
      },

      {
        accessorFn: (row) => row.jumlah_barang_masuk,
        id: "jumlah_barang_masuk",
        cell: (info) => formatNumber(info.getValue()),
        header: () => <span className="whitespace-nowrap">Jumlah</span>,
        enableColumnFilter: false,
      },
      {
        accessorFn: (row) => row.satuan,
        id: "satuan",
        cell: (info) => {
          return dataBarang?.find(
            (item) => item.nama_barang === info.row.original.nama_barang
          )?.nama_satuan;
        },
        header: () => <span className="whitespace-nowrap">Satuan</span>,
        enableColumnFilter: false,
      },
      {
        accessorFn: (row) => row.total_harga,
        id: "total_harga",
        cell: (info) => (
          <span className="flex justify-end">
            {formatNumber(info.getValue())}
          </span>
        ),
        header: () => <span className="whitespace-nowrap">Harga</span>,
        enableColumnFilter: false,
      },
    ],
    [dataBarang]
  );

  if (isLoading) return <p>Loading...</p>;

  document.title = "Laporan Barang Masuk" + BASE_TITLE;

  return (
    <main className="base-card">
      <TypoH1>Laporan Barang Masuk</TypoH1>
      <section className="flex flex-col md:flex-row gap-2 md:justify-between md:items-end mt-4">
        <FormFilterLaporanPenerimaan
          date={date}
          setDate={setDate}
          title="Barang Masuk"
          selectedSupplier={selectedSupplier}
          setSelectedSupplier={setSelectedSupplier}
        />

        <div className="flex flex-row gap-3 items-end">
          <Button
            className="w-full md:w-28"
            variant={"outline"}
            onClick={print}
            disabled={dataBarangMasuk.length === 0}
          >
            <Printer className="mr-2" size={16} />
            Cetak
          </Button>
          <Button
            className="w-full md:w-28"
            variant={"outline"}
            onClick={xport}
            disabled={dataBarangMasuk?.length === 0}
          >
            <Download className="mr-2" size={16} />
            Excel
          </Button>
          <Button className="w-full md:w-28" onClick={() => refetch()}>
            <Filter className="mr-2" size={16} />
            Filter
          </Button>
        </div>
      </section>

      <section>
        <BaseTable data={dataBarangMasuk} columns={columns} />
      </section>
      <div className="hidden">
        <DokumenPrintLaporanMasuk
          data={dataBarangMasuk}
          ref={printRef}
          excelRef={excelRef}
          dataBarang={dataBarang}
        />
      </div>
    </main>
  );
};

export default LaporanPenerimaan;
