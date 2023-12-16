import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Calendar from '../../../theme/components/Calendar';
import PatientMediactionDetails from './PatientMediactionDetails'

const drawerWidth = 240;

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Dashboard() {

  React.useEffect(() => {
    PageIntroduction();
  }, []);

  let isPageIntroductionCalled = false;

  const PageIntroduction = () => {
    if (!isPageIntroductionCalled && localStorage.getItem("switchState") === "true") {
      const text = "This is a Caregiver Dashboard";
      const value = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(value);
      isPageIntroductionCalled = true;
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: 'auto',
            overflow: 'auto',
          }}
        >
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid marginBottom={4} item xs={12} md={12} lg={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Calendar />
                </Paper>
              </Grid>
            
            <Grid item xs={12} md={12} lg={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <PatientMediactionDetails/>
                </Paper>
              </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}