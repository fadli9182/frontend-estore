/* eslint-disable @typescript-eslint/no-explicit-any */
import { CalendarDateRangePicker } from "@/components/features/date/CalendarDateRangePicker";
import InputSelect from "@/components/features/input/InputSelect";
import { useGetSupplier } from "@/hooks/useGetSupplier";
import { useEffect } from "react";

type FormFilterLaporanProps = {
  title: string;
  selectedSupplier?: any;
  setSelectedSupplier?: any;
  date?: any;
  setDate?: any;
};

const FormFilterLaporanPenerimaan = ({
  title,
  selectedSupplier,
  setSelectedSupplier,
  date,
  setDate,
}: FormFilterLaporanProps) => {
  const { dataList: optionsSupplier } = useGetSupplier();

  useEffect(() => {
    optionsSupplier?.unshift({
      value: "",
      label: "Semua",
    });
  }, [optionsSupplier]);

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
            options={optionsSupplier}
            placeholder={"Pilih Supplier"}
            value={selectedSupplier}
            onChange={setSelectedSupplier}
          />
        </div>
      </div>
    </div>
  );
};

export default FormFilterLaporanPenerimaan;
