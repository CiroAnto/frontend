import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Box, Typography, AppBar, Toolbar, Button, InputBase, alpha, styled, 
  IconButton, Drawer, List, ListItem, ListItemButton, ListItemText 
} from "@mui/material";
import { Search as SearchIcon, Menu as MenuIcon, Home, People, Payments, Settings } from "@mui/icons-material";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': { backgroundColor: alpha(theme.palette.common.white, 0.25) },
  marginLeft: 'auto',
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(2),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justify: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': { width: '20ch' },
    },
  },
}));

const AdminNavbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { label: 'Home', path: '/admin', icon: <Home fontSize="small" /> },
    { label: 'Clientes', path: '/admin/clientes', icon: <People fontSize="small" /> },
    { label: 'Pagos Pendientes', path: '/admin/pagos-pendientes', icon: <Payments fontSize="small" /> },
    { label: 'Pagados', path: '/admin/pagados', icon: <Payments fontSize="small" /> },
    { label: 'Ajustes', path: '/admin/ajustes', icon: <Settings fontSize="small" /> },
  ];

  const navButtonStyle = (path) => ({
    color: 'inherit',
    borderBottom: location.pathname === path ? '3px solid white' : '3px solid transparent',
    borderRadius: 0,
    opacity: location.pathname === path ? 1 : 0.7, 
    whiteSpace: 'nowrap',
    '&:hover': {
      opacity: 1,
      borderBottom: location.pathname === path ? '3px solid white' : '3px solid rgba(255,255,255,0.5)'
    }
  });

  const drawerContent = (
    <Box
      onClick={handleDrawerToggle}
      sx={{ width: 250, textAlign: "center", pt: 2 }}
    >
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", mb: 2, color: "#2c3e50" }}
      >
        AdminIT
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              sx={{
                textAlign: "left",
                borderLeft:
                  location.pathname === item.path
                    ? "4px solid #3498db"
                    : "4px solid transparent",

                backgroundColor:
                  location.pathname === item.path
                    ? "rgba(52, 152, 219, 0.12)"
                    : "transparent",

                borderRadius: 2,
                mx: 1,
                mb: 0.5,
                px: 2,
                py: 1.2,
                transition: "all 0.2s ease",

                color: location.pathname === item.path ? "#3498db" : "#2c3e50",

                "& .MuiTypography-root": {
                  color:
                    location.pathname === item.path ? "#3498db" : "#2c3e50",
                  transition: "color 0.2s ease",
                },

                "&:hover": {
                  backgroundColor: "rgba(52, 152, 219, 0.08)",
                  transform: "translateX(4px)",
                  color: "#3498db",
                },

                "&:hover .MuiTypography-root": {
                  color: "#3498db",
                },
              }}
            >
              <Box sx={{ mr: 2, display: "flex", alignItems: "center" }}>
                {item.icon}
              </Box>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontWeight: location.pathname === item.path ? 700 : 500,
                  color:
                    location.pathname === item.path ? "#3498db" : "#2c3e50",
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#2c3e50", mb: 4 }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src="/images/internet.jpg"
              alt="Logo"
              width="40"
              height="40"
              style={{ borderRadius: "50%", marginRight: "15px" }}
            />
            <Typography
              variant="h6"
              component={Link}
              to="/admin"
              sx={{
                fontWeight: "bold",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              AdminIT
            </Typography>
          </Box>

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 2,
              ml: 4,
              flexGrow: 1,
            }}
          >
            {navItems.map((item) => (
              <Button
                key={item.path}
                color="inherit"
                component={Link}
                to={item.path}
                sx={navButtonStyle(item.path)}
              >
                {item.icon}
                {item.label}
              </Button>
            ))}
          </Box>

          {/* Sin uso alguno por ahora*/}
          <Search sx={{ maxWidth: { xs: "160px", sm: "240px", md: "auto" } }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Buscar..."
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </Toolbar>
      </AppBar>

      {/* componenete Drawer */}
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
            width: 270,
            borderTopRightRadius: 16,
            borderBottomRightRadius: 16,
            background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default AdminNavbar;