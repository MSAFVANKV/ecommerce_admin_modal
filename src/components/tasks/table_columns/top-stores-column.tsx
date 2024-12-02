import { ColumnDef } from "@tanstack/react-table";

import { Task } from "../data/schema";

export const TopStoresColumn: ColumnDef<Task>[] = [
  {
    accessorKey: "title",
    header: "Product Name",
    cell: ({ row }) => <span>{row.getValue("title")}</span>,
  },
  {
    accessorKey: "amount",
    header: "Orders",
    cell: ({ row }) => <span>{row.getValue("amount")}</span>,
  },
  {
    accessorKey: "amount",
    header: "Total sales(₹)",
    cell: ({ row }) => <span>{row.getValue("amount")}</span>,
  },
 
  // {
  //   id: "actions",
  //   cell: ({ row }) => <DataTableRowActionsDashboard row={row} isTopStoresTable={true}/>,
  // },
];
