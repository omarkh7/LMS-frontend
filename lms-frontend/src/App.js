import { useState, useEffect } from "react";
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
import Register from "./components/Auth/Register";
function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(
    window.localStorage.getItem("loggedIn")
  );

  useEffect(() => {
    setIsLoggedIn(window.localStorage.getItem("loggedIn"));
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {isLoggedIn === "true" &&  < Sidebar isSidebar={isSidebar} />}
          <main className="content">
          {isLoggedIn === "true" &&  <Topbar setIsSidebar={setIsSidebar} />}

            

            <Routes>
            <Route path="/login status={isLoggedIn}" element={<Login status={isLoggedIn} />} />
            <Route  exact path="/register" element={isLoggedIn === "true" ? <Register /> : <Login status={isLoggedIn} /> }/>
        <Route  exact path="/" element={isLoggedIn === "true" ? <Home /> : <Login status={isLoggedIn} />} />
        <Route  exact path="/createuser" element={isLoggedIn === "true" ? < CreateUser/> : <Login status={isLoggedIn} />} />
        <Route  exact path="/admin" element={isLoggedIn === "true" ? <Admin /> : <Login status={isLoggedIn} />} />
        <Route  exact path="/teacher" element={isLoggedIn === "true" ? <Teacher /> : <Login status={isLoggedIn} />} />
        <Route  exact path="/students" element={isLoggedIn === "true" ? < Students /> : <Login status={isLoggedIn} />} />
        <Route  exact path="/classes" element={isLoggedIn === "true" ? <Classes /> : <Login status={isLoggedIn} />} />
        <Route  exact path="/sections" element={isLoggedIn === "true" ? < Sections /> : <Login status={isLoggedIn} />} />
        <Route  exact path="/class-section" element={isLoggedIn === "true" ? <ClassSection /> : <Login status={isLoggedIn} />} />
        <Route  exact path="/bar" element={isLoggedIn === "true" ? <Bar /> : <Login status={isLoggedIn} />} />
        <Route  exact path="/pie" element={isLoggedIn === "true" ? <Pie /> : <Login status={isLoggedIn} />} />
        <Route  exact path="/calendar" element={isLoggedIn === "true" ? <Calendar /> : <Login status={isLoggedIn} />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
