import React from "react";
import { useModal } from "@/providers/context/context";

import Modal from "react-modal";
import MyBackBtn from "../myUi/myBackBtn";
import { cn } from "@/lib/utils";
Modal.setAppElement("#root");

type ModalComponent = {
  children: React.ReactNode;
  className?: string;
};

export default function TaskModal({ children,className }: ModalComponent) {
  const { isOpen, closeModal } = useModal();

  // if (!selectedTask) return null; // If there's no selected task, don't render the modal

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={true}
      overlayClassName="fixed inset-0 bg-black/10 backdrop-filter  flex items-center justify-center z-[10001] "
      className={cn(`bg-white r rounded-lg  min-w-xl w-[30vw] p-4 h-[80vh]  outline-none  overflow-y-auto relative z-[10001]`,className)}
    >
      <div className="md:hidden block">
        <MyBackBtn
          clickEvent={closeModal}
          iconSize={25}
          className=" absolute top-0 right-0 z-50 "
          tooltipTitle="close"
          placeTooltip="left"
          icon="ei:close"
        />
      </div>
      {children}
    </Modal>
  );
}


type TaskModalHeaderProps = {
  children: React.ReactNode;
  className?: string;
};

export function TaskModalHeader({ children, className }: TaskModalHeaderProps) {
  return (
    <div className={cn("flex items-center justify-between py-2", className)}>
      {children}
    </div>
  );
}

type TaskModalContentProps = {
  children: React.ReactNode;
  className?: string;
};

export function TaskModalContent({ children, className }: TaskModalContentProps) {
  return <div className={cn("flex-grow", className)}>{children}</div>;
}

type TaskModalFooterProps = {
  children: React.ReactNode;
  className?: string;
};

export function TaskModalFooter({ children, className }: TaskModalFooterProps) {
  return (
    <div className={cn("flex justify-end items-center gap-4 pt-4", className)}>
      {children}
    </div>
  );
}