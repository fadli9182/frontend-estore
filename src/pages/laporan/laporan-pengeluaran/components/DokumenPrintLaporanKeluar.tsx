import TypoH1 from "@/components/typhography/TypoH1";
import { formatDate, formatNumber } from "@/utils/utils";
import { forwardRef } from "react";

type DokumenPrintLaporanKeluarProps = {
  data: any;
  ref: any;
  excelRef: any;
  findNamaUser: any;
  dataSatuan: any;
};

const DokumenPrintLaporanKeluar = forwardRef(
  (props: DokumenPrintLaporanKeluarProps, ref: any) => {
    const { data, excelRef, findNamaUser, dataSatuan } = props;

    return (
      <div className="m-12 space-y-8 text-black" ref={ref}>
        <TypoH1 className="text-center text-3xl">Laporan Barang Keluar</TypoH1>
        <table className="base-table border-2 text-xs" ref={excelRef}>
          <thead>
            <tr>
              <th>No</th>
              <th>ID Transaksi</th>
              <th>Tanggal Permintaan</th>
              <th className="min-w-[80px]">Nama Pegawai</th>
              <th className="min-w-[80px]">Nama Ruang Kerja</th>
              <th>Nama Barang</th>
              <th>Keterangan</th>
              <th>Jumlah</th>
              <th>Satuan</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item: any, index: number) => (
              <tr key={item.id_trk}>
                <td>{index + 1}</td>
                <td className="whitespace-nowrap">{item.id_permintaan}</td>
                <td>{formatDate(item.tgl_permintaan)}</td>
                <td>{item.nama_user}</td>
                <td>{findNamaUser(item.id_user)?.nama_ruang_kerja}</td>
                <td>{item.nama_barang}</td>
                <td>{item.ket_minta}</td>
                <td>{formatNumber(item.jumlah_barang_minta)}</td>
                <td>
                  {
                    dataSatuan?.find(
                      (element: any) => element.id_satuan === item.id_satuan
                    )?.nama_satuan
                  }
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="border-2">
            <tr>
              <td colSpan={6} className="font-bold">
                Total Barang Keluar
              </td>
              <td colSpan={2} className="text-right">
                {formatNumber(
                  data?.reduce(
                    (acc: number, curr: any) => acc + curr.jumlah_barang_minta,
                    0
                  )
                )}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
);

export default DokumenPrintLaporanKeluar;
