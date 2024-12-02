import { ColumnDef } from "@tanstack/react-table";
import { Task } from "../data/schema";

export const TopProductsColumn: ColumnDef<Task>[] = [
  {
    accessorKey: "title",
    header: "Product Name",
    cell: ({ row }) => <span>{row.getValue("title")}</span>,
  },
  {
    accessorKey: "email",
    header: "Sales Qty",
    cell: ({ row }) => <span>{row.getValue("email")}</span>,
  },
 
  // {
  //   id: "actions",
  //   cell: ({ row }) => <DataTableRowActionsDashboard row={row} isTopProductsTable={true}/>,
  // },
];
