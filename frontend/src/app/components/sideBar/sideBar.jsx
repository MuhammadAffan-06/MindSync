'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useRouter } from 'next/navigation'; 

const drawerWidth = 240;

const menuItems = [
  { label: 'Dashboard', route: '/dashboard' },
  { label: 'Messages', route: '/messages' },
  { label: 'Session History', route: '/session-history' },
  { label: 'Analytics', route: '/analytics' },
  { label: 'Calender', route: '/calender' },
  { label: 'Contact Us', route: '/contact-us' },
];

const bottomItems = [
  { label: 'Setting', route: '/setting' },
  { label: 'Log Out', route: '/logout' },
];

const customIcons = {
  Dashboard: '/icons/dashboard-icon.svg',
  Messages: '/icons/messages-icon.svg',
  'Session History': '/icons/session-history-icon.svg',
  Analytics: '/icons/analytics-icon.svg',
  Calender: '/icons/calender-icon.svg',
  'Contact Us': '/icons/contact-us-icon.svg',
  Setting: '/icons/setting-icon.svg',
  'Log Out': '/icons/log-out-icons.svg',
};

export default function Sidebar() {
  const router = useRouter();
  const [selectedItem, setSelectedItem] = React.useState('Dashboard');

  const handleNavigation = (item) => {
    setSelectedItem(item.label);
    router.push(item.route);
  };

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#F9F9F9', fontFamily: 'Poppins' }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#F9F9F9',
            fontFamily: 'Poppins',
            marginTop: '64px',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto', marginTop: '-12px' }}>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.label} disablePadding>
                <ListItemButton
                  selected={selectedItem === item.label}
                  onClick={() => handleNavigation(item)}
                  sx={{
                    '&.Mui-selected': {
                      backgroundColor: '#5a3ec8',
                      color: '#fff',
                      borderRadius: '8px',
                      '& .MuiListItemIcon-root img': {
                        filter: 'invert(100%)',
                      },
                    },
                    '&:hover': {
                      backgroundColor: '#5a3ec8',
                      color: '#fff',
                      borderRadius: '8px',
                      '& .MuiListItemIcon-root img': {
                        filter: 'invert(100%)',
                      },
                    },
                    margin: '4px', // Optional: adds some space around items to see border-radius clearly
                  }}
                >
                  <ListItemIcon>
                    <img
                      src={customIcons[item.label]}
                      alt={`${item.label} icon`}
                      style={{ width: 24, height: 24 }}
                    />
                  </ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {bottomItems.map((item) => (
              <ListItem key={item.label} disablePadding>
                <ListItemButton
                  selected={selectedItem === item.label}
                  onClick={() => handleNavigation(item)}
                  sx={{
                    '&.Mui-selected': {
                      backgroundColor: '#5a3ec8',
                      color: '#fff',
                      borderRadius: '8px',
                      '& .MuiListItemIcon-root img': {
                        filter: 'invert(100%)',
                      },
                    },
                    '&:hover': {
                      backgroundColor: '#5a3ec8',
                      color: '#fff',
                      borderRadius: '8px',
                      '& .MuiListItemIcon-root img': {
                        filter: 'invert(100%)',
                      },
                    },
                     
                  }}
                >
                  <ListItemIcon>
                    <img
                      src={customIcons[item.label]}
                      alt={`${item.label} icon`}
                      style={{ width: 24, height: 24 }}
                    />
                  </ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}
