import { useEffect, useState } from "react";
import DashSec01 from "./Dash_Sec_01";
import DashSec02 from "./Dash_Sec_02";
import { taskSchema } from "@/components/tasks/data/schema";
import { z } from "zod";
import { kycColumn } from "@/components/tasks/table_columns/kyc_column";
import { columns } from "@/components/tasks/table_columns/dashboard-columns";
import { TopStoresColumn } from "@/components/tasks/table_columns/top-stores-column";
import { TopProductsColumn } from "@/components/tasks/table_columns/top-products-column";
import { TopSellerColumn } from "@/components/tasks/table_columns/top-seller-column";

type Props = {};

export default function DashboardPage({}: Props) {
  const [tasks, setTasks] = useState<z.infer<typeof taskSchema>[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await fetch("/src/components/tasks/data/tasks.json"); // Replace with the appropriate API route
        const data = await response.json();
        const validTasks = z.array(taskSchema).parse(data);
        setTasks(validTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTasks();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="w-full flex flex-col gap-6">
      <DashSec01 />

      {/* tables starts =====
        ============== */}
      <DashSec02 titleOne="Offline Payment " titleTwo="KYC verification "
      data={tasks}
      columns={columns}
      columnsTwo={kycColumn}
      />
      <DashSec02 titleOne="Top Products " titleTwo="Top Stores"
      data={tasks}
      columns={TopProductsColumn}
      columnsTwo={TopStoresColumn}
      />

      <DashSec02 titleOne="Top Seller" tableTwo={false} 
      columns={TopSellerColumn}
      columnsTwo={TopSellerColumn}
      data={tasks}
      />
    </div>
  );
}
