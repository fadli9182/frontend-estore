/* eslint-disable @typescript-eslint/no-explicit-any */
import { CalendarDateRangePicker } from "@/components/features/date/CalendarDateRangePicker";
import InputSelect from "@/components/features/input/InputSelect";

type FormFilterBarangMasukProps = {
  title: string;
  optionsRuangKerja?: any;
  optionsStatus?: any;
  selectedStatus?: any;
  setSelectedStatus?: any;
  selectedNamaRuang?: any;
  setSelectedNamaRuang?: any;
  date?: any;
  setDate?: any;
};

const FormFilterBarangMasuk = ({
  title,
  optionsRuangKerja,
  optionsStatus,
  selectedStatus,
  setSelectedStatus,
  selectedNamaRuang,
  setSelectedNamaRuang,
  date,
  setDate,
}: FormFilterBarangMasukProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
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
            label=""
            options={optionsRuangKerja}
            placeholder={"Pilih Nama Ruang"}
            value={selectedNamaRuang}
            onChange={setSelectedNamaRuang}
          />
        </div>
      </div>
      {/* <div className="flex flex-col gap-2">
        <div className="whitespace-nowrap w-52 font-bold">Status</div>
        <div className="w-full">
          <InputSelect
            label=""
            options={optionsStatus}
            placeholder={"Pilih Status"}
            value={selectedStatus}
            onChange={setSelectedStatus}
          />
        </div>
      </div> */}
    </div>
  );
};

export default FormFilterBarangMasuk;
