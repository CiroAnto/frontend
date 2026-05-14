import { Link, useLocation } from 'react-router-dom';
import { Box, Typography, AppBar, Toolbar, Button, InputBase, alpha, styled } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";


// Estilos personalizados para la barra de búsqueda
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': { backgroundColor: alpha(theme.palette.common.white, 0.25) },
  marginLeft: 'auto',
  width: 'auto',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '12ch',
    '&:focus': { width: '20ch' },
  },
}));

const AdminNavbar = () => {
    const location = useLocation();

    const navButtonStyle = (path) => ({
    color: 'inherit',
    borderBottom: location.pathname === path ? '3px solid white' : '3px solid transparent',
    borderRadius: 0,
    opacity: location.pathname === path ? 1 : 0.7, 
    '&:hover': {
      opacity: 1,
      borderBottom: location.pathname === path ? '3px solid white' : '3px solid rgba(255,255,255,0.5)'
    }
  });

  return (
    <AppBar position="static" sx={{ backgroundColor: '#2c3e50', mb: 4 }}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', mr: 4 }}>
          <img src="/images/internet.jpg" alt="Logo" width="40" height="40" style={{ borderRadius: '50%', marginRight: '15px' }} />
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            AdminIT
          </Typography>
        </Box>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
          <Button color="inherit" component={Link} to="/admin" sx={navButtonStyle('/admin')}>Home</Button>
          <Button color="inherit" component={Link} to="/admin/clientes" sx={navButtonStyle('/admin/clientes')}>Clientes</Button>
          <Button color="inherit" component={Link} to="/admin/pagos-pendientes" sx={navButtonStyle('/admin/pagos-pendientes')}>Pagos Pendientes</Button>
          <Button color="inherit" component={Link} to="/admin/pagados" sx={navButtonStyle('/admin/pagados')}>Pagados</Button>
          <Button color="inherit" component={Link} to="/admin/ajustes" sx={navButtonStyle('/admin/ajustes')}>Ajustes</Button>
        </Box>

        {/*por ver si quitar o dar uso */}
        <Search>
          <SearchIconWrapper><SearchIcon /></SearchIconWrapper>
          <StyledInputBase placeholder="Buscar..." inputProps={{ 'aria-label': 'search' }} />
        </Search>
      </Toolbar>
    </AppBar>
  );
};

export default AdminNavbar;