
import * as React from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import UserForm from './UserForm';

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

export default function SignUp(props) {

  React.useEffect(() => {
    PageIntroduction();
  }, []);

  let isPageIntroductionCalled = false;

  const PageIntroduction = () => {
    if (!isPageIntroductionCalled && localStorage.getItem("switchState") === "true") {
      console.log(localStorage.getItem("switchState"))
      const text = "This is a Signup page, please provide your basic details to register your self";
      const value = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(value);
      isPageIntroductionCalled = true;
    }
  };

  const handleSubmit = (obj) => {
    // Validate if any field is empty
    for (const key in obj) {
      if (!obj[key]) {
          alert(`Please fill in all fields. ${key} cannot be empty.`);
          return; // Stop the submission if any field is empty
      }
    }
    
    // if (!obj.fname || !obj.lname || !obj.email || !obj.phone || !obj.bdate || !obj.userType || (props.isRegister && (!obj.password || !obj.cpassword))) {
    //   alert('Please fill in all required fields.');
    //   return;
    // }

    // All fields are filled, proceed with the API call
    console.log(obj);
    
    axios.post(process.env.REACT_APP_API_BASE_URL+'medicinereminder/userdetails/registerUser', obj).then((response) => {
        if(response.data.userRegister) {
         alert('Registration successful!');
         props.setLogin()
        }else{
          alert(response.data.message);
        }
    }).catch((error) => {
        alert('An error occured!');
        console.log(error);
    })
  };

  return (
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
          {/* <img src="logo-nobg.svg" alt="Logo" className="logo" /> */}
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box noValidate sx={{ mt: 3 }}>
            <Grid container>
                <UserForm submitForm={handleSubmit} isRegister={true}/>
            </Grid>
            
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link style={{cursor: 'pointer'}} variant="body2" onClick={props.setLogin}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}