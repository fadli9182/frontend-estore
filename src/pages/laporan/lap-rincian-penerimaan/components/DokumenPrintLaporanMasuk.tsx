import TypoH1 from "@/components/typhography/TypoH1";
import { formatDate, formatNumber } from "@/utils/utils";
import { forwardRef } from "react";

type DokumenPrintLaporanMasukProps = {
  data: any;
  excelRef: any;
  dataBarang: any;
};

const DokumenPrintLaporanMasuk = forwardRef(
  (props: DokumenPrintLaporanMasukProps, ref: any) => {
    const { data, excelRef, dataBarang } = props;

    return (
      <div className="m-12 space-y-8 text-black" ref={ref}>
        <TypoH1 className="text-center text-3xl">Laporan Barang Masuk</TypoH1>
        <table className="base-table border-2 text-xs" ref={excelRef}>
          <thead>
            <tr>
              <th>No</th>
              <th>ID Transaksi</th>
              <th className="whitespace-nowrap">Tanggal Masuk</th>
              <th>Supplier</th>
              <th>Barang</th>
              <th>Jumlah</th>
              <th>Satuan</th>
              <th>Harga</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: any, index: number) => (
              <tr key={item.id_transaksi}>
                <td>{index + 1}</td>
                <td className="whitespace-nowrap">{item.id_transaksi}</td>
                <td>{formatDate(item.tgl_masuk)}</td>
                <td>{item.nama_supplier}</td>
                <td>{item.nama_barang}</td>
                <td>{formatNumber(item.jumlah_barang_masuk)}</td>
                <td>
                  {
                    dataBarang?.find(
                      (element) => element.nama_barang === item.nama_barang
                    )?.nama_satuan
                  }
                </td>
                <td>{formatNumber(item.total_harga)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="border-2">
            <tr>
              <td colSpan={6} className="font-bold">
                Total Harga
              </td>
              <td>
                {formatNumber(
                  data.reduce(
                    (acc: number, curr: any) => acc + curr.total_harga,
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

export default DokumenPrintLaporanMasuk;
