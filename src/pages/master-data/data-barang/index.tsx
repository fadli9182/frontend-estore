/* eslint-disable react-hooks/exhaustive-deps */
import { BaseTable } from "@/components/features/table/BaseTable";
import React from "react";
import ModalTambah from "./modal/ModalTambah";
import DropdownAksiBarang from "./modal/DropdownAksi";
import { toast } from "@/components/ui/use-toast";
import { axiosServices, baseURL } from "@/services/axios";
import { useQuery } from "react-query";
import { formatNumber } from "@/utils/utils";
import LoadingFile from "@/components/loader/LoadingFile";
import { BASE_TITLE } from "@/config";
import { Image } from "primereact/image";

const DataBarangPage = () => {
  const [showModalTambah, setShowModalTambah] = React.useState(false);

  const fetchData = async () => {
    try {
      const res = await axiosServices().get("/api/master-data/get-data-barang");
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
    data: dataBarang,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: "data-barang",
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
        accessorFn: (row) => row.gambar_barang,
        id: "gambar_barang",
        cell: ({ row }) => {
          return (
            <div className="flex justify-center">
              <Image
                preview
                src={`${baseURL}/uploads/${row.original.gambar_barang[0]}`}
                alt={row.original.nama_barang}
                width="64"
                height="64"
                imageClassName="w-20 h-20 object-cover rounded-md"
              />
            </div>
          );
        },
        header: () => <span className="whitespace-nowrap">Gambar Barang</span>,
        enableColumnFilter: false,
      },
      {
        accessorFn: (row) => row.nama_barang,
        id: "nama_barang",
        cell: (info) => (
          <span className="capitalize flex justify-center">
            {info.getValue()}
          </span>
        ),
        header: () => <span className="whitespace-nowrap">Nama Barang</span>,
        enableColumnFilter: true,
      },
      {
        accessorFn: (row) => row.nama_kategori,
        id: "nama_kategori",
        cell: (info) => (
          <span className="capitalize flex justify-center">
            {info.getValue()}
          </span>
        ),
        header: () => (
          <span className="whitespace-nowrap">Kategori Barang</span>
        ),
        enableColumnFilter: true,
        meta: {
          filterVariant: "select",
        },
      },
      {
        accessorFn: (row) => row.stok_barang,
        id: "stok_barang",
        cell: (info) => (
          <span className="capitalize flex justify-center">
            {formatNumber(info.getValue())}
          </span>
        ),
        header: () => <span className="whitespace-nowrap">Stock Barang</span>,
        enableColumnFilter: false,
      },
      {
        accessorFn: (row) => row.nama_satuan,
        id: "nama_satuan",
        cell: (info) => (
          <span className="capitalize flex justify-center">
            {info.getValue()}
          </span>
        ),
        header: () => <span className="whitespace-nowrap">Satuan Barang</span>,
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
              <DropdownAksiBarang data={row.original} refetch={refetch} />
            </div>
          );
        },
      },
    ],
    []
  );

  if (isLoading) {
    return <LoadingFile open={true} />;
  }

  document.title = "Data Barang" + BASE_TITLE;

  return (
    <section className="base-card">
      <h1 className="text-3xl font-bold">Barang</h1>
      <section className="base-card mt-3">
        <div className="flex justify-between items-center">
          <p>Data Barang</p>
          <ModalTambah
            open={showModalTambah}
            setOpen={setShowModalTambah}
            refetch={refetch}
          />
        </div>
        <BaseTable
          data={dataBarang?.sort((a, b) =>
            a.nama_barang.localeCompare(b.nama_barang)
          )}
          columns={columns}
        />
      </section>
    </section>
  );
};

export default DataBarangPage;
