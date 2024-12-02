
import { Button, SxProps, Theme } from "@mui/material";
import { Icon } from "@iconify/react/dist/iconify.js";

type Props = {
  onClick?: () => void; // Function to call when the button is clicked
  title: string; // The title of the button
  sx?: SxProps<Theme>; // Allow overriding styles
  variant?: "contained" | "outlined"; // Add variants
  outLineColor?:string
  icon?:string; //
  iconSize?: number; // Font size for the icon
  type?: "submit"|"reset"|"button"
  // onclickEvent?: (route:string)=>void; // Event handler for onClick event
};

export default function AyButton({
  onClick,
  title,
  sx,
  variant = "contained", // Default variant is "contained"
  outLineColor,
  icon,
  iconSize,
  type="button"
}: Props) {
  return (
    <Button
    onClick={onClick}
    type={type}
      sx={{
        ...(variant === "contained"
          ? {
            bgcolor: "var(--mainColor)", // Default background color
            color: "#fff", // Default text color for contrast
            "&:hover": {
              bgcolor: "var(--primaryVariant)", // Optional hover color
            },
            textTransform: "capitalize", 
            }
          : {
              border: `1px solid ${outLineColor}`, // Border for "outlined"
              color: `${outLineColor ? "black" : " var(--mainColor)"}`, // Text color for "outlined"
              bgcolor: "transparent", // Transparent background
              "&:hover": {
                bgcolor: "rgba(0, 123, 255, 0.1)", // Subtle hover background
              },
            }),
        textTransform: "capitalize", // Avoid uppercase text
        width:"150px",
        ...sx, // Allow overriding styles via `sx` prop
      }}
    >
     <Icon icon={`${icon}`} fontSize={iconSize} /> {title}
    </Button>
  );
}
