import { useModal } from "@/providers/context/context";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Icon } from "@iconify/react/dist/iconify.js";
import PdfFile from "@/components/myUi/PdfFile";
import TaskModal from "./TaskModal";
import AyButton from "../myUi/AyButton";



export default function OfflineDashModal() {
  const { selectedTask } = useModal(); // Get the modal context

  return (
    <TaskModal className="h-[75vh]">
      <form className="h-full flex flex-col">
        {/* Content Area */}
        <div className="flex flex-1">
          <div className="flex-1">
            {/* Order Details */}
            <div className="flex items-center gap-2">
              <h3>Order Id:</h3>
              <span>{selectedTask?.orderId || "N/A"}</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <p className="text-sm">Date:</p>
              <span>{selectedTask?.date || "N/A"}</span>
            </div>
            <div className="flex items-center gap-2 mt-5">
              <p className="text-sm">Transaction ID:</p>
              <span>{selectedTask?.transactionId || "N/A"}</span>
            </div>
            <div className="flex items-center gap-2 mt-5">
              <p className="text-sm">Customer name:</p>
              <span>{selectedTask?.customerName || "N/A"}</span>
            </div>
            <div className="flex items-center gap-2 mt-5">
              <p className="text-sm">Amount:</p>
              <span>{selectedTask?.amount || "N/A"}</span>
            </div>
            <div className="flex items-center gap-2 mt-5">
              <p className="text-sm">Payment method:</p>
              <span>{selectedTask?.paymentMethod || "N/A"}</span>
            </div>
            {/* Referral Document */}
            <div className="flex flex-col gap-2 mt-5">
              <p className="text-sm">Referral document:</p>
              <div className="md:w-3/4 w-full flex items-start">
                <a
                  href={"/Invoice_INV1482989614215502 (16).pdf"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative"
                >
                  <PdfFile
                    fileURL={"/Invoice_INV1482989614215502 (16).pdf"}
                    className="h-16 w-12"
                  />
                  <div className="absolute h-16 w-12 bg-black/50 top-0 rounded-md flex items-center justify-center">
                    <Icon icon="solar:eye-bold" fontSize={25} color="#fff" />
                  </div>
                </a>
              </div>
            </div>
            {/* Comment Section */}
            <div className="flex flex-col gap-2 mt-5">
              <p className="text-sm">Comment:</p>
              <span>
                Lorem ipsum dolor sit amet consectetur. Enim arcu justo
                habitasse dui nunc quis. Lorem ipsum dolor sit amet
                consectetur. Enim arcu justo habitasse dui nunc quis. Lorem
                ipsum dolor sit amet consectetur. Enim arcu justo habitasse dui
                nunc quis.
              </span>
            </div>
          </div>
          {/* Status Dropdown */}
          <div className="flex-shrink-0">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent className="z-[10002]">
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        {/* Footer */}
        <div className="flex justify-end items-center gap-4 pt-4 border-t border-gray-200">
          <AyButton title="Cancel" outLineColor="gray" variant="outlined" />
          <AyButton title="Save" />
        </div>
      </form>
    </TaskModal>
  );
}
