import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import HeaderAppBar from "./components/AppBar";
import Assigned from "./pages/Assigned";
import Completed from "./pages/Completed";
import Projects from "./pages/Project";
import Teams from "./pages/Teams";

const App: React.FC = () => {
  const navigateTo = useNavigate();

  useEffect(() => {
    navigateTo("/teams");
    // eslint-disable-next-line
  }, []);

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <HeaderAppBar />
      <Routes>
        <Route path="/teams" element={<Teams />}></Route>
        <Route path="/project" element={<Projects />}></Route>
        <Route path="/assigned" element={<Assigned />}></Route>
        <Route path="/completed" element={<Completed />}></Route>
      </Routes>
    </Box>
  );
};

export default App;
