"use client";

import { Row } from "@tanstack/react-table";
import { Eye } from "lucide-react";

import { Button } from "@/components/ui/button";

import { taskSchema } from "../data/schema";
import { useModal } from "@/providers/context/context";
import KycDashModal from "@/components/modals/kyc_dash_modal";
import OfflineDashModal from "@/components/modals/offline_dash_modal";
import { useCallback } from "react";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  type?: IModalTypes;
}

export type IModalTypes =
  | "offline_dash_modal"
  | "kyc_dash_modal"
  | "top_stores_dash_modal"
  | "top_products_dash_modal"
  | "top_seller_dash_modal"
  | "";

export function DataTableRowActionsDashboard<TData>({
  row,
  type,
}: DataTableRowActionsProps<TData>) {
  const { openModal, selectedTask, modalTypeDashboard } = useModal(); // Get the modal context
  const task = taskSchema.parse(row.original);

  const handleOpenModal = () => {
    if (!task) return; // Ensure task is valid
    openModal(task, type || ""); // This should set `selectedTask` in the context
  };

  const memoizedRenderModalContent = useCallback(() => {
    // console.log(type);
    
    if (!selectedTask) return null;
  
    switch (modalTypeDashboard) {
      case "offline_dash_modal":
        return <OfflineDashModal />;
      case "kyc_dash_modal":
        return <KycDashModal />;
      // case "top_stores_dash_modal":
      //   return <TopStoresDashModal />;
      // case "top_products_dash_modal":
      //   return <TopProductsDashModal />;
      // case "top_seller_dash_modal":
      //   return <TopSellerDashModal />;
      default:
        return null;
    }
  }, [modalTypeDashboard, selectedTask]);
  

  return (
    <>
      <Button
        variant="ghost"
        className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        onClick={handleOpenModal}
      >
        <Eye color="#D19DFF" />
        <span className="sr-only">Open menu</span>
      </Button>
      {/* modal starts ==== 
      ================= */}

      {memoizedRenderModalContent()}
    </>
  );
}
