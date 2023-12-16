
import * as React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import dayjs from 'dayjs';

// ... other imports

export default function UserForm(props) {
    const [fname, setFirstName] = React.useState('');
    const [lname, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [bdate, setBirthDate] = React.useState(null);
    const [password, setPassword] = React.useState('');
    const [cpassword, setConfirmPassword] = React.useState('');
    const [userType, setUserType] = React.useState('');
    const [isListeningFirstName, setIsListeningFirstName] = React.useState(false);
    const [isListeningLastName, setIsListeningLastName] = React.useState(false);
    const [isListeningEmail, setIsListeningEmail] = React.useState(false);
    const [isListeningPhone, setIsListeningPhone] = React.useState(false);
    const [isListeningPassword, setIsListeningPassword] = React.useState(false);
    const [isListeningConfirmPassword, setIsListeningConfirmPassword] = React.useState(false);
    const [isListeningUserType, setIsListeningUserType] = React.useState(false);
  
    const handleVoiceInput = (stateUpdater, setIsListeningState) => {
      const recognition = new window.webkitSpeechRecognition();
  
      recognition.onstart = () => {
        setIsListeningState(true);
      };
  
      recognition.onresult = function (event) {
        setIsListeningState(false);
  
        if (event.results.length > 0) {
          const voiceInput = event.results[0][0].transcript;
          stateUpdater(voiceInput);
        }
      };
  
      recognition.start();
    };
  
    React.useEffect(() => {
        const curUser = JSON.parse(localStorage.getItem('user'));
        // console.log(curUser);
        if(curUser != null){
            setFirstName(curUser.fname);
            setLastName(curUser.lname);
            setEmail(curUser.email);
            setPhone(curUser.phone);
            setBirthDate(dayjs(curUser.dob));
        }
    }, [])

    const handleUserTypeChange = (event) => {
      setUserType(event.target.value);
    };

    const submitForm = () => {
        const formattedDate = bdate ? bdate.format() : null;

        props.submitForm({
            fname: fname,
            lname: lname,
            email: email,
            phone: phone,
            dob: formattedDate,
            password: password,
            userType:userType,
        });
    }

    const handleUpdate = () => {
      props.handleUpdate({
        fname: fname,
        lname: lname,
        email: email,
        phone: phone,
        dob: bdate ? bdate.format() : '',
      });
    };
  
    return (
      <React.Fragment>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First name"
              value={fname}
              onChange={(event) => setFirstName(event.target.value)}
              fullWidth
              autoComplete="given-name"
            />
            <Button
              type="button"
              onClick={() => handleVoiceInput(setFirstName, setIsListeningFirstName)}
              variant="contained"
              sx={{
                mt: 1,
                mb: 2,
                transition: 'background-color 0.3s',
                backgroundColor: isListeningFirstName ? '#4caf50' : '',
                animation: isListeningFirstName ? '$pulse 1s infinite' : 'none',
              }}
            >
              🎤
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last name"
              value={lname}
              onChange={(event) => setLastName(event.target.value)}
              fullWidth
              autoComplete="family-name"
            />
            <Button
              type="button"
              onClick={() => handleVoiceInput(setLastName, setIsListeningLastName)}
              variant="contained"
              sx={{
                mt: 1,
                mb: 2,
                transition: 'background-color 0.3s',
                backgroundColor: isListeningLastName ? '#4caf50' : '',
                animation: isListeningLastName ? '$pulse 1s infinite' : 'none',
              }}
            >
              🎤
            </Button>
          </Grid>
          {/* Repeat the pattern for other text fields */}
          <Grid item xs={12}>
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              fullWidth
              autoComplete="shipping address-line1"
            />
            <Button
              type="button"
              onClick={() => handleVoiceInput(setEmail, setIsListeningEmail)}
              variant="contained"
              sx={{
                mt: 1,
                mb: 2,
                transition: 'background-color 0.3s',
                backgroundColor: isListeningEmail ? '#4caf50' : '',
                animation: isListeningEmail ? '$pulse 1s infinite' : 'none',
              }}
            >
              🎤
            </Button>
          </Grid>
          {/* <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>User Role</InputLabel>
              <Select
                value={userType}
                onChange={(event) => setUserType(event.target.value)}
              >
                <MenuItem value="Doctor">Doctor</MenuItem>
                <MenuItem value="Patient">Patient</MenuItem>
                <MenuItem value="Caregiver">Caregiver</MenuItem>
              </Select>
            </FormControl>
            <Button
              type="button"
              onClick={() => handleVoiceInput(setUserType, setIsListeningUserType)}
              variant="contained"
              sx={{
                mt: 1,
                mb: 2,
                transition: 'background-color 0.3s',
                backgroundColor: isListeningUserType ? '#4caf50' : '',
                animation: isListeningUserType ? '$pulse 1s infinite' : 'none',
              }}
            >
              🎤
            </Button>
          </Grid> */}
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="phone"
              name="phone"
              label="Phone"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              fullWidth
              autoComplete="shipping address-line2"
            />
            <Button
              type="button"
              onClick={() => handleVoiceInput(setPhone, setIsListeningPhone)}
              variant="contained"
              sx={{
                mt: 1,
                mb: 2,
                transition: 'background-color 0.3s',
                backgroundColor: isListeningPhone ? '#4caf50' : '',
                animation: isListeningPhone ? '$pulse 1s infinite' : 'none',
              }}
            >
              🎤
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} style={{ paddingTop: '17px' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs} style={{ minWidth: '180px' }}>
              <DemoContainer components={['DatePicker', 'DatePicker']}>
                <DatePicker
                  label="Date of Birth"
                  value={bdate}
                  onChange={(newValue) => setBirthDate(newValue)}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
          {props.isRegister === true ? (
            <React.Fragment>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="password"
                  name="password"
                  type="password"
                  label="Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  fullWidth
                  autoComplete="shipping address-level2"
                />
                <Grid item xs={12} sm={6}>
                <Button
                  type="button"
                  onClick={() => handleVoiceInput(setPassword, setIsListeningPassword)}
                  variant="contained"
                  sx={{
                    mt: 1,
                    mb: 2,
                    transition: 'background-color 0.3s',
                    backgroundColor: isListeningPassword ? '#4caf50' : '',
                    animation: isListeningPassword ? '$pulse 1s infinite' : 'none',
                  }}
                >
                  🎤
                </Button>
              </Grid>
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="cpassword"
                  name="cpassword"
                  label="Confirm Password"
                  type="password"
                  value={cpassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  fullWidth
                />
                <Button
                  type="button"
                  onClick={() => handleVoiceInput(setConfirmPassword, setIsListeningConfirmPassword)}
                  variant="contained"
                  sx={{
                    mt: 1,
                    mb: 2,
                    transition: 'background-color 0.3s',
                    backgroundColor: isListeningConfirmPassword ? '#4caf50' : '',
                    animation: isListeningConfirmPassword ? '$pulse 1s infinite' : 'none',
                  }}
                >
                  🎤
                </Button>
              </Grid>
                <Grid item xs={12}>
                <FormControl fullWidth>
                    <InputLabel required>User Type</InputLabel>
                    <Select
                    required
                    value={userType}
                    onChange={handleUserTypeChange}
                    label="User Type"
                    >
                    <MenuItem value="Doctor">Doctor</MenuItem>
                    <MenuItem value="Patient">Patient</MenuItem>
                    <MenuItem value="Caregiver">Caregiver</MenuItem>
                    </Select>
                </FormControl>
                </Grid>
              
            </React.Fragment>
          ) : ''}
        </Grid>
        {props.isRegister === true ? (
          <Button
            type="submit"
            fullWidth
            onClick={submitForm}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
        ) : (
          <Button
            type="submit"
            onClick={handleUpdate}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Update
          </Button>
        )}
      </React.Fragment>
    );
  }
  