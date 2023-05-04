import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../../theme";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import CodeIcon from '@mui/icons-material/Code';

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  ElitePS
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Profile"
              to="/profile"
              icon={<AccountCircleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Clients"
              to="/clients"
              icon={<GroupsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Users"
              to="/users"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Reports"
              to="/reports"
              icon={<SummarizeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="KBase"
              to="/kbase"
              icon={<HelpOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Docs"
              to="/docs"
              icon={<CodeIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;


// import { useState } from 'react'
// import { Menu, MenuItem, ProSidebar } from 'react-pro-sidebar'
// import { Box, IconButton, Typography, useTheme } from '@mui/material'
// import { Link } from 'react-router-dom'
// import { tokens } from '../../../theme'
// import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
// import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
// import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
// import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
// import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";
// import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
// import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
// import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';

// const SidebarLayout = () => {
//     const theme = useTheme()
//     const colors = tokens(theme.palette.mode)
//     const [isCollapsed, setIsCollapsed] = useState(false);
//     const [selected, setSelected] = useState("Dashboard")

//     return (
//         <div style={{ display: 'flex' }}>
//             <ProSidebar className='sidebar-container' backgroundColor='transparent' collapsed={isCollapsed}>
//                 <MenuItem
//                     onClick={() => setIsCollapsed(!isCollapsed)}
//                     icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
//                     style={{
//                     margin: "10px 0 20px 0",
//                     color: colors.grey[100],
//                     }}
//                 ></MenuItem>
                
//                 <Menu
//                     renderMenuItemStyles={() => ({
//                         '.menu-anchor': {
//                             backgroundColor: 'transparent',
//                             '&:hover': {
//                                 backgroundColor: '#868dfb'
//                             }
//                         }
//                     })}
//                 >                
//                     <MenuItem 
//                         className='sidebar-item'
//                         routerLink={<Link to="/" />}
//                         icon={<HomeOutlinedIcon />}
//                         selected={selected}
//                         setSelected={setSelected}
//                     >
//                         Dashboard
//                     </MenuItem>
//                     <MenuItem 
//                         className='sidebar-item'
//                         routerLink={<Link to="/profile" />}
//                         icon={<PersonOutlinedIcon />}
//                         selected={selected}
//                         setSelected={setSelected}
//                     >
//                         Profile
//                     </MenuItem>
//                     <MenuItem 
//                         className='sidebar-item'
//                         routerLink={<Link to="/clients" />}
//                         icon={<PeopleOutlinedIcon />}
//                         selected={selected}
//                         setSelected={setSelected}
//                     >
//                         Clients
//                     </MenuItem>
//                     <MenuItem 
//                         className='sidebar-item'
//                         routerLink={<Link to="/users" />}
//                         icon={<ContactsOutlinedIcon />}
//                         selected={selected}
//                         setSelected={setSelected}
//                     >
//                         Users
//                     </MenuItem>
//                     {/* <MenuItem 
//                         className='sidebar-item'
//                         routerLink={<Link to="/invoices" />}
//                         icon={<PersonOutlinedIcon />}
//                         selected={selected}
//                         setSelected={setSelected}
//                     >
//                         Invoices
//                     </MenuItem> */}
//                     {/* <MenuItem 
//                         className='sidebar-item'
//                         routerLink={<Link to="/contracts" />}
//                         icon={<PersonOutlinedIcon />}
//                         selected={selected}
//                         setSelected={setSelected}
//                     >
//                         Contracts
//                     </MenuItem> */}
//                     <MenuItem 
//                         className='sidebar-item'
//                         routerLink={<Link to="/jobs" />}
//                         icon={<WorkOutlineOutlinedIcon />}
//                         selected={selected}
//                         setSelected={setSelected}
//                     >
//                         Jobs
//                     </MenuItem>
//                     <MenuItem 
//                         className='sidebar-item'
//                         routerLink={<Link to="/reports" />}
//                         icon={<SummarizeOutlinedIcon />}
//                         selected={selected}
//                         setSelected={setSelected}
//                     >
//                         Reports
//                     </MenuItem>
//                     <MenuItem 
//                         className='sidebar-item'
//                         routerLink={<Link to="/kbase" />}
//                         icon={<HelpOutlinedIcon />}
//                         selected={selected}
//                         setSelected={setSelected}
//                     >
//                         KBase
//                     </MenuItem>
//                 </Menu>
//             </ProSidebar>
//         </div>
//     );
// };

// export default SidebarLayout;