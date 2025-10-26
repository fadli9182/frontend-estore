const NullDataView = () => {
  return (
    <div className="w-100 text-center text-black my-5">
      <div className="flex justify-center mb-5">
        <img src="images/icons/IconDompetLaporan.svg" className="text-center" />
      </div>
      <p>
        <b>Tidak ada data yang ditampilkan</b>. Silahkan isi filter di atas dan
        klik tombol <b>Lihat</b> untuk menampilkan data
      </p>
    </div>
  );
};

export default NullDataView;
