import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

const drawerWidth = 240;

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
  return (
    
    <Box sx={{ display: 'flex',backgroundColor: '#F9F9F9',fontFamily:'Poppins', }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box',backgroundColor: '#F9F9F9',fontFamily:'Poppins',marginTop:'64px', },
          
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto',marginTop:'-12px'}}>
          <List >
            {['Dashboard', 'Messages', 'Session History', 'Analytics', 'Calender', 'Contact Us'].map((text) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon
                  >
                    <img
                      src={customIcons[text]}
                      alt={`${text} icon`}
                      style={{ width: 24, height: 24 }}
                    />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['Setting', 'Log Out'].map((text) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <img
                      src={customIcons[text]}
                      alt={`${text} icon`}
                      style={{ width: 24, height: 24 }}
                    />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}

