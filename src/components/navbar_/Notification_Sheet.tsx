import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { IconButton, Tooltip } from "@mui/material";
import { Notifications } from "@mui/icons-material";
import { Icon } from "@iconify/react/dist/iconify.js";
import { makeToast } from "@/utils/toaster";

export default function NotificationBarSheet() {
  const notification = [
    {
      id: 1,
      title: "Notification",
      description: "Your daily task is due today",
      time: "2023-03-15 12:00 PM",
      icon: "mdi:bell",
    },
    {
      id: 2,
      title: "Payment Confirmed",
      description: "Don't forget about your meeting tomorrow at 10 AM",
      time: "2023-03-15 10:00 AM",
      icon: "material-symbols:payments-outline-sharp",
    },
    {
      id: 3,
      title: "Abinav Pk",
      description: "Don't forget about your meeting tomorrow at 10 AM",
      time: "2023-03-15 10:00 AM",
      icon: "ic:round-chat",
    },
  ];

  const handleClearNotifications = ()=>{
    makeToast("Clear notifications")
    
  }

  return (
    <Sheet>
      <SheetTrigger>
        <Tooltip title="Notification">
          <IconButton>
            <Notifications />
          </IconButton>
        </Tooltip>
      </SheetTrigger>
      <SheetContent className="z-[10002] w-[400px] sm:w-[940px] " isClearBtn={true} onClear={handleClearNotifications}>
        <div className="flex flex-col gap-3 pt-10">
          {notification.map((item, index) => (
            <div
              key={index}
              className="flex p-5 rounded-lg gap-4 items-center bg-bgHardSoft"
            >
              <div className="">
                <Icon
                  icon={item.icon}
                  className="text-textMain"
                  fontSize={25}
                />
              </div>
              <div className="flex flex-col text-start">
                <h3>{item.title}</h3>
                <span>{item.description}</span>
              </div>
              <div className="ml-auto cursor-pointer">
                <span className="capitalize text-textMain">Mark as Read</span>
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
