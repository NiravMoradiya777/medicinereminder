import { Box, Container, styled, Typography } from "@mui/material";
import React from "react";
import starImg from "../../assets/Images/star.png";

const Reviews = () => {
  const CustomContainer = styled(Container)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      marginBottom: theme.spacing(4),
    },
  }));

  const CustomBox = styled(Box)(({ theme }) => ({
    [theme.breakpoints.down("md")]: {
      marginBottom: theme.spacing(4),
    },
  }));

  return (
    <Box sx={{ mt: 10, textAlign: "center" }}>
      <CustomContainer>        
        <Box>
        <CustomBox>
          <Typography
            variant="body2"
            sx={{
              color: "#7D8589",
              fontSize: "16px",
              fontWeight: "bold",
              mt: 2,
            }}
          >
            John Doe | Patient
          </Typography>
        </CustomBox>
          <img src={starImg} alt="stars" style={{ maxWidth: "100%", display: "block", marginLeft: "auto", marginRight: "auto", marginTop: "2rem" }} />
          <Typography
            variant="body2"
            sx={{
              color: "#7D8589",
              fontSize: "16px",
              fontWeight: "bold",
              mt: 2,
              maxWidth: "75%",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: "4rem",
            }}
          >
            I was constantly forgetting to take my medication, but this reminder app has been a game changer. It keeps me on track and ensures I never miss a dose.
          </Typography>
        </Box>
      </CustomContainer>
    </Box>
  );
};

export default Reviews;