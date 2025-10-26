import { BaseTable } from "@/components/features/table/BaseTable";
import { toast } from "@/components/ui/use-toast";
import { axiosServices } from "@/services/axios";
import { formatDate, formatDatePayload, formatNumber } from "@/utils/utils";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import DropdownAksiMintaBarangAdmin from "./components/DropdownAksi";
import { useGetRuangKerja } from "@/hooks/useGetRuangKerja";
import TypoParagraph from "@/components/typhography/TypoParagraph";
import FormFilterBarangMasuk from "./components/FormFilterBarangMasuk";
import { Button } from "@/components/ui/button";
import ModalKonfirmasiDelete from "./components/ModalKonfirmasiDelete";
import LoadingFile from "@/components/loader/LoadingFile";
import { BASE_TITLE } from "@/config";
import { useGetListBarang } from "@/hooks/useGetListBarang";

const DataBarangPage = () => {
  const [date, setDate] = React.useState<any>([
    new Date(new Date().setDate(new Date().getDate() - 30)),
    new Date(),
  ]);
  const [mergedData, setMergedData] = React.useState<any[]>([]);

  const [selectedNamaRuang, setSelectedNamaRuang] = React.useState<any>({
    value: "",
    label: "Semua",
  });

  const [selectedStatus, setSelectedStatus] = React.useState<any>({
    value: "",
    label: "Semua",
  });

  const { dataList: optionsRuangKerja, isLoading: isLoadingRuangKerja } =
    useGetRuangKerja();

  const optionsStatus = [
    { value: "", label: "Semua" },
    { value: "pending", label: "Pending" },
    { value: "approved", label: "Approved" },
    { value: "success", label: "Success" },
  ];

  useEffect(() => {
    optionsRuangKerja?.unshift({
      value: "",
      label: "Semua",
    });
  }, [optionsRuangKerja]);

  const fetchData = async () => {
    try {
      const res = await axiosServices().post(
        "/api/transaksi/get-all-permintaan-barang",
        {
          startDate: formatDatePayload(date[0]),
          endDate: formatDatePayload(date[1]),
          id_ruang_kerja: selectedNamaRuang.value,
          status_permintaan: selectedStatus.value,
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

  const {
    data: dataPermintaan,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: "data-list-minta-barang-admin",
    queryFn: fetchData,
    refetchOnWindowFocus: false,
    refetchInterval: 1000 * 60 * 5,
  });

  const findRuangKerja = React.useCallback(
    (id: number) => {
      if (!id) return "-";
      return optionsRuangKerja?.find((item) => item.value === id)?.label;
    },
    [optionsRuangKerja]
  );

  const findNamaUser = React.useCallback(
    (id: number) => {
      if (!id) return "-";
      const result = dataListUser?.find((item: any) => item.id === id);
      return result;
    },
    [dataListUser]
  );

  useEffect(() => {
    // sort dataPermintaan by date yang lebih besar

    // jika id_permintaan sama maka gabungkan nama_barang dan jumlah_barang_minta dan stok_barang
    if (dataPermintaan) {
      const newData = dataPermintaan.reduce((acc, curr) => {
        const found = acc.find(
          (item) => item.id_permintaan === curr.id_permintaan
        );
        if (found) {
          found.nama_barang.push(curr.nama_barang);
          found.jumlah_barang_minta.push(curr.jumlah_barang_minta);
        } else {
          acc.push({
            ...curr,
            nama_barang: [curr.nama_barang],
            jumlah_barang_minta: [curr.jumlah_barang_minta],
          });
        }
        return acc;
      }, []);
      // refetch(newData);
      setMergedData(newData);
    }
  }, [dataPermintaan, refetch]);

  const { data: dataBarang } = useGetListBarang();

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
        cell: ({ row }) => (
          <span>
            <span className="whitespace-nowrap">
              {formatDate(row.original.tgl_permintaan)}
            </span>
            <br />
            {row.original.waktu_permintaan}
          </span>
        ),
        footer: (props) => props.column.id,
        enableColumnFilter: false,
      },
      {
        accessorFn: (row) => row.id_ruang_kerja,
        id: "id_ruang_kerja",
        header: () => (
          <span className="min-w-[90px]">
            Nama <br /> Ruang Kerja
          </span>
        ),
        cell: (info) => <span>{findRuangKerja(info.getValue()) || "-"}</span>,
        enableColumnFilter: false,
      },
      {
        accessorFn: (row) => row.nama_user,
        id: "nama_user",
        header: () => (
          <span>
            Nama <br /> Pegawai
          </span>
        ),
        cell: (info) => <span>{info.getValue()}</span>,
        footer: (props) => props.column.id,
      },
      {
        // filterFn: (row, filterValue) => {
        //   return row.original.nama_barang.includes(filterValue);
        // },
        accessorKey: "nama_barang",
        id: "nama_barang",
        header: () => <span className="whitespace-nowrap">Nam Barang</span>,
        cell: ({ row }) => {
          return typeof row.original?.nama_barang === "object" ? (
            row.original?.nama_barang.map((item) => (
              <p className="whitespace-nowrap">{item}</p>
            ))
          ) : (
            <p className="whitespace-nowrap">{row.original?.nama_barang}</p>
          );
        },
        footer: (props) => props.column.id,
        enableColumnFilter: false,
      },
      {
        accessorFn: (row) => row.jumlah_barang_minta,
        id: "jumlah_barang_minta",
        header: () => <span className="whitespace-nowrap">Jumlah</span>,
        cell: ({ row }) => {
          return typeof row.original?.jumlah_barang_minta === "object" ? (
            row.original?.jumlah_barang_minta.map((item) => (
              <p>{formatNumber(item)}</p>
            ))
          ) : (
            <p>{formatNumber(row.original?.jumlah_barang_minta)}</p>
          );
        },
        footer: (props) => props.column.id,
        enableColumnFilter: false,
      },
      {
        accessorFn: (row) => row.id_satuan,
        id: "id_satuan",
        header: () => <span className="whitespace-nowrap">Satuan</span>,
        cell: ({ row }) => {
          return typeof row.original?.nama_barang === "object" ? (
            row.original?.nama_barang.map((item) => (
              <p className="whitespace-nowrap">
                {dataBarang?.find((i) => i.nama_barang === item)?.nama_satuan}
              </p>
            ))
          ) : (
            <p className="whitespace-nowrap">
              {dataBarang?.find(
                (i) => i.nama_barang === row.original?.nama_barang
              )}
            </p>
          );
        },
        footer: (props) => props.column.id,
        enableColumnFilter: false,
      },
      {
        accessorFn: (row) => row.status_permintaan,
        id: "status_permintaan",
        header: () => <span className="whitespace-nowrap">Status</span>,
        cell: ({ row }) => {
          return (
            <>
              <div className="flex justify-center items-center gap-2">
                <span
                  className={`text-sm px-4 py-2 rounded-full w-full text-center capitalize ${
                    row.original?.status_permintaan === "pending"
                      ? "bg-yellow-200 border border-orange-700 text-orange-700"
                      : row.original?.status_permintaan === "approved"
                      ? "bg-blue-200 border border-blue-700 text-blue-700"
                      : "bg-green-200 border border-green-700 text-green-700"
                  }`}
                >
                  {row.original?.status_permintaan}
                </span>
              </div>
            </>
          );
        },
        footer: (props) => props.column.id,
        enableColumnFilter: true,
        meta: {
          filterVariant: "select",
        },
      },
      {
        accessorFn: (row) => row.disetujui_oleh,
        id: "disetujui_oleh",
        header: () => <span className="whitespace-nowrap">Disetujui Oleh</span>,
        cell: ({ row }) => {
          return (
            <>
              <div className="flex justify-center items-center gap-2">
                {findNamaUser(row.original?.disetujui_oleh)?.fullname}
              </div>
            </>
          );
        },
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
      {
        id: "aksi",
        accessorKey: "aksi",
        header: "Aksi",
        footer: (props) => props.column.id,
        enableColumnFilter: false,
        cell: ({ row }) => {
          return (
            <div className="flex justify-center items-center gap-2">
              <DropdownAksiMintaBarangAdmin
                data={dataPermintaan?.filter(
                  (item) => item.id_permintaan === row.original.id_permintaan
                )}
                refetch={() => {
                  refetch();
                  window.location.reload();
                }}
                dataBarang={dataBarang}
                listUser={dataListUser}
              />

              <ModalKonfirmasiDelete
                data={dataPermintaan?.filter(
                  (item) => item.id_permintaan === row.original.id_permintaan
                )}
                refetch={() => refetch()}
                isAdmin
              />
            </div>
          );
        },
      },
    ],
    [
      dataPermintaan,
      dataBarang,
      dataListUser,
      findNamaUser,
      findRuangKerja,
      refetch,
    ]
  );

  if (isLoading && isLoadingRuangKerja) {
    return <LoadingFile open={true} />;
  }

  document.title = "Daftar Permintaan Barang" + BASE_TITLE;

  return (
    <section className="base-card">
      <h1 className="text-3xl font-bold">Permintaan Barang</h1>
      <section className="base-card mt-3">
        <div className="flex justify-between items-center">
          <TypoParagraph className="text-xl">
            Data Permintaan Barang
          </TypoParagraph>
        </div>
        <div className="flex flex-col md:flex-row justify-start md:justify-between md:items-end gap-3 mt-3 border rounded p-3">
          <FormFilterBarangMasuk
            date={date}
            setDate={setDate}
            title="Permintaan Barang"
            selectedNamaRuang={selectedNamaRuang}
            setSelectedNamaRuang={setSelectedNamaRuang}
            optionsRuangKerja={optionsRuangKerja}
            optionsStatus={optionsStatus}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
          />
          <Button onClick={() => refetch()}>Filter</Button>
        </div>
        <BaseTable data={mergedData} columns={columns} />
      </section>
    </section>
  );
};

export default DataBarangPage;
