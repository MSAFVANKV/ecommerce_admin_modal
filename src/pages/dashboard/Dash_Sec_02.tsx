import { DataTableDashboard } from "@/components/tasks/task_components/data-table-dashboard";
import { useWindowWidth } from "@react-hook/window-size";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ColumnDef } from "@tanstack/react-table";

interface Props<TData, TValue> {
  className?: string;
  titleOne?: string;
  titleTwo?: string;
  tableOne?: boolean;
  tableTwo?: boolean;
  columns: ColumnDef<TData, TValue>[];
  columnsTwo: ColumnDef<TData, TValue>[];

  data: TData[];
}

export default function DashSec02<TData, TValue>({
  titleOne,
  titleTwo,
  tableTwo = true,
  columns,
  columnsTwo,
  data,
}: Props<TData, TValue>) {
  const onlyWidth = useWindowWidth();

  const deskTopWidth = onlyWidth > 1024; // Determines if it's desktop width or smaller

  return (
    <div className="w-full lg:h-fit h-screen">
      <ResizablePanelGroup
        direction={deskTopWidth ? "horizontal" : "vertical"} // Stack vertically on smaller screens
        className="flex justify-between gap-4 w-full overflow-hidden h-full"
      >
        {/* First Panel (Offline Payment) */}
        <ResizablePanel
          defaultSize={40}
          minSize={30}
          maxSize={70}
          className="flex flex-col h-full" // Ensures this panel takes full height
        >
          <div className="w-full h-full bg-white p-4 rounded-xl overflow-auto">
            <DataTableDashboard
              data={data}
              columns={columns}
              DashBoardDataTableTitle={titleOne}
              enableStatus
            />
          </div>
        </ResizablePanel>
        {tableTwo && (
          <>
            <ResizableHandle withHandle />
            {/* Second Panel (KYC verification) */}
            <ResizablePanel
              className="flex flex-col h-full" // Ensures this panel takes full height
            >
              <div className="w-full h-full bg-white p-4 rounded-xl overflow-auto">
                <DataTableDashboard
                  data={data}
                  columns={columnsTwo}
                  DashBoardDataTableTitle={titleTwo}
                  enableStatus
                />
              </div>
            </ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>
    </div>
  );
}
