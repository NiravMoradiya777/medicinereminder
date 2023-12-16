import { DialogContentText, styled, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";
import timeManagement from "../../assets/Images/time-management.png";
import confusion from "../../assets/Images/time-management.png";

const Details = () => {
  const CustomBox = styled(Box)(({ theme }) => ({
    display: "flex",
    gap: theme.spacing(10),
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      textAlign: "center",
    },
  }));

  const ImgContainer = styled(Box)(({ theme }) => ({
    width: "100%",
    [theme.breakpoints.down("md")]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  }));

  const LargeText = styled(Typography)(({ theme }) => ({
    fontSize: "64px",
    color: "#000",
    fontWeight: "700",
    [theme.breakpoints.down("md")]: {
      fontSize: "32px",
    },
  }));

  const SmallText = styled(Typography)(({ theme }) => ({
    fontSize: "18px",
    color: "#7B8087",
    fontWeight: "500",
    [theme.breakpoints.down("md")]: {
      fontSize: "14px",
    },
  }));

  const TextFlexbox = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(7),
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(0, 5, 0, 5),
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      gap: theme.spacing(5),
    },
  }));

  const Divider = styled("div")(({ theme }) => ({
    width: "13%",
    height: "5px",
    backgroundColor: "#000339",
    [theme.breakpoints.down("md")]: {
      marginLeft: "auto",
      marginRight: "auto",
    },
  }));

  return (
    <Box sx={{ py: 10 }}>

<Container>
        <CustomBox>
        <ImgContainer>
            <img src={confusion} alt="confusion" style={{ maxWidth: "60%", marginTop: "5rem", display: "block", marginLeft: "auto", marginRight: "auto" }} />
          </ImgContainer>
          <Box>
            <Divider />
            <Typography
              sx={{
                fontSize: "35px",
                color: "#000339",
                fontWeight: "700",
                my: 3,
              }}
            >
              Never miss a dose with our medication reminders
            </Typography>

            <Typography
              sx={{
                fontSize: "16px",
                color: "#5A6473",
                lineHeight: "27px",
              }}
            >
              Our easy-to-use medication reminder system ensures that you never forget to take your medication. Simply set up reminders and let us take care of the rest.
            </Typography>

            <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "left",
              }}
            >
              <Typography
              sx={{
                fontSize: "25px",
                color: "#000339",
                fontWeight: "700",
                my: 3,
              }}
            >
              Stay on track
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                color: "#5A6473",
                lineHeight: "27px",
              }}
            >
              Set up personalized medication reminders tailored to your unique schedule and needs.
            </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "left",
              }}
            >
              <Typography
              sx={{
                fontSize: "25px",
                color: "#000339",
                fontWeight: "700",
                my: 3,
              }}
            >
              Peace of mind
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                color: "#5A6473",
                lineHeight: "27px",
              }}
            >
              Never worry about missing a dose again and stay on top of your health.
            </Typography>
            </Box>
          </Box>

          </Box>

        </CustomBox>
      </Container>

      <Container style={{marginTop: "5rem", backgroundColor: "#E6F0FF", paddingTop: "4rem", paddingBottom: "4rem"}}>
        <CustomBox>

          <Box>
            <Typography
              sx={{
                fontSize: "35px",
                color: "#000339",
                fontWeight: "700",
                my: 3,
              }}
            >
              Effortlessly Manage Your Medication Schedule
            </Typography>

            <Typography
              sx={{
                fontSize: "16px",
                color: "#5A6473",
                lineHeight: "27px",
              }}
            >
              Our platform simplifies the management of complex medication schedules, ensuring you never miss a dose. With intuitive features and personalized reminders, staying on track with your medication has never been easier.
            </Typography>
          </Box>

          <ImgContainer>
            <img src={timeManagement} alt="timeManagement" style={{ maxWidth: "60%", marginTop: "5rem", display: "block", marginLeft: "auto", marginRight: "auto" }} />
          </ImgContainer>

        </CustomBox>
      </Container>

    </Box>
  );
};

export default Details;