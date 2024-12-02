"use client"

import { ColumnDef } from "@tanstack/react-table"

import {  priorities, statuses } from "../data/data"
import { Task } from "../data/schema"
import { DataTableColumnHeader } from "../task_components/data-table-column-header"
import { DataTableRowActionsDashboard } from "../table_actions/data-table-action-dashboard"

export const columns: ColumnDef<Task>[] = [
 
  {
    accessorKey: "orderId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order Id" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("orderId")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => <span>{row.getValue("date")}</span>,
  },

  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => {
      const amount = priorities.find(
        (amount) => amount.value === row.getValue("amount")
      )

      if (!amount) {
        return null
      }

      return (
        <div className="flex items-center">
          {amount.icon && (
            <amount.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{amount.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
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
      )

      if (!status) {
        return null
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActionsDashboard  type="offline_dash_modal" row={row}/> ,
  },
]
