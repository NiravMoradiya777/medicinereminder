import * as React from 'react';
import axios from 'axios';
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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Register from './Register';
import { useNavigate } from "react-router-dom"; 

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="">
        Medicine Reminder
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn(props) {
  const navigate = useNavigate();
  const [isLogin, setLogin] = React.useState(true);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isListening, setIsListening] = React.useState(false);

  React.useEffect(() => {
    PageIntroduction();
  }, []);

  let isPageIntroductionCalled = false;

  const PageIntroduction = () => {
    if (!isPageIntroductionCalled && localStorage.getItem("switchState") === "true") {
      const text = "This is a Login page, please provide your login credentials to sign in";
      const value = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(value);
      isPageIntroductionCalled = true;
    }
  };

  const handleSubmit = async () => {
    const obj = {
      email: email,
      password: password
    }
    try {
      const response = await axios.post(process.env.REACT_APP_API_BASE_URL + 'medicinereminder/userdetails/signin', obj);
      if (response && response.data) {
        console.log(response);
        if (response.data.userLogin === false) {
          alert(response.data.message)
        } else {
          console.log("RESPONSE IS--->", response)
          const user = JSON.stringify(response.data.userData);
          localStorage.setItem('user', user)
          console.log(response.data.userData.userType);
          if (response.data.userData.userType === "Patient") {
            navigate("/patient/dashboard")
          } else if (response.data.userData.userType === "Caregiver") {
            navigate("/caregiver/dashboard")
          } else {
            navigate("/home")
          }
        }
      } else {
        console.log("No response from the server");
      }
    } catch (error) {
      if (error && error.response && error.response.data) {
        alert(error.response.data.message);
      } else {
        console.log(error);
      }
    }
  };

  const handleEmailVoiceInput = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = function (event) {
      setIsListening(false);

      if (event.results.length > 0) {
        const voiceInput = event.results[0][0].transcript;
        const words = voiceInput.split(' ');
        setEmail(words[0]);
      }
    };

    recognition.start();
  };

  const handlePasswordVoiceInput = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = function (event) {
      setIsListening(false);

      if (event.results.length > 0) {
        const voiceInput = event.results[0][0].transcript;
        const words = voiceInput.split(' ');
        setPassword(words[0]);
      }
    };

    recognition.start();
  };

  return (
    isLogin ? (
      <ThemeProvider theme={theme}>
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
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                value={email}
                onChange={(event) => { setEmail(event.target.value) }}
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <Button
                type="button"
                onClick={handleEmailVoiceInput}
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  transition: 'background-color 0.3s',
                  backgroundColor: isListening ? '#4caf50' : '',
                  animation: isListening ? '$pulse 1s infinite' : 'none',
                }}
              >
                🎤 Email
              </Button>
              <TextField
                margin="normal"
                required
                fullWidth
                value={password}
                onChange={(event) => { setPassword(event.target.value) }}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="button"
                onClick={handlePasswordVoiceInput}
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  transition: 'background-color 0.3s',
                  backgroundColor: isListening ? '#4caf50' : '',
                  animation: isListening ? '$pulse 1s infinite' : 'none',
                }}
              >
                🎤 Password
              </Button>
              <Button
                type="submit"
                onClick={handleSubmit}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link style={{ cursor: 'pointer' }} onClick={() => { setLogin(false) }} variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    ) : (
      <Register setLogin={() => setLogin(true)} />
    )
  );
}
