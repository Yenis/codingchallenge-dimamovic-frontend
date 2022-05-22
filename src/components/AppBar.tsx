import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import ApiIcon from "@mui/icons-material/Api";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";
import { useTeamsAndProjects } from "../helpers/customHooks/teamsAndProjectsHook";

const pages = ["Teams", "Projects", "Assigned", "Completed"];

const infoMessage = `
This simple Front-end App is used to test the API 
I have bult as a coding challenge for 
DCCS IT Business Solutions Office in Tuzla.
Please refer to the Readme.md for info about the API.`;

const dccsLink = "https://en.dccs.at";

const HeaderAppBar: React.FC = () => {
  const navigateTo = useNavigate();

  const { currentTeamsProjects } = useTeamsAndProjects();

  const [anchorElTeams, setAnchorElTeams] = React.useState<null | HTMLElement>(
    null
  );

  const [anchorElProjects, setAnchorElProjects] =
    React.useState<null | HTMLElement>(null);

  const handleOpenTeamsMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElTeams(event.currentTarget);
  };

  const handleOpenProjectsMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElProjects(event.currentTarget);
  };

  const handleCloseTeamsMenu = () => {
    setAnchorElTeams(null);
  };

  const handleCloseProjectsMenu = () => {
    setAnchorElProjects(null);
  };

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Tooltip title={infoMessage}>
            <ApiIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          </Tooltip>
          <Tooltip title={dccsLink}>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href={dccsLink}
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
              <img
                src={require("../logo.png")}
                style={{ transform: "10%" }}
                alt="dccs"
              />
            </Typography>
          </Tooltip>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Button
                onClick={() => navigateTo("/teams")}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {pages[0]}
              </Button>
              {currentTeamsProjects.teams.length ? (
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="View Teams">
                    <IconButton onClick={handleOpenTeamsMenu} sx={{ p: 0 }}>
                      <ArrowDropDownIcon sx={{ color: "white" }} />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElTeams}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElTeams)}
                    onClose={handleCloseTeamsMenu}
                  >
                    {currentTeamsProjects.teams.map((team) => (
                      <MenuItem key={team.id}>
                        <Typography textAlign="center">
                          ID: {team.id} Devs: {team.developers}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              ) : (
                <Tooltip title="View Teams">
                  <ArrowDropDownIcon color="disabled" />
                </Tooltip>
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Button
                onClick={() => navigateTo("/project")}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {pages[1]}
              </Button>
              {currentTeamsProjects.projects.length ? (
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="View Projects">
                    <IconButton onClick={handleOpenProjectsMenu} sx={{ p: 0 }}>
                      <ArrowDropDownIcon sx={{ color: "white" }} />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElProjects}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElProjects)}
                    onClose={handleCloseProjectsMenu}
                  >
                    {currentTeamsProjects.projects.map((project) => (
                      <MenuItem key={project.id}>
                        <Typography textAlign="center">
                          ID: {project.id} Req_Devs: {project.devs_needed}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              ) : (
                <Tooltip title="View Projects">
                  <ArrowDropDownIcon color="disabled" />
                </Tooltip>
              )}
            </Box>
            <Box>
              <Button
                onClick={() => navigateTo("/assigned")}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {pages[2]}
              </Button>
            </Box>
            <Box>
              <Button
                onClick={() => navigateTo("/completed")}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {pages[3]}
              </Button>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default HeaderAppBar;
