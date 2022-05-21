import React from "react";
import { Routes, Route } from "react-router-dom";
import HeaderAppBar from "./components/AppBar";
import Assigned from "./pages/Assigned";
import Completed from "./pages/Completed";
import Projects from "./pages/Project";
import Teams from "./pages/Teams";

const App: React.FC = () => {
  return (
    <>
      <HeaderAppBar />
      <Routes>
        <Route path="/teams" element={<Teams />}></Route>
        <Route path="/project" element={<Projects />}></Route>
        <Route path="/assigned" element={<Assigned />}></Route>
        <Route path="/completed" element={<Completed />}></Route>
      </Routes>
    </>
  );
};

export default App;
