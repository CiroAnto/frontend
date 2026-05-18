import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Button, TextField, Link, Box, Typography, Container, Card, CardContent, CircularProgress, Alert, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import { loginAdmin } from '@/services/authService';

const Login = () => {
  //estados de todo
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  // hook de navegacion
  const navigate = useNavigate();

  //login
  const procesarLogin = async (e) => {
    e.preventDefault();
    setCargando(true);
    setError(null);

    try {
      const usuario = await loginAdmin({ username, password});
      
      // --- ¡AQUÍ ESTÁ LA MAGIA! Guardamos los datos completos ---
      localStorage.setItem('sesionActiva', 'true'); 
      localStorage.setItem('username', usuario.username); // Guardamos el Folio o nombre de admin
      if (usuario.token) {
         localStorage.setItem('auth_token', usuario.token); // Guardamos el token real
      }

      if(usuario.role === 'admin') {
        navigate('/admin', { replace: true });
      }else{
        navigate('/cliente', { replace: true });
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Error en el login. Intenta de nuevo.');
      setPassword('');
    }finally{
      setCargando(false);
    }
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    //fondo
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        background: `linear-gradient(to bottom, #f9fafb 0%, #f9fafb 50%, #213153 50%, #213153 100%)`, // Fondo dividido
        fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      }}
    >
      <Container maxWidth="xs" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1, padding: '20px' }}>
        
        {/*card blanca*/}
        <Card elevation={10} style={{ borderRadius: '15px', padding: '20px' }}>
          <CardContent>
            
            {/*logo*/}
            <Box style={{ textAlign: 'center', marginBottom: '20px' }}>
              <img src="/images/internet.jpg" alt="Logo de la empresa" width="70" height="70" style={{ borderRadius: '50%' }} />
            </Box>

            {/*titulos*/}
            <Typography variant="h5" component="h1" gutterBottom style={{ color: '#333', textAlign: 'center', fontWeight: 'bold' }}>
              Inicia Sesión
            </Typography>
            <Typography variant="subtitle1" style={{ color: '#666', textAlign: 'center', marginBottom: '30px' }}>
              Ingresa con tu cuenta de Internet TECHNOLOGY
            </Typography>

            {/* alert error*/}
            {error && (
              <Alert severity="error" style={{ marginBottom: '20px', borderRadius: '8px' }}>
                {error}
              </Alert>
            )}

            {/*formulario*/}
            <form onSubmit={procesarLogin}>
              
              <TextField id="username" label="Usuario o Folio de Cliente" type="text" variant="outlined" fullWidth margin="normal" required value={username}
                onChange={(e) => setUsername(e.target.value)} disabled={cargando} style={{ marginBottom: '20px' }}
                helperText="Clientes: Usa tu folio como usuario y tu telefono como contraseña"
              />

              <TextField id="password" label="Contraseña" type={showPassword ? 'text' : 'password'} variant="outlined" fullWidth margin="normal"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={cargando}
                style={{ marginBottom: '15px' }}
                InputProps={{ // Icono de ojo
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Box style={{ textAlign: 'center', marginBottom: '25px' }}>
                <Link href="#" variant="body2" style={{ color: '#7f8c8d', textDecoration: 'none', fontWeight: '600' }}>
                  ¿Olvidé mi contraseña?
                </Link>
              </Box>

              <Button type="submit" fullWidth variant="contained" color="primary"
                style={{ padding: '12px', fontSize: '1rem', fontWeight: 'bold', textTransform: 'none', borderRadius: '8px', backgroundColor: '#3498db' }}
                disabled={cargando}
              >
                {cargando ? <CircularProgress size={24} color="inherit" /> : 'Iniciar Sesión'}
              </Button>
            </form>

            <Box style={{ textAlign: 'center', marginTop: '25px' }}>
              <Typography variant="body2" style={{ color: '#666', marginBottom: '5px' }}>
                ¿Eres nuevo en Internet TECHNOLOGY?
              </Typography>
              <Typography variant="body2">
                Ve a <Link href="#" style={{ color: '#3498db', textDecoration: 'none', fontWeight: '600' }}>tecnologico.mx/registro</Link> para crear tu cuenta
              </Typography>
            </Box>

            <Box style={{ textAlign: 'center', marginTop: '20px' }}>
              <Link component={RouterLink} to="/" variant="body2" style={{ color: '#7f8c8d', textDecoration: 'none', fontSize: '14px' }}>
                Volver a la página principal
              </Link>
            </Box>

          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Login;