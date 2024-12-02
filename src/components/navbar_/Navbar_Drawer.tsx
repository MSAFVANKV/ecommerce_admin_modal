import React from "react";
import NavigationList from "./navigation";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import { IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, useMediaQuery } from "@mui/material";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import MuiDrawer from "@mui/material/Drawer";
import Logo from "./Logo";
import { useLocation, useNavigate } from "react-router-dom";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse"; // Import Collapse
import NavAppBar from "./Appbar";




const drawerWidth = 260;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: 0, // Set width to 0 when collapsed
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(7)} + 1px)`,
  },
});

export const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "1rem", // equivalent to py-4 in Tailwind
    paddingBottom: "1rem", // equivalent to py-4 in Tailwind
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  }));

  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    // zIndex: theme.zIndex.drawer + 2, 
    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": {
        ...openedMixin(theme),
        backgroundColor: "#000", // Black background
        color: "#fff", // White text color (optional)
        // zIndex: theme.zIndex.drawer + 2, 
      },
      "& .MuiListItemIcon-root": {
        color: "#AF61CC", // Icon color
      },
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": {
        ...closedMixin(theme),
        backgroundColor: "#000", // Black background
        color: "#fff", // White text color (optional)
      },
      "& .MuiListItemIcon-root": {
        color: "#AF61CC", // Icon color
      },
    }),
  }));

export default function NavbarDrawer() {
    const {NAVIGATION} = NavigationList();
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const [collapseStates, setCollapseStates] = React.useState<{
        [key: number]: boolean;
      }>({}); // Track collapse state
      const navigate = useNavigate();
      const location = useLocation(); // Get current location
      const pathname = location.pathname.replace("/admin/", "");
    
      //   alert(pathname)
    
      const isLargeScreen = useMediaQuery(theme.breakpoints.up("sm"));
    
      const handleDrawerOpen = () => {
        setOpen(true);
      };
    
      const handleDrawerClose = () => {
        setOpen(false);
        setCollapseStates({});
      };
    
      const handleCollapseToggle = (index: number) => {
        setOpen(true);
    
        setCollapseStates((prev) => ({
          ...prev,
          [index]: !prev[index], // Toggle collapse state for this index
        }));
      };
    
      const handleNavigation = (segment: string | undefined) => {
        if (segment) {
          navigate(segment); // Navigate to the specified segment
        }
      };

  return (
    <>
    

    {/* App bar here */}
    <NavAppBar
    drawerWidth={drawerWidth}
    handleDrawerOpen={handleDrawerOpen}
    open={open}

    />
    
    <Drawer
    variant="permanent"
    open={open}
    sx={{
      "& .MuiDrawer-paper": {
        backgroundColor: "#1E1E1E", // Black background
        color: "#fff", // White text color (optional)
      },
      "& .MuiListItemIcon-root": {
        color: "#AF61CC", // Icon color
      },
    }}
  >
    <DrawerHeader className="py-7">
      {open && (
        <>
          <Logo />

          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon className="text-white" />
            )}
          </IconButton>
        </>
      )}
    </DrawerHeader>
    {/* <Divider /> */}
    <List>
      {NAVIGATION.map((item, index) => {
        if (item.isChild) {
          return (
            <React.Fragment key={index}>
              <ListItemButton onClick={() => handleCollapseToggle(index)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.title}
                  primaryTypographyProps={{
                    fontSize: "16px", // Adjust child item font size
                    // Optional: Change text color
                  }}
                />
                {collapseStates[index] ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse
                in={collapseStates[index]}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  {item.children?.map((child, childIndex) => (
                    <ListItemButton
                      key={childIndex}
                      sx={{ pl: 4 }}
                      onClick={() => handleNavigation(child.segment)}
                    >
                      {child.segment === pathname ? (
                        <label className="radio-button">
                          <input
                            id={`option-${childIndex}`} // Use unique IDs for each input
                            name="radio-group"
                            type="radio"
                            checked
                          />
                          <span className="radio-checkmark"></span>
                        </label>
                      ) : (
                        <label className="radio-button">
                          <input
                            id={`option-${childIndex}`} // Use unique IDs for each input
                            name="radio-group"
                            type="radio"
                          />
                          <span className="radio-checkmark"></span>
                        </label>
                      )}

                      <ListItemText
                        primaryTypographyProps={{ fontSize: "0.75rem" }}
                        primary={child.title}
                      />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </React.Fragment>
          );
        } else {
          return (
            <ListItem
              key={index}
              disablePadding
              sx={{
                backgroundColor:
                  item.segment === pathname
                    ? "#818080cc"
                    : "undefined,opacity: 0.8", // Use undefined instead of false
              }}
            >
              <ListItemButton
                onClick={() => handleNavigation(item.segment)}
              >
                <ListItemIcon
                  sx={{
                    display: open || isLargeScreen ? "block" : "none",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.title}
                  sx={{
                    display: open || isLargeScreen ? "block" : "none",
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        }
      })}
    </List>
  </Drawer>
    </>
    
  )
}