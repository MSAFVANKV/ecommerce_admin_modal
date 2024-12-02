// import "@/assets/css/style.css";
// import * as React from "react";
// import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import MuiDrawer from "@mui/material/Drawer";
// import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import List from "@mui/material/List";
// import CssBaseline from "@mui/material/CssBaseline";
// import Typography from "@mui/material/Typography";
// // import Divider from '@mui/material/Divider';
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import Collapse from "@mui/material/Collapse"; // Import Collapse
// import {
//   ListItem,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   useMediaQuery,
// } from "@mui/material";
// import ExpandLess from "@mui/icons-material/ExpandLess"; // Collapse icon
// import ExpandMore from "@mui/icons-material/ExpandMore"; // Expand icon
// import { Outlet, useLocation, useNavigate } from "react-router-dom";

// import { Icon } from "@iconify/react/dist/iconify.js";
// import Logo from "./components/navbar_/Logo";
// import { cn } from "./lib/utils";

// const drawerWidth = 260;

// const openedMixin = (theme: Theme): CSSObject => ({
//   width: drawerWidth,
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.enteringScreen,
//   }),
//   overflowX: "hidden",
// });

// const closedMixin = (theme: Theme): CSSObject => ({
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   overflowX: "hidden",
//   width: 0, // Set width to 0 when collapsed
//   [theme.breakpoints.up("sm")]: {
//     width: `calc(${theme.spacing(7)} + 1px)`,
//   },
// });

// const DrawerHeader = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "space-between",
//   marginTop: "1rem", // equivalent to py-4 in Tailwind
//   paddingBottom: "1rem", // equivalent to py-4 in Tailwind
//   padding: theme.spacing(0, 1),
//   ...theme.mixins.toolbar,
// }));

// interface AppBarProps extends MuiAppBarProps {
//   open?: boolean;
// }

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== "open",
// })<AppBarProps>(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(["width", "margin"], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   boxShadow: "none", // Remove the shadow here
//   ...(open && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(["width", "margin"], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

// const Drawer = styled(MuiDrawer, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   width: drawerWidth,
//   flexShrink: 0,
//   whiteSpace: "nowrap",
//   boxSizing: "border-box",
//   // zIndex: theme.zIndex.drawer + 2, 
//   ...(open && {
//     ...openedMixin(theme),
//     "& .MuiDrawer-paper": {
//       ...openedMixin(theme),
//       backgroundColor: "#000", // Black background
//       color: "#fff", // White text color (optional)
//       // zIndex: theme.zIndex.drawer + 2, 
//     },
//     "& .MuiListItemIcon-root": {
//       color: "#AF61CC", // Icon color
//     },
//   }),
//   ...(!open && {
//     ...closedMixin(theme),
//     "& .MuiDrawer-paper": {
//       ...closedMixin(theme),
//       backgroundColor: "#000", // Black background
//       color: "#fff", // White text color (optional)
//     },
//     "& .MuiListItemIcon-root": {
//       color: "#AF61CC", // Icon color
//     },
//   }),
// }));

