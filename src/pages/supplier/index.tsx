import { BaseTable } from "@/components/features/table/BaseTable";
import React from "react";
import ModalTambahSuplier from "./modal/ModalTambahSuplier";
import DropdownAksiSupplier from "./modal/DropdownAksiSupplier";
import { useGetSupplier } from "@/hooks/useGetSupplier";
import LoadingFile from "@/components/loader/LoadingFile";
import { BASE_TITLE } from "@/config";

const SupplierPage = () => {
  const [showModalTambah, setShowModalTambah] = React.useState(false);

  const { data: dataSupplier, isLoading, refetch } = useGetSupplier();

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
        accessorFn: (row) => row.nama_supplier,
        id: "nama_supplier",
        cell: (info) => info.getValue(),
        header: () => <span className="whitespace-nowrap">Nama Supplier</span>,
        enableColumnFilter: true,
      },
      {
        accessorFn: (row) => row.no_telp_supplier,
        id: "no_telp_supplier",
        header: () => <span className="whitespace-nowrap">Nomor Telepon</span>,
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        // filterFn: "fuzzy",
        // sortingFn: fuzzySort,
      },
      {
        accessorFn: (row) => row.alamat_supplier,
        id: "alamat_supplier",
        header: "Alamat",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "aksi",
        header: "Aksi",
        footer: (props) => props.column.id,
        enableColumnFilter: false,
        cell: ({ row }) => {
          return (
            <div className="flex justify-center items-center gap-2">
              <DropdownAksiSupplier data={row?.original} refetch={refetch} />
            </div>
          );
        },
      },
    ],
    []
  );

  if (isLoading) {
    return <LoadingFile open />;
  }

  document.title = "Supplier" + BASE_TITLE;

  return (
    <section className="base-card">
      <h1 className="text-3xl font-bold">Supplier</h1>
      <section className="base-card mt-3">
        <div className="flex justify-between items-center">
          <p>Data Supplier</p>
          <ModalTambahSuplier
            refetch={refetch}
            open={showModalTambah}
            setOpen={setShowModalTambah}
          />
        </div>
        <BaseTable data={dataSupplier} columns={columns} />
      </section>
    </section>
  );
};

export default SupplierPage;
