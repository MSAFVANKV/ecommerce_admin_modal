import { ColumnDef } from "@tanstack/react-table";

import { Task } from "../data/schema";

export const TopSellerColumn: ColumnDef<Task>[] = [
  {
    accessorKey: "title",
    header: "Seller Name",
    cell: ({ row }) => <span>{row.getValue("title")}</span>,
  },
  {
    accessorKey: "email",
    header: "Sales quantity",
    cell: ({ row }) => <span>{row.getValue("email")}</span>,
  },
 
  // {
  //   id: "actions",
  //   cell: ({ row }) => <DataTableRowActionsDashboard row={row} isTopSellerTable={true}/>,
  // },
];
