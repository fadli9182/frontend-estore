import { axiosServices } from "@/services/axios";
import { useQuery } from "react-query";
import { BASE_TITLE } from "@/config";
import { BaseTable } from "@/components/features/table/BaseTable";
import React from "react";
import DropdownAksiUser from "./modal/DropdownAksiUser";
import { useGetRuangKerja } from "@/hooks/useGetRuangKerja";
import { toast } from "@/components/ui/use-toast";
import ModalTambahUser from "./modal/ModalTambahUser";
import LoadingFile from "@/components/loader/LoadingFile";

const ListUserPage = () => {
  const [showModalTambah, setShowModalTambah] = React.useState(false);
  const { data: dataRuangKerja, isLoading: loadingRuangKerja } =
    useGetRuangKerja();

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

  const {
    data: dataListUser,
    isLoading: loadingListUser,
    refetch: refetchListUser,
  } = useQuery({
    queryKey: "listUser",
    queryFn: fetchData,
    refetchOnWindowFocus: false,
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
        accessorFn: (row) => row.username,
        id: "username",
        cell: (info) => info.getValue(),
        header: () => <span className="whitespace-nowrap">Username</span>,
        enableColumnFilter: true,
      },
      {
        accessorFn: (row) => row.email,
        id: "email",
        cell: (info) => info.getValue(),
        header: () => <span className="whitespace-nowrap">Email</span>,
        enableColumnFilter: true,
      },
      {
        accessorFn: (row) => row.fullname,
        id: "fullname",
        cell: (info) => info.getValue(),
        header: () => <span className="whitespace-nowrap">Nama User</span>,
        enableColumnFilter: true,
      },

      {
        accessorFn: (row) => row.no_wa,
        id: "no_wa",
        header: () => <span className="whitespace-nowrap">Nomor Telepon</span>,
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        enableColumnFilter: false,
        // filterFn: "fuzzy",
        // sortingFn: fuzzySort,
      },
      {
        accessorFn: (row) => row.role,
        id: "role",
        header: () => <span className="whitespace-nowrap">Role</span>,
        cell: (info) => <span className="capitalize">{info?.getValue()}</span>,
        footer: (props) => props.column.id,
        enableColumnFilter: false,
      },
      {
        accessorFn: (row) => row.status,
        id: "status",
        header: () => <span className="whitespace-nowrap">Status</span>,
        cell: (info) => <span className="capitalize">{info?.getValue()}</span>,
        footer: (props) => props.column.id,
        enableColumnFilter: false,
      },
      {
        accessorFn: (row) => row.tgl_input,
        id: "tgl_input",
        header: () => <span className="whitespace-nowrap">Tanggal Dibuat</span>,
        cell: (info) => <span className="capitalize">{info?.getValue()}</span>,
        footer: (props) => props.column.id,
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
              <DropdownAksiUser
                data={row?.original}
                refetch={refetchListUser}
              />
            </div>
          );
        },
      },
    ],
    [dataRuangKerja, dataListUser]
  );

  if (loadingListUser && loadingRuangKerja) {
    return <LoadingFile open={true} />;
  }

  document.title = "User Management" + BASE_TITLE;

  return (
    <div className="base-card bg-background">
      <div className="font-semibold text-[28px] mb-3">User</div>
      <section className="base-card mt-3">
        <div className="flex justify-between items-center">
          <div className="flex justify-between w-full">
            <p>List Data User</p>
            <ModalTambahUser
              refetch={refetchListUser}
              open={showModalTambah}
              setOpen={setShowModalTambah}
            />
          </div>
        </div>
        <BaseTable data={dataListUser} columns={columns} />
      </section>
    </div>
  );
};

export default ListUserPage;