// const NAVIGATION = [
//   {
//     kind: "page",
//     segment: "/dashboard",
//     title: "Dashboard",
//     icon: <Icon icon="material-symbols:dashboard-rounded" />,
//   },
//   {
//     kind: "page",
//     segment: "/products",
//     title: "Products",
//     icon: <Icon icon="entypo:box" />,
//     isChild: true,
//     children: [
//       { title: "Add New Product", segment: "/products/add-new" },
//       { title: "All Products", segment: "/products/all" },
//       { title: "Category", segment: "/products/category" },
//       { title: "Brand", segment: "/products/brand" },
//       { title: "Product Reviews", segment: "/products/reviews" },
//       { title: "Colors", segment: "/products/colors" },
//     ],
//   },
//   {
//     kind: "page",
//     segment: "/sales",
//     title: "Sales",
//     icon: <Icon icon="streamline:graph-bar-increase-solid" />,
//     isChild: true,
//     children: [
//       { title: "All Orders", segment: "/sales/orders" },
//       { title: "Customer Refunds", segment: "/sales/refunds" },
//     ],
//   },
//   {
//     kind: "page",
//     segment: "/customers/refund",
//     title: "Customer Refund",
//     icon: <Icon icon="heroicons:receipt-refund-20-solid" />,
//   },
//   {
//     kind: "page",
//     segment: "/customers",
//     title: "Customers",
//     icon: <Icon icon="mdi:account-group" />,
//   },
//   {
//     kind: "page",
//     segment: "/marketing",
//     title: "Marketing",
//     icon: <Icon icon="mdi:bullhorn" />,
//     isChild: true,
//     children: [{ title: "Coupons", segment: "/marketing/coupons" }],
//   },
//   {
//     kind: "page",
//     segment: "/reports",
//     title: "Reports",
//     icon: <Icon icon="mdi:chart-bar" />,
//     isChild: true,
//     children: [
//       { title: "Product Sale", segment: "/reports/product-sale" },
//       { title: "Product Stock", segment: "/reports/product-stock" },
//       { title: "Product Wishlist", segment: "/reports/wishlist" },
//       { title: "User Searches", segment: "/reports/searches" },
//     ],
//   },
//   {
//     kind: "page",
//     segment: "/website",
//     title: "Website Group",
//     icon: <Icon icon="mdi:web" />,
//     isChild: true,
//     children: [
//       { title: "Group", segment: "/website/group" },
//       { title: "Preview", segment: "/website/preview" },
//     ],
//   },
//   {
//     kind: "page",
//     segment: "/store",
//     title: "Store Management",
//     icon: <Icon icon="mdi:storefront-outline" />,
//     isChild: true,
//     children: [
//       { title: "Review", segment: "/store/review" },
//       { title: "Postal Code", segment: "/store/postal-code" },
//       { title: "Store Earnings", segment: "/store/earnings" },
//       { title: "Product Overview", segment: "/store/overview" },
//       { title: "Store Commission", segment: "/store/commission" },
//     ],
//   },
//   {
//     kind: "page",
//     segment: "/seller",
//     title: "Seller Management",
//     icon: <Icon icon="mdi:account-tie" />,
//     isChild: true,
//     children: [
//       { title: "Seller Stock Requests", segment: "/seller/stock-requests" },
//       { title: "Request to Stock", segment: "/seller/request-stock" },
//       { title: "Conversations", segment: "/seller/conversations" },
//       { title: "Returns to Seller", segment: "/seller/returns" },
//     ],
//   },
//   {
//     kind: "page",
//     segment: "/settings",
//     title: "Settings",
//     icon: <Icon icon="mdi:cog-outline" />,
//     isChild: true,
//     children: [{ title: "Shipping", segment: "/settings/shipping" }],
//   },
// ];

// export default function MiniDrawer() {
//   const theme = useTheme();
//   const [open, setOpen] = React.useState(true);
//   const [collapseStates, setCollapseStates] = React.useState<{
//     [key: number]: boolean;
//   }>({}); // Track collapse state
//   const navigate = useNavigate();
//   const location = useLocation(); // Get current location
//   const pathname = location.pathname.replace("/admin/", "");

//   //   alert(pathname)

//   const isLargeScreen = useMediaQuery(theme.breakpoints.up("sm"));

//   const handleDrawerOpen = () => {
//     setOpen(true);
//   };

//   const handleDrawerClose = () => {
//     setOpen(false);
//     setCollapseStates({});
//   };

//   const handleCollapseToggle = (index: number) => {
//     setOpen(true);

//     setCollapseStates((prev) => ({
//       ...prev,
//       [index]: !prev[index], // Toggle collapse state for this index
//     }));
//   };

//   const handleNavigation = (segment: string | undefined) => {
//     if (segment) {
//       navigate(segment); // Navigate to the specified segment
//     }
//   };

//   return (
//     <div
//       className={cn(``, {
//         "debug-screens": import.meta.env.MODE === "development",
//       })}
//     >
//       <Box sx={{ display: "flex" }}>
//         <CssBaseline />
//         <AppBar
//           position="fixed"
//           color="default"
//           sx={{
//             boxShadow: " rgba(33, 35, 38, 0.1) 0px 10px 10px -10px",

