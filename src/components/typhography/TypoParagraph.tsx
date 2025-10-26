import { cn } from "@/lib/utils";

type TypoParagraphProps = {
  children: React.ReactNode;
  className?: string;
};

const TypoParagraph = ({ children, className }: TypoParagraphProps) => {
  return <p className={cn("font-semibold", className)}>{children}</p>;
};

export default TypoParagraph;
