/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { CalendarDateRangePicker } from "../date/CalendarDateRangePicker";
import InputSelect from "../input/InputSelect";

type FormFilterLaporanProps = {
  title: string;
  optionsWilayah?: any;
  selectedWilayah?: any;
  setSelectedWilayah?: any;
  selectedJenis?: any;
  setSelectedJenis?: any;
  date?: any;
  setDate?: any;
};

const FormFilterLaporan = ({
  title,
  optionsWilayah,
  selectedWilayah,
  setSelectedWilayah,
  selectedJenis,
  setSelectedJenis,
}: //   date,
//   setDate,
FormFilterLaporanProps) => {
  const [date, setDate] = React.useState<any>([
    new Date(new Date().setDate(new Date().getDate() - 1)),
    new Date(),
  ]);

  const optionsJenisKendaraan = [
    { value: "", label: "Semua" },
    { value: "R2", label: "Roda 2" },
    { value: "R4", label: "Roda 4" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-end">
      <div className="flex flex-col gap-2">
        <div className="whitespace-nowrap w-52 font-bold">Periode {title}</div>
        <div className="w-full">
          <CalendarDateRangePicker
            className={"w-full"}
            date={date}
            setDate={setDate}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="whitespace-nowrap w-52 font-bold">Supplier</div>
        <div className="w-full">
          <InputSelect
            options={optionsWilayah}
            placeholder={"Pilih Supplier"}
            value={selectedWilayah}
            onChange={setSelectedWilayah}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="whitespace-nowrap w-52 font-bold">Nama Barang</div>
        <div className="w-full">
          <InputSelect
            options={optionsJenisKendaraan}
            placeholder={"Pilih Nama Barang"}
            value={selectedJenis}
            onChange={setSelectedJenis}
          />
        </div>
      </div>
    </div>
  );
};

export default FormFilterLaporan;
