import { Box, Button, styled, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";

import heroImg from "../../assets/Images/medicinReminderWeb.png";
import CustomButton from "../../theme/components/CustomButton";

const HeroSection = () => {
  const CustomBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    gap: theme.spacing(5),
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    },
  }));

  const Title = styled(Typography)(({ theme }) => ({
    fontSize: "64px",
    color: "#000336",
    fontWeight: "bold",
    margin: theme.spacing(4, 0, 4, 0),
    [theme.breakpoints.down("sm")]: {
      fontSize: "40px",
    },
  }));

  return (
    <Box sx={{ backgroundColor: "#E6F0FF", minHeight: "80vh" }}>
      <Container>
        <CustomBox>
          <Box sx={{ flex: "1", textAlign: "center" }}>
            <Typography
              variant="body2"
              sx={{
                fontSize: "18px",
                color: "#687690",
                fontWeight: "500",
                mt: 10,
                mb: 4,
              }}
            >
              Welcome to Medication Reminder
            </Typography>
            <Title variant="h1">
            Never miss a dose with our <br/> medication reminder
            </Title>
            <Typography
              variant="body2"
              sx={{ fontSize: "18px", color: "#5A6473", my: 4 }}
            >
              Our platform helps you stay on track with your medication schedule, ensuring better health outcomes.
            </Typography>

            <CustomButton
              backgroundColor="#0F1B4C"
              color="#fff"
              buttonText="Sign Up"
              heroBtn={true}
              href="/login"
            />
          </Box>
        </CustomBox>
        <Box sx={{ flex: "1.25", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <img
              src={heroImg}
              alt="heroImg"
              style={{ maxWidth: "100%", marginBottom: "2rem" }}
            />
          </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;