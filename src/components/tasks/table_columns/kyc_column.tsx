import { ColumnDef } from "@tanstack/react-table";

import {  statuses } from "../data/data";
import { Task } from "../data/schema";
import { DataTableColumnHeader } from "../task_components/data-table-column-header";
import { DataTableRowActionsDashboard } from "../table_actions/data-table-action-dashboard";

export const kycColumn: ColumnDef<Task>[] = [
  {
    accessorKey: "businessName",
    header: "Business Name",
    cell: ({ row }) => <span>{row.getValue("businessName")}</span>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <span>{row.getValue("email")}</span>,
  },
  {
    accessorKey: "mobile",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mobile" />
    ),
    cell: ({ row }) => <span>{row.getValue("mobile")}</span>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      );
      if (!status) {
        return null;
      }
      return (
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActionsDashboard row={row} type="kyc_dash_modal"/>,
  },
];
