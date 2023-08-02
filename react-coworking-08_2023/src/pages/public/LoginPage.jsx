import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { RoleUserCheck } from '../../components/admin/RoleUserCheck';

const LoginPage = () =>{
    const navigate = useNavigate()
    const [error400, setError400] = useState(null)
    const handleSubmitLogIn = async (event) => {
        event.preventDefault();
        const username = event.target.username.value
        const password = event.target.password.value
        const myLogin = await fetch('http://localhost:3001/api/users/login',
            {
                method : "POST",
                headers : {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  username,
                  password,
                })
              })
            if(myLogin.status === 200) {
                const responsJsonLogin = await myLogin.json()
                const myjwt = responsJsonLogin.data
                Cookies.set("session", myjwt)
              }
                  // Callback function to handle data received from the
                //child component
                  
              const myUserRole = await RoleUserCheck()
              if(myUserRole === 3 || myUserRole === 2) {navigate('/admin/dashboard')} else { navigate ('/')}


            if(myLogin.status === 404) {
              setError400(`Les identifiants sont incorrect, veuillez réessayer`)
              }
            else{
              // ERROR SERVER
              }
        };


    return (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmitLogIn} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="username"
                name="username"
                autoComplete="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="mot de passe"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              {error400 && <h3>{error400}</h3>}
              <Grid container>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Pas encore de compte ? inscrivez-vous"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
    );
}

export default LoginPage