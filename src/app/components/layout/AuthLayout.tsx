import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { CheckBox } from "@mui/icons-material";

const AuthLayout = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        overflow: "hidden",
        backgroundSize: "100%",
        backgroundRepeat: "no-repeat",
        backgroundImage: "url('/images/auth/auth_background.svg')",
      }}
    >
      <Box
        sx={{
          width: "90%",
          height: "auto",
          maxWidth: "630px",
          backgroundColor: "#FFFFFF",
          borderRadius: "24px",
          minHeight: "300px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: { xs: 3, md: 5 },
          minHeight: { xs: "680px", md: "735px" },
          overflow: "auto",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default AuthLayout;
