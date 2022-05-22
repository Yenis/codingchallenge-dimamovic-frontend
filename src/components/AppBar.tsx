import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import ApiIcon from '@mui/icons-material/Api';
import { useNavigate } from "react-router-dom";

const pages = ["Teams", "Projects", "Assigned", "Completed"];

const HeaderAppBar = () => {
    const navigateTo = useNavigate();

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <ApiIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="https://en.dccs.at"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img src={require("../logo.png")} style={{transform: "10%"}} alt="dccs" />
          </Typography>
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "space-around" }}>
            <Button
              onClick={() => navigateTo("/teams")}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              {pages[0]}
            </Button>
            <Button
              onClick={() => navigateTo("/project")}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              {pages[1]}
            </Button>
            <Button
              onClick={() => navigateTo("/assigned")}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              {pages[2]}
            </Button>
            <Button
              onClick={() => navigateTo("/completed")}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              {pages[3]}
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default HeaderAppBar;
