import { Box, TextField, InputAdornment } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

const BarraBusqueda = ({ valor, alCambiar, placeholder = "Buscar..." }) => {
  return (
    <Box sx={{ mb: 3 }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder={placeholder}
        value={valor}
        onChange={alCambiar}
        sx={{ backgroundColor: 'white', borderRadius: 1 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: '#7f8c8d' }} />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default BarraBusqueda;