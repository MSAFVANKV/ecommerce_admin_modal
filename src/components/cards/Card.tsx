import React from "react";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

export type CardProps = {
  id?: number;
  icon?: any;
  amount?: string | number; // Update to accept both string and number
  label?: string;
  description?: string;
  className?: string;
  bgcolor?: string;
};

export default function Card({
  id,
  icon,
  amount,
  label,
  className,
  bgcolor,
}: CardProps) {
  return (
    <CardContent className={className} key={id}>
      <section className="w-full flex gap-3 items-center justify-between ">
        <div className="">
          <p className="text-sm text-textGray ">{label}</p>
          <h5 className="text-2xl font-bold">{amount}</h5>
        </div>
        <div
          className={` w-fit p-3 rounded-lg flex justify-center items-center text-white`}
          style={{ backgroundColor: `${bgcolor}` }}
        >
          <Icon icon={icon} fontSize={30} />
        </div>
      </section>
    </CardContent>
  );
}

export function CardContent(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn(
        "flex  w-full flex-col rounded-xl bg-white border md:p-5 sm:p-4 p-3 shadow ",
        props.className
      )}
    />
  );
}
