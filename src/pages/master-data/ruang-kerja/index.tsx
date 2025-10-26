import { BaseTable } from "@/components/features/table/BaseTable";
import React from "react";
import ModalTambah from "./modal/ModalTambah";
import { useGetRuangKerja } from "@/hooks/useGetRuangKerja";
import DropdownAksiRuangKerja from "./modal/DropdownAksi";
import LoadingFile from "@/components/loader/LoadingFile";
import { BASE_TITLE } from "@/config";

const RuangKerjaPage = () => {
  const [showModalTambah, setShowModalTambah] = React.useState(false);

  const {
    data: dataRuangKerja,
    isLoading: isLoadingRuangKerja,
    refetch: refetchRuangKerja,
  } = useGetRuangKerja();

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
        accessorFn: (row) => row.nama_ruang,
        id: "nama_ruang",
        cell: (info) => info.getValue(),
        header: () => (
          <span className="whitespace-nowrap">Nama Ruang Kerja</span>
        ),
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
              <DropdownAksiRuangKerja
                data={row.original}
                refetch={refetchRuangKerja}
              />
            </div>
          );
        },
      },
    ],
    []
  );

  if (isLoadingRuangKerja) {
    return <LoadingFile open={true} />;
  }

  document.title = "Ruang Kerja" + BASE_TITLE;

  return (
    <section className="base-card">
      <h1 className="text-3xl font-bold">Kategori</h1>
      <section className="base-card mt-3">
        <div className="flex justify-between items-center">
          <p>Data Kategori</p>
          <ModalTambah
            open={showModalTambah}
            setOpen={setShowModalTambah}
            refetch={refetchRuangKerja}
          />
        </div>
        <BaseTable data={dataRuangKerja} columns={columns} />
      </section>
    </section>
  );
};

export default RuangKerjaPage;
