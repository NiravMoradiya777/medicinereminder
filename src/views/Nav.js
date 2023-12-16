import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Switch from '@mui/material/Switch';
import MenuIcon from "@mui/icons-material/Menu";
import FeaturedPlayListIcon from "@mui/icons-material/FeaturedPlayList";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import HomeIcon from "@mui/icons-material/Home";
import AboutUsIcon from "@mui/icons-material/Info";
import ContactUsIcon from "@mui/icons-material/Contacts";
import logoImg from "../assets/Images/logo-no-background.png";
import { Container } from "@mui/system";
import CustomButton from "../theme/components/CustomButton";
import Logout from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Menu,
  MenuItem,
  Avatar,
  Tooltip,
  IconButton,
  Divider,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const [mobileMenu, setMobileMenu] = useState({
    left: false,
  });

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const [switchState, setSwitchState] = React.useState(
    localStorage.getItem('switchState') === 'true'
  );

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleSwitchChange = () => {
    const newSwitchState = !switchState;
    setSwitchState(newSwitchState);
    localStorage.setItem('switchState', newSwitchState.toString());
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.type === "Tab" || event.type === "Shift")
    ) {
      return;
    }

    setMobileMenu({ ...mobileMenu, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {user ? (
        <List>
          {["Medication", "Caregiver"].map(
            (text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton onClick={handleMedicationClick}>
                  <ListItemIcon>
                    {index === 0 && <FeaturedPlayListIcon />}
                    {index === 1 && <MiscellaneousServicesIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            )
          )}
        </List>
      ) : (
        <List>
          {["Home", "AboutUs", "Contact"].map(
            (text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index === 0 && <HomeIcon />}
                    {index === 1 && <AboutUsIcon />}
                    {index === 2 && <ContactUsIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            )
          )}
        </List>
      )}
    </Box>
  );

  const NavLink = styled(Typography)(({ theme }) => ({
    fontSize: "14px",
    color: "#4F5361",
    fontWeight: "bold",
    cursor: "pointer",
    "&:hover": {
      color: "#fff",
    },
  }));

  const NavbarLinksBox = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing(3),
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  }));

  const CustomMenuIcon = styled(MenuIcon)(({ theme }) => ({
    cursor: "pointer",
    display: "none",
    marginRight: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      display: "block",
    },
  }));

  const NavbarContainer = styled(Container)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing(5),
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(2),
    },
  }));

  const NavbarLogo = styled("img")(({ theme }) => ({
    cursor: "pointer",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  }));

  const logout = () => {
    localStorage.removeItem('user');
    handleCloseUserMenu();
    navigate("/home");
  };

  const handleMedicationClick = () => {
    navigate("/patient/medication");
  };

  const handleCaregiverClick = () => {
    navigate("/patient/caregiver");
  };

  const handleDashboardClick = () => {
    navigate("/patient/dashboard");
  };

  const handleCaregiverDashboardClick = () => {
    navigate("/caregiver/dashboard");
  };

  const handleCaregiverPatientsClick = () => {
    navigate("/caregiver/patients");
  };

  const handleDonationClick = () => {
    navigate("/donation");
  };

  const handleDoctorDashboardClick = () => {
    navigate("/doctor/dashboard");
  };

  const handleDoctorPatientClick = () => {
    navigate("/doctor/patient");
  };

  return (
    <NavbarContainer>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "2.5rem",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <CustomMenuIcon onClick={toggleDrawer("left", true)} />
          <Drawer
            anchor="left"
            open={mobileMenu["left"]}
            onClose={toggleDrawer("left", false)}
          >
            {list("left")}
          </Drawer>
          <NavbarLogo src={logoImg} alt="logo" style={{ maxWidth: "18%" }} />
        </Box>

        {user && user.userType === 'Patient' ? (

          <NavbarLinksBox>
            <NavLink variant="body2" onClick={handleDashboardClick}>Dashboard</NavLink>
            <NavLink variant="body2" onClick={handleMedicationClick}>Medication</NavLink>
            <NavLink variant="body2" onClick={handleCaregiverClick}>Caregiver</NavLink>
            <NavLink variant="body2"></NavLink>
          </NavbarLinksBox>
        ) : (
          user && user.userType === 'Caregiver' ? (
            <NavbarLinksBox>
              <NavLink variant="body2" onClick={handleCaregiverDashboardClick}>Dashboard</NavLink>
              <NavLink variant="body2" onClick={handleCaregiverPatientsClick}>Patients</NavLink>
              <NavLink variant="body2"></NavLink>
            </NavbarLinksBox>
          ) : (
            user && user.userType === 'Doctor' ? (
              <NavbarLinksBox>
                <NavLink variant="body2" onClick={handleDoctorDashboardClick}>Dashboard</NavLink>
                <NavLink variant="body2" onClick={handleDoctorPatientClick}>Patients</NavLink>
                <NavLink variant="body2"></NavLink>
              </NavbarLinksBox>
            ) : (
            <NavbarLinksBox>
              <NavLink variant="body2">Home</NavLink>
              <NavLink variant="body2">AboutUs</NavLink>
              <NavLink variant="body2">Contact</NavLink>
              <NavLink variant="body2" onClick={handleDonationClick} >Donation</NavLink>
              <NavLink variant="body2"></NavLink>
            </NavbarLinksBox>
          )
        )
      )}
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        {user ? (
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar-user"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <ListItemIcon>
                  <SettingsIcon fontSize="small" />
                </ListItemIcon>
                Manage Profile
              </MenuItem>
              <Divider />
              <MenuItem onClick={logout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        ) : (
          <CustomButton
            backgroundColor="#0F1B4C"
            color="#fff"
            buttonText="Login"
            variant="contained"
            href="/login"
          />
        )}

        <Typography variant="body2" color="textSecondary" align="center"> Enable Accessibility: </Typography>
        <Switch size="small" checked={switchState} onChange={handleSwitchChange} color="primary" sx={{ alignSelf: 'center' }} />
      </Box>
    </NavbarContainer>
  );
};

export default Navbar;
