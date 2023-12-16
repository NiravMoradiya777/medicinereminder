import React from "react";
import { Box, Button, styled, Typography } from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

import signUp from "../../assets/Images/signUp.png";
import calendar from "../../assets/Images/calendar.png";
import reminder from "../../assets/Images/reminder.png";

import CustomButton from "../../theme/components/CustomButton";

const Guide = () => {
  const CustomBox = styled(Box)(({ theme }) => ({
    width: "30%",
    [theme.breakpoints.down("md")]: {
      width: "85%",
    },
  }));

  const GuidesBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-around",
    width: "85%",
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: "0",
      flexDirection: "column",
    },
  }));

  const GuideBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(2, 0, 2, 0),
    },
  }));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "5%",
          height: "5px",
          backgroundColor: "#000339",
          margin: "0 auto",
        }}
      ></div>

      <Typography
        variant="h3"
        sx={{ fontSize: "35px", fontWeight: "bold", color: "#000339", my: 3 }}
      >
        How it works?
      </Typography>

      <GuidesBox>
        <GuideBox sx={{ mx: 2, textAlign: "center" }}>
          <img src={signUp} alt="signUp" style={{maxWidth: "30%"}} />
          <Typography
            variant="body2"
            sx={{
              fontWeight: "500",
              fontSize: "20px",
              color: "#3B3c45",
              my: 1,
            }}
          >
            User Registration and Profile Setup
          </Typography>
          <CustomBox>
            <Typography
              variant="body2"
              sx={{
                fontSize: "16px",
                fontWeight: "500",
                color: "#5A6473",
              }}
            >
              Users register and create personalized profiles.
            </Typography>
          </CustomBox>
        </GuideBox>

        <GuideBox sx={{ mx: 2, textAlign: "center" }}>
          <img src={calendar} alt="calendar" style={{maxWidth: "30%"}} />
          <Typography
            variant="body2"
            sx={{
              fontWeight: "500",
              fontSize: "20px",
              color: "#3B3c45",
              my: 1,
            }}
          >
            Medication Management and Scheduling
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontSize: "16px",
              fontWeight: "500",
              color: "#5A6473",
              textAlign: "center",
            }}
          >
            Users add medication details, dosage, frequency.
          </Typography> 
        </GuideBox>

        <GuideBox sx={{ mx: 2, textAlign: "center" }}>
          <img src={reminder} alt="reminder" style={{maxWidth: "30%"}} />
          <Typography
            variant="body2"
            sx={{
              fontWeight: "500",
              fontSize: "20px",
              color: "#3B3c45",
              my: 1,
            }}
          >
            Medication Reminders and Monitoring
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontSize: "16px",
              fontWeight: "500",
              color: "#5A6473",
              textAlign: "center",
            }}
          >
            The app sends timely reminders to users.
          </Typography> 
        </GuideBox>
      </GuidesBox>
    </Box>
  );
};

export default Guide;