import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Tooltip, TooltipProps } from "@mui/material";

import { useNavigate } from "react-router-dom";

type Props = {
  icon?: string;
  className?: string;
  title?: string;
  iconSize?: number;
  tooltipTitle?: string;
  placeTooltip?: TooltipProps["placement"];
  clickEvent?:() => void;
};

function MyBackBtn({
  icon = "bx:arrow-back",
  className,
  title,
  iconSize=15,
  tooltipTitle = "back",
  placeTooltip = "right",
  clickEvent
}: Props) {
  const navigate = useNavigate();
  const handleClick = () => {
    if(clickEvent){
      clickEvent();
    }else{
        navigate(-1);
    }
  
  };
  return (
    <Tooltip title={tooltipTitle} className="w-fit" placement={placeTooltip}>
      <button
        onClick={handleClick}
        className={cn(`flex items-center `, className)}
      >
        <Icon icon={`${icon}`} fontSize={iconSize} />{" "}
        <span>{title && title}</span>
      </button>
    </Tooltip>
  );
}

export default MyBackBtn;
