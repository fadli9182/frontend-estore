import Lottie from "lottie-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import animation from "@/assets/animation-loading.json";

type Props = {
  open: boolean;
};

const LoadingFile = (props: Props) => {
  return (
    <Dialog open={props.open}>
      <DialogContent className="sm:max-w-[225px] focus:outline-none">
        <Lottie animationData={animation} loop={true} />
      </DialogContent>
    </Dialog>
  );
};

export default LoadingFile;
