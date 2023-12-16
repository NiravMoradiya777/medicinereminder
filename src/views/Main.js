import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import Login from './Login/Login';
import EditProfile from './Login/EditProfile';
import Footer from './Footer';
import Medications from './Patient/Medication/Medications';
import CareGivers from './Patient/Caregiver/CareGivers';
import MedicationIcon from '@mui/icons-material/Medication';
import Nav from './Nav';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));
  
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));

export default function MainComponent() {

    const [auth, setAuth] = React.useState(false);
    const [user, setUser] = React.useState({});
    const [selectedComponent, setSelectedComponent] = React.useState(<Medications/>);
    
    const primaryComponents = [
        {
            id: 1,
            comp: <Medications/>,
            label: 'Medications',
            icon: <VaccinesIcon/>,
            comp: <Medications/>
        },
        {
            id: 2,
            comp: <CareGivers/>,
            label: 'Caregivers',
            icon: <MedicationIcon/>
        }
    ];
    const secondaryComponents = [
        {
            id: 1,
            comp: <EditProfile/>,
            label: 'Edit Profile',
            icon: <AccountCircleIcon/>
        }
    ];

    React.useEffect(() => {
        const curUser = localStorage.getItem('user');
        if (curUser === null) setAuth(false);
        else { 
            console.log(curUser);
            setUser(JSON.parse(curUser))
            setAuth(true);
        }
    }, []);

    const logout = () => {
        localStorage.removeItem('user');
        setAuth(false);
    };

    const theme = useTheme();
    const [open, setOpen] = React.useState(true);

    const handleListItemClick = (componentName) => {
        setSelectedComponent(componentName);
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        auth ? (
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed" open={open}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{ mr: 2, ...(open && { display: 'none' }) }}
                        >
                        <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Medicine Reminder
                        </Typography>
                        
                        <div>
                            {/* <IconButton
                                size="large"
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            {user?.fname} {user?.lname} */}
                            
                            <IconButton onClick={logout} color="inherit" aria-label="upload picture" component="label">
                                <LogoutIcon />
                            </IconButton>
                        </div>
                    
                    </Toolbar>
                </AppBar>
                <Drawer
                    sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                    }}
                    variant="persistent"
                    anchor="left"
                    open={open}
                >
                    <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <List>
                    {primaryComponents.map((comp, index) => (
                        <ListItem key={comp.id} disablePadding onClick={()=> {handleListItemClick(comp.comp)}}>
                        <ListItemButton>
                            <ListItemIcon>
                            {comp.icon}
                            </ListItemIcon>
                            <ListItemText primary={comp.label} />
                        </ListItemButton>
                        </ListItem>
                    ))}
                    </List>
                    <Divider />
                    <List>
                    {secondaryComponents.map((comp, index) => (
                        <ListItem key={comp.id} disablePadding onClick={()=> {handleListItemClick(comp.comp)}}>
                        <ListItemButton>
                            <ListItemIcon>
                            {comp.icon}
                            </ListItemIcon>
                            <ListItemText primary={comp.label} />
                        </ListItemButton>
                        </ListItem>
                    ))}
                    </List>
                </Drawer>
                <Main open={open}>
                    {/* <DrawerHeader /> */}
                    <Box sx={{ mt: 5 }}>
                        {selectedComponent}
                    </Box>
                </Main>
                <Footer/>
            </Box>
        
        ) : (
            <Login setAuth={(obj) => { setAuth(true); setUser(obj)}}/>
        )
    );
}