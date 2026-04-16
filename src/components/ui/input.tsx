import { cn } from "@/lib/utils";
import { DetailedHTMLProps, LabelHTMLAttributes } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = ({ className, error, ...rest }: InputProps) => {
  return (
    <input
      {...rest}
      className={cn(
        "h-12 w-full rounded-xl border border-white/10 bg-[#0b1220] px-4 text-sm text-[#dce7f2] shadow-[0_12px_30px_rgba(0,0,0,0.22)] outline-none transition focus:border-[#00cfea]",
        error && "border-[#ff6b6b]",
        className
      )}
    />
  );
};
interface InputLabelProps
  extends DetailedHTMLProps<
    LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  > {}
export const InputLabel = ({ className, ...rest }: InputLabelProps) => {
  return (
    <label
      {...rest}
      className={cn("text-sm font-medium text-[#607a93]", className)}
    />
  );
};

export const ErrorMessage = ({ children }: { children?: string }) => {
  if (!children) return null;
  return <span className="ml-1 text-sm text-[#ff6b6b]">{children}</span>;
};
