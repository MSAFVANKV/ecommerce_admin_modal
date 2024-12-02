import { Icon } from "@iconify/react";
import { CardContent } from "./Card";

export type StatusCardProps = {
  id: number;
  icon: any;
  count?: number;
  label: string;
  discription?: string;
  className?: string;
  bgcolor: string;
  iColor: string

};

export default function OrderStatusCard({
  icon,
  count,
  label,
  bgcolor,
  iColor
}: StatusCardProps) {
  return (
    <CardContent className={`bg-bgGraySoft shadow-none`} style={{ }}>
      <section className="w-full flex  items-center justify-start gap-4 ">
        <div className=" w-fit p-3 rounded-lg flex justify-center items-center text-white" style={{ backgroundColor: `${bgcolor}` }}>
          <Icon icon={icon} fontSize={30} color={`${iColor}`}/>
        </div>
        <div className="">
          <p className=" text-textGray text-sm ">{label}</p>
          <h5 className="text-2xl font-bold">{count}</h5>
        </div>
      </section>
    </CardContent>
  );
}
