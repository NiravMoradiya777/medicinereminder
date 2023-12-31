import * as React from 'react';
import axios from 'axios';
import { Box } from '@mui/material';
import Container from '@mui/material/Container';
import UserForm from './UserForm';

export default function EditProfile () {

    React.useEffect(() => {
        PageIntroduction();
      }, []);
      
    let isPageIntroductionCalled = false;

  const PageIntroduction = () => {
    if (!isPageIntroductionCalled && localStorage.getItem("switchState") === "true") {
      console.log(localStorage.getItem("switchState"))
      const text = "This is a Edit profile page, you can change your basic details here";
      const value = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(value);
      isPageIntroductionCalled = true;
    }
  };

    const handleUpdate = (obj) => {
        axios.put(process.env.REACT_APP_API_BASE_URL+'medicinereminder/userdetails/updateUser', obj).then((response) => {
            alert('Updated Successfully!');
            localStorage.removeItem('user');
            localStorage.setItem('user', JSON.stringify(response.data.updatedUserData))
        }).catch((error) => {
            alert('An error occured!');
            console.log(error);
        })
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
                <UserForm handleUpdate={handleUpdate} isRegister={false}/>
            </Box>
        </Container>
    )
}