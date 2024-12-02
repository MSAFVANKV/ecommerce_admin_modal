import React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
// import Fade from "@mui/material/Fade";

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  fontSize: theme.typography.pxToRem(14), // text-sm equivalent
  padding: theme.spacing(1, 2), // Tailwind's py-1 px-2
  color: theme.palette.text.primary, // Default text color
  "&:hover": {
    backgroundColor: theme.palette.action.hover, // Add hover effect
  },
  
}));

export default function GstDropDown() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <div>
        <Button
          id="fade-button"
          aria-controls={open ? "fade-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          sx={{
            color: "gray",
            fontSize: "11px",
            width: "150px", // Fixed width
            whiteSpace: "nowrap", // Prevent text wrapping
            overflow: "hidden", // Ensure long text doesn't overflow
            textOverflow: "ellipsis", // Adds ellipsis for overflow text
          }}
          className="bg-slate-500"
        >
          View TAX details
        </Button>
        <Menu
          id="fade-menu"
          MenuListProps={{
            "aria-labelledby": "fade-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          // TransitionComponent={Fade}
          sx={{
            "& .MuiPaper-root": {
              width: "150px", // Match the button's width
              fontSize:"12px",
              borderRadius:"17px"
            },
          }}
        >
           {/* Use StyledMenuItem here */}
           <StyledMenuItem onClick={handleClose}>IGST</StyledMenuItem>
          <StyledMenuItem onClick={handleClose}>CGST</StyledMenuItem>
          <StyledMenuItem onClick={handleClose}>SGST</StyledMenuItem>
          <StyledMenuItem onClick={handleClose}>CESS</StyledMenuItem>
        </Menu>
      </div>
    </React.Fragment>
  );
}
    {/* <div className="w-[150px] mx-auto relative">
      <span
        className="hover:underline cursor-pointer sm:text-sm text-xs"
        onClick={() => {
          setShowGstMode(!showGstMode);
        }}
      >
        View TAX details
      </span>
      <div
        className={`absolute bg-white top-7 left-0 right-0 shadow-xl rounded-xl ${showGstMode ? "h-auto p-3 border" : "h-0"}`}
      >
        <div
          className={`flex flex-col gap-2 ${showGstMode ? "opacity-100" : "opacity-0"}`}
        >
          <span>IGST</span>
          <span>CGST</span>
          <span>SGST</span>
          <span>CESS</span>
        </div>
      </div>
    </div> */}