import { Button } from "@/components/ui/button";
import { Dialog } from "primereact/dialog";

const ModalKonfirmasiAktifUtilitas = (props) => {
  return (
    <>
      <Dialog
        closable={false}
        visible={props.visible}
        onHide={props.setVisible}
        headerClassName="pb-0"
      >
        <h1
          className={
            (props.status === "aktif" ? "text-red-700" : "text-blue-700") +
            " text-xl font-semibold mb-5"
          }
        >
          Konfirmasi {props.status === "aktif" ? "Non-Aktif" : "Aktif"} Pengguna
        </h1>
        <p>
          Apakah Anda yakin untuk{" "}
          <b>
            {props.status === "aktif" ? "non-aktif" : "aktif"}kan Pengguna ini
          </b>
          ?
        </p>
        <div className="flex justify-end gap-5 mt-5">
          <Button
            className="text-blue-700 bg-background border-blue-700 rounded-md"
            onClick={() => props.setVisible(false)}
          >
            Batal
          </Button>
          <Button
            className={
              (props.status === "aktif" ? "bg-red-600" : "bg-blue-700") +
              " text-white"
            }
          >
            Ya, Saya yakin
          </Button>
        </div>
      </Dialog>
    </>
  );
};

export default ModalKonfirmasiAktifUtilitas;
