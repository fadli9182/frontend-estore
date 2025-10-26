/* eslint-disable react-hooks/exhaustive-deps */
import { BaseTable } from "@/components/features/table/BaseTable";
import React from "react";
import ModalTambah from "./modal/ModalTambah";
import { useGetKategori } from "@/hooks/useGetKategori";
import DropdownAksiKategori from "./modal/DropdownAksi";
import LoadingFile from "@/components/loader/LoadingFile";
import { BASE_TITLE } from "@/config";

const KategoriBarangPage = () => {
  const [showModalTambah, setShowModalTambah] = React.useState(false);

  const {
    data: dataKategori,
    isLoading: isLoadingKategori,
    refetch: refetchKategori,
  } = useGetKategori();

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
        accessorFn: (row) => row.nama_kategori,
        id: "nama_kategori",
        cell: (info) => info.getValue(),
        header: () => <span className="whitespace-nowrap">Nama Kategori</span>,
        enableColumnFilter: true,
      },
      {
        accessorFn: (row) => row.order_number,
        id: "order_number",
        cell: (info) => info.getValue(),
        header: () => (
          <span className="whitespace-nowrap">Urutan Kategori</span>
        ),
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
              <DropdownAksiKategori
                data={row?.original}
                refetch={refetchKategori}
              />
            </div>
          );
        },
      },
    ],
    []
  );

  if (isLoadingKategori) {
    return <LoadingFile open={true} />;
  }

  document.title = "Kategori Barang" + BASE_TITLE;

  return (
    <section className="base-card">
      <h1 className="text-3xl font-bold">Kategori</h1>
      <section className="base-card mt-3">
        <div className="flex justify-between items-center">
          <p>Data Kategori</p>
          <ModalTambah
            open={showModalTambah}
            setOpen={setShowModalTambah}
            isEdit={false}
            refetch={refetchKategori}
          />
        </div>
        <BaseTable data={dataKategori} columns={columns} />
      </section>
    </section>
  );
};

export default KategoriBarangPage;
