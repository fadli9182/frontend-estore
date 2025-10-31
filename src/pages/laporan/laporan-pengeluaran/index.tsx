import { BaseTable } from "@/components/features/table/BaseTable";
import TypoH1 from "@/components/typhography/TypoH1";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { axiosServices } from "@/services/axios";
import { formatDate, formatDatePayload, formatNumber } from "@/utils/utils";
import React from "react";
import { useQuery } from "react-query";
import FormFilterLaporanPengeluaran from "./components/FormFilterLaporanPengeluaran";
import { Download, Filter, Printer } from "lucide-react";
import DokumenPrintLaporanKeluar from "./components/DokumenPrintLaporanKeluar";
import { useReactToPrint } from "react-to-print";
import { utils, writeFile } from "xlsx";
import LoadingFile from "@/components/loader/LoadingFile";
import { BASE_TITLE } from "@/config";
import { useGetSatuan } from "@/hooks/useGetSatuan";

const LaporanPengeluaranPage = () => {
  const [date, setDate] = React.useState<any>([
    new Date(new Date().setDate(new Date().getDate() - 30)),
    new Date(),
  ]);

  const [selectedNamaRuang, setSelectedNamaRuang] = React.useState<any>({
    value: "",
    label: "Semua",
  });

  const printRef = React.useRef<any>(null);
  const excelRef = React.useRef<any>(null);

  const print = useReactToPrint({
    content: () => printRef.current,
  });

  const { data: dataSatuan } = useGetSatuan();

  const fetchData = async () => {
    try {
      const res = await axiosServices().post(
        "/api/transaksi/get-all-permintaan-barang",
        {
          startDate: formatDatePayload(date[0]),
          endDate: formatDatePayload(date[1]),
          id_ruang_kerja: selectedNamaRuang.value,
          status_permintaan: "success",
        }
      );
      return res.data;
    } catch (error: any) {
      toast({
        title: "Gagal",
        description: error.response.data.message,
        variant: "destructive",
      });
    }
  };

  const {
    data: dataPermintaan,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: "data-list-minta-barang",
    queryFn: fetchData,
    refetchOnWindowFocus: false,
    refetchInterval: 1000 * 60 * 5,
  });

  const xport = React.useCallback(() => {
    /* Create worksheet from HTML DOM TABLE */
    const wb = utils.table_to_book(excelRef.current);

    /* Export to file (start a download) */
    writeFile(wb, "Laporan Pengeluaran Barang.xlsx");
  }, [dataPermintaan]);

  const fetchDataListUser = async () => {
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

  const { data: dataListUser } = useQuery({
    queryKey: "fetch-list-user",
    queryFn: fetchDataListUser,
    refetchOnWindowFocus: false,
  });

  function findNamaUser(id: number) {
    if (!id) return "-";
    const result = dataListUser?.find((item: any) => item.id === id);
    return result;
  }

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
        accessorFn: (row) => row.id_permintaan,
        id: "id_permintaan",
        cell: (info) => info.getValue(),
        header: () => <span className="whitespace-nowrap">ID Transaksi</span>,
        enableColumnFilter: false,
      },
      {
        accessorFn: (row) => row.tgl_permintaan,
        id: "tgl_permintaan",
        header: () => <span>Tanggal Permintaan</span>,
        cell: (info) => (
          <span className="whitespace-nowrap">
            {formatDate(info.getValue())}
          </span>
        ),
        footer: (props) => props.column.id,
        enableColumnFilter: false,
      },
      {
        accessorFn: (row) => row.nama_user,
        id: "nama_user",
        header: () => <span>Nama Pemesan</span>,
        cell: (info) => <span>{info.getValue()}</span>,
        footer: (props) => props.column.id,
        enableColumnFilter: false,
      },

      {
        accessorFn: (row) => row.nama_barang,
        id: "nama_barang",
        header: () => <span className="whitespace-nowrap">Nama Barang</span>,
        cell: (info) => <span>{info.getValue()}</span>,
        footer: (props) => props.column.id,
        enableColumnFilter: false,
      },

      {
        accessorFn: (row) => row.jumlah_barang_minta,
        id: "jumlah_barang_minta",
        header: () => <span className="whitespace-nowrap">Jumlah</span>,
        cell: (info) => (
          <span className="flex justify-center">
            {formatNumber(info.getValue())}{" "}
          </span>
        ),
        footer: (props) => props.column.id,
        enableColumnFilter: false,
      },
      {
        accessorFn: (row) => row.id_satuan,
        id: "id_satuan",
        header: () => <span className="whitespace-nowrap">Satuan</span>,
        cell: (info) => (
          <span>
            {
              dataSatuan?.find(
                (item: any) => item.id_satuan === info.getValue()
              )?.nama_satuan
            }
          </span>
        ),
        footer: (props) => props.column.id,
        enableColumnFilter: false,
      },
      {
        accessorFn: (row) => row.ket_minta,
        id: "ket_minta",
        header: () => <span className="whitespace-nowrap">Keterangan</span>,
        cell: (info) => <span>{info.getValue() || "-"}</span>,
        footer: (props) => props.column.id,
        enableColumnFilter: false,
      },
    ],
    [dataPermintaan, dataSatuan]
  );

  if (isLoading) {
    return <LoadingFile open={true} />;
  }

  document.title = "Laporan Pengeluaran" + BASE_TITLE;

  return (
    <main className="base-card">
      <TypoH1>Laporan Pengeluaran</TypoH1>
      <section className="flex flex-col md:flex-row gap-2 md:justify-between md:items-end mt-4">
        <FormFilterLaporanPengeluaran
          date={date}
          setDate={setDate}
          title="Barang Masuk"
          key={"form-filter-laporan-penerimaan"}
          selectedNamaRuang={selectedNamaRuang}
          setSelectedNamaRuang={setSelectedNamaRuang}
        />
        <div className="flex flex-row gap-3 items-end">
          <Button
            className="w-full md:w-28"
            variant={"outline"}
            onClick={print}
            disabled={dataPermintaan?.length === 0}
          >
            <Printer className="mr-2" size={16} />
            Cetak
          </Button>
          <Button
            className="w-full md:w-28"
            variant={"outline"}
            onClick={xport}
            disabled={dataPermintaan?.length === 0}
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
        <BaseTable data={dataPermintaan} columns={columns} />
      </section>

      <div className="hidden">
        <DokumenPrintLaporanKeluar
          data={dataPermintaan}
          ref={printRef}
          excelRef={excelRef}
          findNamaUser={findNamaUser}
          dataSatuan={dataSatuan}
        />
      </div>
    </main>
  );
};

export default LaporanPengeluaranPage;
