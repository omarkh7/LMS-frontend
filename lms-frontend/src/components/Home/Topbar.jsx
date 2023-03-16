import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { Link } from "react-router-dom";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

const Topbar = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  
  const logOut = () => {
    window.localStorage.clear();
    window.location.reload(true);

  };
  return (
    <>
{/* ICONS */}
<Box display="flex">
  <IconButton onClick={colorMode.toggleColorMode}>
    {theme.palette.mode === "dark" ? (
      <DarkModeOutlinedIcon />
    ) : (
      <LightModeOutlinedIcon />
    )}
  </IconButton>
  <Link to="/login">
  <IconButton onClick={logOut} >
    <PersonOutlinedIcon/>
  </IconButton>
  </Link>
</Box>
    </>

  );
};

export default Topbar;
