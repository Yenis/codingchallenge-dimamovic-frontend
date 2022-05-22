import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import HeaderAppBar from "./components/AppBar";
import { useTeamsAndProjects } from "./helpers/customHooks/teamsAndProjectsHook";
import AssignedPage from "./pages/Assigned";
import CompletedPage from "./pages/Completed";
import ProjectsPage from "./pages/Project";
import TeamsPage from "./pages/Teams";

const App: React.FC = () => {
  const { TeamsAndProjectsProvider } = useTeamsAndProjects();

  const navigateTo = useNavigate();

  useEffect(() => {
    navigateTo("/teams");
    // eslint-disable-next-line
  }, []);

  return (
    <TeamsAndProjectsProvider>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <HeaderAppBar />
        <Routes>
          <Route path="/teams" element={<TeamsPage />}></Route>
          <Route path="/project" element={<ProjectsPage />}></Route>
          <Route path="/assigned" element={<AssignedPage />}></Route>
          <Route path="/completed" element={<CompletedPage />}></Route>
        </Routes>
      </Box>
    </TeamsAndProjectsProvider>
  );
};

export default App;
