
import TaskModal, { TaskModalContent, TaskModalFooter, TaskModalHeader } from "./TaskModal";
import AyButton from "../myUi/AyButton";// Import shadcn UI components
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import PdfFile from "../myUi/PdfFile";
import { Icon } from "@iconify/react/dist/iconify.js";

type Props = {}

export default function KycDashModal({}: Props) {
  // const { selectedTask } = useModal(); // Get the modal context

  return (
    <TaskModal className="h-[85vh] lg:w-[40vw] sm:w-[70vw] w-full flex flex-col">
      <TaskModalHeader>
        <h2 className="text-lg font-semibold">KYC Details</h2>
      </TaskModalHeader>

      <TaskModalContent>
        {/* KYC Form */}
        <form className="flex flex-col gap-4">
          {/* Business Name */}
          <div className="flex justify-between md:flex-row flex-col gap-2 items-center">
            <Label className="text-textGray mb-2 block text-sm font-medium">Business Name</Label>
            <Input className="md:w-[70%] w-full rounded-lg" placeholder="Enter Business Name" />
          </div>

          {/* GST Number */}
          <div className="flex justify-between md:flex-row flex-col gap-2 items-center">
            <Label className="text-textGray mb-2 block text-sm font-medium">GST Number</Label>
            <Input className="md:w-[70%] w-full rounded-lg" placeholder="Enter GST Number" />
          </div>

          {/* Contact Number */}
          <div className="flex justify-between md:flex-row flex-col gap-2 items-center">
            <Label className="text-textGray mb-2 block text-sm font-medium">Contact Number</Label>
            <Input className="md:w-[70%] w-full rounded-lg" placeholder="Enter Contact Number" />
          </div>

          {/* Email ID */}
          <div className="flex justify-between md:flex-row flex-col gap-2 items-center">
            <Label className="text-textGray mb-2 block text-sm font-medium">Email ID</Label>
            <Input className="md:w-[70%] w-full rounded-lg" type="email" placeholder="Enter Email ID" />
          </div>

          {/* Building Name/Number */}
          <div className="flex justify-between md:flex-row flex-col gap-2 items-center">
            <Label className="text-textGray mb-2 block text-sm font-medium">Building Name/Number</Label>
            <Input className="md:w-[70%] w-full rounded-lg" placeholder="Enter Building Name/Number" />
          </div>

          {/* Street */}
          <div className="flex justify-between md:flex-row flex-col gap-2 items-center">
            <Label className="text-textGray mb-2 block text-sm font-medium">Street</Label>
            <Input className="md:w-[70%] w-full rounded-lg" placeholder="Enter Street" />
          </div>

          {/* Post */}
          <div className="flex justify-between md:flex-row flex-col gap-2 items-center">
            <Label className="text-textGray mb-2 block text-sm font-medium">Post</Label>
            <Input className="md:w-[70%] w-full rounded-lg" placeholder="Enter Post" />
          </div>

          {/* State */}
          <div className="flex justify-between md:flex-row flex-col gap-2 items-center">
            <Label className="text-textGray mb-2 block text-sm font-medium">State</Label>
            <Input className="md:w-[70%] w-full rounded-lg" placeholder="Enter State" />
          </div>

          {/* Pincode */}
          <div className="flex justify-between md:flex-row flex-col gap-2 items-center">
            <Label className="text-textGray mb-2 block text-sm font-medium">Pincode</Label>
            <Input className="md:w-[70%] w-full rounded-lg" placeholder="Enter Pincode" />
          </div>

          {/* Country */}
          <div className="flex justify-between md:flex-row flex-col gap-2 items-center">
            <Label className="text-textGray mb-2 block text-sm font-medium">Country</Label>
            <Input className="md:w-[70%] w-full rounded-lg" placeholder="Enter Country" />
          </div>

          {/* Uploaded Document */}
          <div className="flex justify-between md:flex-row flex-col gap-2 items-center">
            <Label className="text-textGray mb-2 block text-sm font-medium">Uploaded Document</Label>
            <div className="md:w-[70%] w-full flex items-start">
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

          {/* Status */}
          <div className="flex justify-between md:flex-row flex-col gap-2 items-center">
            <Label className="text-textGray mb-2 block text-sm font-medium">Status</Label>
            <Select >
              <SelectTrigger className="md:w-[70%] w-full rounded-lg">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent className=" z-[10004]">
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Comment */}
          <div className="flex justify-between md:flex-row flex-col gap-2 items-center">
            <Label className="text-textGray mb-2 block text-sm font-medium">Comment</Label>
            <Textarea placeholder="Enter Comment" className="md:w-[70%] w-full rounded-lg" />
          </div>
        </form>
      </TaskModalContent>

      <TaskModalFooter>
        <span className="mr-auto">[esc] for close</span>
        <AyButton title="Cancel" outLineColor="gray" variant="outlined" />
        <AyButton title="Submit" />
      </TaskModalFooter>
    </TaskModal>
  );
}
