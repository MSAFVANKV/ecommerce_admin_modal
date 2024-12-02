import {
  Box,
  IconButton,
  styled,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { MenuIcon } from "lucide-react";
import { Fullscreen, PublicOutlined } from "@mui/icons-material";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import FullViewScreen from "@/hooks/FullViewScreen";
import useNavigateClicks from "@/hooks/useClicks";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import NotificationBarSheet from "./Notification_Sheet";
import { Button } from "../ui/button";

type Props = {
  open: boolean;
  drawerWidth: number;
  title?: string;
  handleDrawerOpen: () => void;
  logo?: string;
};

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

export default function NavAppBar({
  open,
  drawerWidth,
  handleDrawerOpen,
}: Props) {
  // handle full screen mode ====
  const { handleFullScreen } = FullViewScreen();
  // click
  const { handleClick } = useNavigateClicks();

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    boxShadow: "none", // Remove the shadow here
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  return (
    <AppBar
      position="fixed"
      color="default"
      sx={{
        boxShadow: " rgba(33, 35, 38, 0.1) 0px 10px 10px -10px",
        display: "flex",
        // borderBottom:"0.9px solid #4E4E4E"
      }}
      open={open}
    >
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          // borderBottom:"0.9px solid #4E4E4E"
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ marginRight: 5, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {/* <img src={MyLogo} alt="My Logo" style={{ height: '40px', marginRight: '10px' }} /> */}
          </Typography>
        </Toolbar>

        {/* ======  navbar right side starts here =======
        ==================================================== */}

        <Box mr="1rem" display="flex" gap="" alignItems="center">
          {/* Full screen btn ======
            ========================== */}
          <Tooltip title="Full Screen">
            <IconButton onClick={handleFullScreen}>
              <Fullscreen />
            </IconButton>
          </Tooltip>

          {/* Home btn ======
            ========================== */}

          <Tooltip title="home">
            <IconButton onClick={() => handleClick("/dashboard")}>
              <PublicOutlined />
            </IconButton>
          </Tooltip>

          {/* Notification btn ======
            ========================== */}

          <NotificationBarSheet />

          {/* User Details avatar and more settings =====
        ================================================ */}
          <Dialog>
            <DialogTrigger>
              <div className="flex gap-3 ml-5">
                <div className="flex flex-col text-start">
                  <span className="text-sm font-medium text-gray-700">
                    Admin
                  </span>
                  <span className=" text-gray-400">shadcn</span>
                </div>
                {/* ====== */}
                <Avatar className="w-7 h-7">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  Logout from the application
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="sm:justify-end">
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Close
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button type="button" variant="default">
                    Logout
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* =============================== */}
        </Box>
      </Box>
    </AppBar>
  );
}