//             // borderBottom:"0.9px solid #4E4E4E"
//           }}
//           open={open}
//         >
//           <Toolbar>
//             <IconButton
//               color="inherit"
//               aria-label="open drawer"
//               onClick={handleDrawerOpen}
//               edge="start"
//               sx={{ marginRight: 5, ...(open && { display: "none" }) }}
//             >
//               <MenuIcon />
//             </IconButton>
//             <Typography variant="h6" noWrap component="div">
//               {/* <img src={MyLogo} alt="My Logo" style={{ height: '40px', marginRight: '10px' }} /> */}
//             </Typography>
//           </Toolbar>
//         </AppBar>
//         <Drawer
//           variant="permanent"
//           open={open}
//           sx={{
//             "& .MuiDrawer-paper": {
//               backgroundColor: "#1E1E1E", // Black background
//               color: "#fff", // White text color (optional)
//             },
//             "& .MuiListItemIcon-root": {
//               color: "#AF61CC", // Icon color
//             },
//           }}
//         >
//           <DrawerHeader className="py-7">
//             {open && (
//               <>
//                 <Logo />

//                 <IconButton onClick={handleDrawerClose}>
//                   {theme.direction === "rtl" ? (
//                     <ChevronRightIcon />
//                   ) : (
//                     <ChevronLeftIcon className="text-white" />
//                   )}
//                 </IconButton>
//               </>
//             )}
//           </DrawerHeader>
//           {/* <Divider /> */}
//           <List>
//             {NAVIGATION.map((item, index) => {
//               if (item.isChild) {
//                 return (
//                   <React.Fragment key={index}>
//                     <ListItemButton onClick={() => handleCollapseToggle(index)}>
//                       <ListItemIcon>{item.icon}</ListItemIcon>
//                       <ListItemText
//                         primary={item.title}
//                         primaryTypographyProps={{
//                           fontSize: "16px", // Adjust child item font size
//                           // Optional: Change text color
//                         }}
//                       />
//                       {collapseStates[index] ? <ExpandLess /> : <ExpandMore />}
//                     </ListItemButton>
//                     <Collapse
//                       in={collapseStates[index]}
//                       timeout="auto"
//                       unmountOnExit
//                     >
//                       <List component="div" disablePadding>
//                         {item.children?.map((child, childIndex) => (
//                           <ListItemButton
//                             key={childIndex}
//                             sx={{ pl: 4 }}
//                             onClick={() => handleNavigation(child.segment)}
//                           >
//                             {child.segment === pathname ? (
//                               <label className="radio-button">
//                                 <input
//                                   id={`option-${childIndex}`} // Use unique IDs for each input
//                                   name="radio-group"
//                                   type="radio"
//                                   checked
//                                 />
//                                 <span className="radio-checkmark"></span>
//                               </label>
//                             ) : (
//                               <label className="radio-button">
//                                 <input
//                                   id={`option-${childIndex}`} // Use unique IDs for each input
//                                   name="radio-group"
//                                   type="radio"
//                                 />
//                                 <span className="radio-checkmark"></span>
//                               </label>
//                             )}

//                             <ListItemText
//                               primaryTypographyProps={{ fontSize: "0.75rem" }}
//                               primary={child.title}
//                             />
//                           </ListItemButton>
//                         ))}
//                       </List>
//                     </Collapse>
//                   </React.Fragment>
//                 );
//               } else {
//                 return (
//                   <ListItem
//                     key={index}
//                     disablePadding
//                     sx={{
//                       backgroundColor:
//                         item.segment === pathname
//                           ? "#818080cc"
//                           : "undefined,opacity: 0.8", // Use undefined instead of false
//                     }}
//                   >
//                     <ListItemButton
//                       onClick={() => handleNavigation(item.segment)}
//                     >
//                       <ListItemIcon
//                         sx={{
//                           display: open || isLargeScreen ? "block" : "none",
//                         }}
//                       >
//                         {item.icon}
//                       </ListItemIcon>
//                       <ListItemText
//                         primary={item.title}
//                         sx={{
//                           display: open || isLargeScreen ? "block" : "none",
//                         }}
//                       />
//                     </ListItemButton>
//                   </ListItem>
//                 );
//               }
//             })}
//           </List>
//         </Drawer>
//         <Box component="main" sx={{ flexGrow: 1, p: 2, bgcolor: "#F7F7F7" }}>
//           <DrawerHeader />
//           <Outlet />
//         </Box>
//       </Box>
//     </div>
//   );
// }
