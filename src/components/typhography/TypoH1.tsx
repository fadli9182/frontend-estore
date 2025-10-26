import { cn } from "@/lib/utils";

type TypoH1Props = {
  children: React.ReactNode;
  className?: string;
};

const TypoH1 = ({ children, className }: TypoH1Props) => {
  return (
    <h1 className={cn("text-xl md:text-2xl xl:text-3xl font-bold", className)}>
      {children}
    </h1>
  );
};

export default TypoH1;
