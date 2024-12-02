import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
};

export default function ProductLayout({ children }: Props) {
  return (
    <div className="bg-white min-h-screen rounded-lg">
     {children}
    </div>
  );
}

type TaskModalHeaderProps = {
  children: React.ReactNode;
  className?: string;
};

export function ProductHeader({ children, className }: TaskModalHeaderProps) {
  return (
    <div className={cn("flex items-center justify-between py-2", className)}>
      {children}
    </div>
  );
}

type TaskModalContentProps = {
  children: React.ReactNode;
  className?: string;
};

export function ProductContent({ children, className }: TaskModalContentProps) {
  return <div className={cn("flex-grow", className)}>{children}</div>;
}

type TaskModalFooterProps = {
  children: React.ReactNode;
  className?: string;
};

export function ProductFooter({ children, className }: TaskModalFooterProps) {
  return (
    <div
      className={cn(
        "flex justify-end items-center mt-auto h-full gap-4 pt-4",
        className
      )}
    >
      {children}
    </div>
  );
}
