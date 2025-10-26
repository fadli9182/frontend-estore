/* eslint-disable @typescript-eslint/no-explicit-any */
import { CalendarDateRangePicker } from "@/components/features/date/CalendarDateRangePicker";
import InputSelect from "@/components/features/input/InputSelect";
import { useGetRuangKerja } from "@/hooks/useGetRuangKerja";
import { useEffect } from "react";

type FormFilterLaporanPengeluaranProps = {
  title: string;
  selectedNamaRuang?: any;
  setSelectedNamaRuang?: any;
  selectedBarang?: any;
  setSelectedBarang?: any;
  date?: any;
  setDate?: any;
};

const FormFilterLaporanPengeluaran = ({
  title,
  selectedNamaRuang,
  setSelectedNamaRuang,
  date,
  setDate,
}: FormFilterLaporanPengeluaranProps) => {
  const { dataList: optionsNamaRuang } = useGetRuangKerja();

  useEffect(() => {
    optionsNamaRuang?.unshift({
      value: "",
      label: "Semua",
    });
  }, [optionsNamaRuang]);

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
        <div className="whitespace-nowrap w-52 font-bold">Nama Ruang</div>
        <div className="w-full">
          <InputSelect
            options={optionsNamaRuang}
            placeholder={"Pilih Nama Ruang"}
            value={selectedNamaRuang}
            onChange={setSelectedNamaRuang}
          />
        </div>
      </div>
    </div>
  );
};

export default FormFilterLaporanPengeluaran;
