import Card from "@/components/cards/Card";
import OrderStatusCard from "@/components/cards/OrderStatusCard";
import { Button } from "@/components/ui/button";

type Props = {};

export type StatusCardProps = {
  id: number;
  icon: any;
  count?: number;
  label: string;
  discription?: string;
  className?: string;
  bgcolor: string;
  iColor: string;
};

export default function HomeSec01({}: Props) {
  const CardData = [
    // {
    //   id: 1,
    //   label: "total revenue",
    //   amount: `0`,
    //   icon: "solar:wallet-outline",
    //   bgcolor: "#DFBBFF",
    // },
    {
      id: 2,
      label: "Total Customers",
      amount: 0,
      icon: "fluent-mdl2:group",
      bgcolor: "#DFBBFF",
    },
    {
      id: 4,
      label: "Total Stores",
      amount: 0,
      icon: "mynaui:store",
      bgcolor: "#DFBBFF",
    },
    {
      id: 5,
      label: "Total Orders",
      amount: 0,
      icon: "material-symbols-light:order-approve-outline",
      bgcolor: "#DFBBFF",
    },
    {
      id: 6,
      label: "Total Products",
      amount: 0,
      icon: "carbon:product",
      bgcolor: "#DFBBFF",
    },
    {
      id: 7,
      label: "Total Brands",
      amount: 0,
      icon: "tdesign:root-list",
      bgcolor: "#DFBBFF",
    },
    {
      id: 8,
      label: "Total Category",
      amount: 0,
      icon: "fluent:apps-20-regular",
      bgcolor: "#DFBBFF",
    },
  ];

  const StatusCardData: StatusCardProps[] = [
    {
      id: 1,
      label: "Pending",
      count: 0,
      icon: "material-symbols-light:pending-actions-rounded",
      bgcolor: "#fff",
      iColor: "#DFBBFF",
    },
    {
      id: 2,
      label: "Processing",
      count: 0,
      icon: "fluent-mdl2:processing",
      bgcolor: "#fff",
      iColor: "#DFBBFF",
    },
    {
      id: 3,
      label: "Cancelled",
      count: 0,
      icon: "mdi:file-cancel",
      bgcolor: "#fff",
      iColor: "#DFBBFF",
    },
    {
      id: 4,
      label: "Shipped",
      count: 0,
      icon: "carbon:delivery-add",
      bgcolor: "#fff",
      iColor: "#DFBBFF",
    },
    {
      id: 5,
      label: "Out for delivery",
      count: 0,
      icon: "carbon:delivery",
      bgcolor: "#fff",
      iColor: "#DFBBFF",
    },
    {
      id: 6,
      label: "Delivered",
      count: 0,
      icon: "iconoir:delivery",
      bgcolor: "#fff",
      iColor: "#DFBBFF",
    },
  ];

  return (
    <div className="flex justify-between gap-6 lg:flex-row flex-col w-full">
      <section className="grid md:grid-cols-2 grid-cols-2 lg:w-[40%] w-full gap-6">
        {/* Admin data count cards */}
        {CardData.map((d, i) => (
          <Card
            key={i}
            id={d.id}
            amount={d.amount}
            icon={d.icon}
            label={d.label}
            className={i === 0 ? "col-span-" : ""}
            bgcolor={d.bgcolor}
          />
        ))}
      </section>

      {/* Order Status================================================= */}
      <div className="lg:w-[60%] w-full ">
        <div className="bg-white lg:p-5 sm:p-4 p-3  rounded-xl">
          <div className="flex justify-between items-center  pb-10">
            <p className="text-xl capitalize font-semibold">Order Status</p>
            <Button variant="secondary">All orders</Button>
          </div>
          {/* Order Status================================================= */}
          <section className="grid md:grid-cols-3 grid-cols-2 w-full gap-6">
            {StatusCardData.map((d, i) => (
              <OrderStatusCard
                key={i}
                id={d.id}
                count={d.count}
                icon={d.icon}
                label={d.label}
                bgcolor={d.bgcolor}
                iColor={d.iColor}
              />
            ))}
          </section>
        </div>
      </div>

      {/* Order Status */}
    </div>
  );
}
