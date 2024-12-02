"use client";

import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";

import {  statuses } from "../data/data";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  enableStatus?: boolean;
  enablePriority?: boolean;
  enableTitle?: boolean;
  enableView?: boolean;
  enableSearch?: boolean;
  DashBoardDataTableTitle?: string;
}

export function DataTableToolbarDashboard<TData>({
  table,
  enableStatus,
  DashBoardDataTableTitle
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between my-3">
        <div className="">
            <h3 className="font-bold capitalize text-2xl">
            {DashBoardDataTableTitle}
            </h3>
        </div>
      <div className="">
        {table.getColumn("status") && enableStatus && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X />
          </Button>
        )}
      </div>
    </div>
  );
}
