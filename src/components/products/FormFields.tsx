import { cn } from "@/lib/utils";

type FormFieldProps = {
    children: React.ReactNode;
    className?: string;
  };
  
  export function FormFields({ children, className }: FormFieldProps) {
    return <div className={cn("flex justify-between", className)}>{children}</div>;
  }