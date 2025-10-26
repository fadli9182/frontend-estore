/* eslint-disable react-hooks/exhaustive-deps */
import { BaseTable } from "@/components/features/table/BaseTable";
import React from "react";
import ModalTambah from "./modal/ModalTambah";
import { useGetSatuan } from "@/hooks/useGetSatuan";
import DropdownAksiSatuan from "./modal/DropdownAksi";
import LoadingFile from "@/components/loader/LoadingFile";
import { BASE_TITLE } from "@/config";

const SatuanBarangPage = () => {
  const [showModalTambah, setShowModalTambah] = React.useState(false);

  const {
    data: dataSatuan,
    isLoading: isLoadingSatuan,
    refetch: refetchSatuan,
  } = useGetSatuan();

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
        accessorFn: (row) => row.nama_satuan,
        id: "nama_satuan",
        cell: (info) => info.getValue(),
        header: () => <span className="whitespace-nowrap">Satuan</span>,
        enableColumnFilter: true,
      },
      {
        accessorKey: "aksi",
        header: "Aksi",
        footer: (props) => props.column.id,
        enableColumnFilter: false,
        cell: ({ row }) => {
          return (
            <div className="flex justify-center items-center gap-2">
              <DropdownAksiSatuan
                data={row?.original}
                refetch={refetchSatuan}
              />
            </div>
          );
        },
      },
    ],
    []
  );

  if (isLoadingSatuan) {
    return <LoadingFile open={true} />;
  }

  document.title = "Satuan Barang" + BASE_TITLE;

  return (
    <section className="base-card">
      <h1 className="text-3xl font-bold">Satuan</h1>
      <section className="base-card mt-3">
        <div className="flex justify-between items-center">
          <p>Data Satuan</p>
          <ModalTambah
            refetch={refetchSatuan}
            open={showModalTambah}
            setOpen={setShowModalTambah}
          />
        </div>
        <BaseTable data={dataSatuan} columns={columns} />
      </section>
    </section>
  );
};

export default SatuanBarangPage;
