import { formatDate } from "@/utils/utils";
import { forwardRef } from "react";

const DokumenPrintMintaBarang = forwardRef(
  ({ data, dataBarang, listUser }: any, ref: any) => {
    function findNamaUser(id: number) {
      const result = listUser?.find((item: any) => item.id === id);
      return result;
    }

    return (
      <section ref={ref} className="dokumen-print m-8 !text-black space-y-8 ">
        {/* <img src="/binamarga/KopSurat.png" alt="Kop Surat" /> */}
        <h2 className="text-center text-[14px] uppercase font-bold">
          Tanda Terima Barang
        </h2>
        <p className="text-[11px] font-light">
          Pada tanggal {formatDate(new Date())}, telah diterima barang sebagai
          berikut:
        </p>
        <section>
          <table className="base-table border-2 text-xs">
            <thead className="border-2">
              <tr className="text-[11px]">
                <th>No</th>
                <th>Nama Barang</th>
                <th>Jumlah Barang</th>
                <th>Satuan</th>
                <th>Nama Pegawai</th>
                <th>Ruang Kerja</th>
                <th>Tanggal Permintaan</th>
                <th>Keterangan</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item: any, index: number) => (
                <tr key={index} className="text-center text-[11px]">
                  <td>{index + 1}</td>
                  <td className="text-left">{item.nama_barang}</td>
                  <td>{item.jumlah_barang_minta}</td>
                  <td>
                    {
                      dataBarang?.find(
                        (element: any) =>
                          element.nama_barang === item.nama_barang
                      )?.nama_satuan
                    }
                  </td>
                  <td>{item.nama_user}</td>
                  <td>{findNamaUser(item.id_user)?.nama_ruang_kerja}</td>
                  <td>{formatDate(item.tgl_permintaan)}</td>
                  <td>{item.ket_minta || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <p className="text-[11px] font-light">
          Berikut adalah tanda penerimaan barang yang akan ditandatangani oleh:{" "}
        </p>
        <section className="mx-12">
          <section className="flex flex-row justify-between font-light">
            <div className="flex flex-col text-center">
              <br />
              <p className="text-[11px] font-light">Yang Menerima,</p>
              <br />
              <br />
              <br />
              <br />
              <p className="text-[11px] font-light">
                {findNamaUser(data[0]?.id_user)?.fullname}
              </p>
            </div>
            <div className="flex flex-col text-center">
              <p className="text-[11px] font-normal">
                Jakarta, {formatDate(new Date())}
              </p>
              <p className="text-[11px] font-light">Yang Memberi,</p>
              <br />
              <br />
              <br />
              <br />
              <p className="text-[11px] font-light">
                {findNamaUser(data[0]?.disetujui_oleh)?.fullname}
              </p>
            </div>
          </section>
        </section>
      </section>
    );
  }
);

export default DokumenPrintMintaBarang;
