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

type Props = {}

export default function TopSellerDashModal({}: Props) {
  const { selectedTask  } = useModal(); // Get the modal context

  return (
    <TaskModal className="h-[70vh]">
    <form className="">
       <div className="flex">
         <div className="flex-1">
           {/*  */}
           <div className="flex items-center gap-2">
             <h3>Order Id:</h3>
             <span>{selectedTask.orderId}</span>
           </div>
           {/*  */}
           <div className="flex items-center gap-2">
             <p className="text-sm">Date:</p>
             <span>{selectedTask.date}</span>
           </div>
           {/*  */}
           <div className="flex items-center gap-2 mt-5">
             <p className="text-sm">Transaction ID :</p>
             <span></span>
           </div>
           {/*  */}
           <div className="flex items-center gap-2 mt-5">
             <p className="text-sm">Customer name :</p>
             <span></span>
           </div>
           {/*  */}
           <div className="flex items-center gap-2 mt-5">
             <p className="text-sm">Amount :</p>
             <span></span>
           </div>
           {/*  */}
           <div className="flex items-center gap-2 mt-5">
             <p className="text-sm">Payment method :</p>
             <span></span>
           </div>
           {/*  */}
           <div className="flex flex-col gap-2 mt-5">
             <p className="text-sm">Referral document :</p>
               {/* ===== pdf docs ======= */}
           <div className="md:w-3/4 w-full flex items-start ">
             <a
               href={"/Invoice_INV1482989614215502 (16).pdf"}
               target="_blank"
               rel="noopener noreferrer"
               className="relative"
             >
               {/* <p>Uploaded File: {uploadedFile.name}</p> */}
   
               <PdfFile
                 fileURL={"/Invoice_INV1482989614215502 (16).pdf"}
                 className="h-16 w-12"
               />
               <div className="absolute h-16 w-12 bg-black/50 top-0 rounded-md flex items-center justify-center ">
                 <Icon icon="solar:eye-bold" fontSize={25} color="#fff" />
               </div>
             </a>
           </div>
           </div>
           {/* =====  ends details ==== */}
        
         </div>
         <div className="flex-shrink-0">
           <Select>
             <SelectTrigger className="w-[180px] ">
               <SelectValue placeholder="Select a status" />
             </SelectTrigger>
             <SelectContent className="z-[10002]">
               <SelectGroup>
                 <SelectLabel>Status</SelectLabel>
                 <SelectItem value="pending">pending</SelectItem>
                 <SelectItem value="shipped">shipped</SelectItem>
                 <SelectItem value="delivered">delivered</SelectItem>
               </SelectGroup>
             </SelectContent>
           </Select>
         </div>
       </div>
     </form>
       </TaskModal>
  )
}