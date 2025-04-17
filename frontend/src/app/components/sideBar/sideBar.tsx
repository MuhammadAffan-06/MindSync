/* eslint-disable  @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { usePathname, useRouter } from "next/navigation";

const drawerWidth = 240;

const menuItems: any = [
  { label: "Dashboard", route: "/dashboard" },
  { label: "Messages", route: "/messages" },
  { label: "Session History", route: "/session-history" },
  { label: "Analytics", route: "/analytics" },
  { label: "Calender", route: "/calender" },
  { label: "Contact Us", route: "/contact-us" },
];

const bottomItems: any = [{ label: "Log Out", route: "/logout" }];

const customIcons: any = {
  Dashboard: "/icons/dashboard-icon.svg",
  Messages: "/icons/messages-icon.svg",
  "Session History": "/icons/session-history-icon.svg",
  Analytics: "/icons/analytics-icon.svg",
  Calender: "/icons/calender-icon.svg",
  "Contact Us": "/icons/contact-us-icon.svg",
  "Log Out": "/icons/log-out-icons.svg",
};

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [selectedItem, setSelectedItem] = React.useState(pathname);

  const handleNavigation = (item: { route: string; label: string }) => {
    setSelectedItem(item.route);
    if (item.route === "/logout") {
      handleLogout();
    } else {
      router.push(item.route);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/auth");
  };

  // Toggle the mobile drawer
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <Box sx={{ overflow: "auto", marginTop: "-16px" }}>
      <List>
        {menuItems.map((item: any) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              selected={selectedItem === item.route}
              onClick={() => handleNavigation(item)}
              sx={{
                borderRadius: "8px",
                "&.Mui-selected": {
                  backgroundColor: "#5a3ec8",
                  color: "#fff",
                  "& .MuiListItemIcon-root img": {
                    filter: "invert(100%)",
                  },
                },
                "&:hover": {
                  backgroundColor: "#5a3ec8",
                  color: "#fff",
                  "& .MuiListItemIcon-root img": {
                    filter: "invert(100%)",
                  },
                },
                margin: "4px",
              }}
            >
              <ListItemIcon>
                <img src={customIcons[item.label]} alt={`${item.label} icon`} style={{ width: 24, height: 24 }} />
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {bottomItems.map((item: any) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              selected={selectedItem === item.label}
              onClick={() => handleNavigation(item)}
              sx={{
                borderRadius: "8px",
                "&.Mui-selected": {
                  backgroundColor: "#5a3ec8",
                  color: "#fff",
                  "& .MuiListItemIcon-root img": {
                    filter: "invert(100%)",
                  },
                },
                "&:hover": {
                  backgroundColor: "#5a3ec8",
                  color: "#fff",
                  "& .MuiListItemIcon-root img": {
                    filter: "invert(100%)",
                  },
                },
              }}
            >
              <ListItemIcon>
                <img src={customIcons[item.label]} alt={`${item.label} icon`} style={{ width: 24, height: 24 }} />
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", backgroundColor: "white", fontFamily: "Poppins" }}>
      <CssBaseline />

      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerToggle}
        sx={{ display: { md: "none" }, position: "fixed", top: 8, left: 8, zIndex: 1000 }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            backgroundColor: "white",
            fontFamily: "Poppins",
          },
        }}
      >
        <Toolbar />
        {drawerContent}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "white",
            fontFamily: "Poppins",
            marginTop: "64px",
          },
        }}
        open
      >
        <Toolbar />
        {drawerContent}
      </Drawer>
    </Box>
  );
}
