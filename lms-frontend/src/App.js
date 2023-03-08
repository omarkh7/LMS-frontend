import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./components/Home/Topbar";
import Sidebar from "./components/Home/Sidebar";

import Bar from "./scenes/bar";
import Pie from "./scenes/pie";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import Admin from "./components/Users/Admin/Admin";
import Students from "./components/Users/Students/Students";
import Teacher from "./components/Users/Teacher/Teacher";
import  Home  from "./components/Home/Home";
import Classes from "./components/Classes/Classes";
import Sections from "./components/Sections/Sections";
import ClassSection from "./components/Class-Section/ClassSection";
import Login from "./components/Auth/Login";
import CreateUser from "./components/Users/CreateUser";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />

            <Routes>
            <Route path="/login" element={<Login />} />

              <Route path="/" element={<Home />} />
              <Route path="/createuser" element={<CreateUser />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/teacher" element={<Teacher />} />
              <Route path="/students" element={<Students />} />
              <Route path="/classes" element= {<Classes/>} />
              <Route path="/sections" element={<Sections />} />
              <Route path="/class-section" element={<ClassSection />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/calendar" element={<Calendar />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
