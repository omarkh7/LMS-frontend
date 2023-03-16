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
import Home from "./components/Home/Home";
import Classes from "./components/Classes/Classes";
import Sections from "./components/Sections/Sections";
import ClassSection from "./components/Class-Section/ClassSection";
import Login from "./components/Auth/Login";
import CreateUser from "./components/Users/CreateUser";
import Register from "./components/Auth/Register";
import PagenotFound from "./components/Home/404 not Found/PagenotFound";
import Loader from './components/Home/Loader/Loader'


function App() {
  const [loading, setLoading] = useState(false);
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
          {isLoggedIn === "true" && <Sidebar isSidebar={isSidebar} />}
          <main className="content">
            {isLoggedIn === "true" && <Topbar setIsSidebar={setIsSidebar} />}

            { loading ? <Loader /> : <Routes> 

        <Route exact path="/*" element={<PagenotFound/>} />

        <Route
                exact
                path="/login"
                element={isLoggedIn === "true" ? <Home /> : <Login />}
              /> 
              <Route
                exact
                path="/register"
                element={isLoggedIn === "true" ? <Register /> : <Login />}
              />
              <Route
                exact
                path="/"
                element={isLoggedIn === "true" ? <Home /> : <Login />}
              />
              <Route
                exact
                path="/createuser"
                element={isLoggedIn === "true" ? <CreateUser /> : <Login />}
              />
              <Route
                exact
                path="/admin"
                element={isLoggedIn === "true" ? <Admin /> : <Login />}
              />
              <Route
                exact
                path="/teacher"
                element={isLoggedIn === "true" ? <Teacher /> : <Login />}
              />
              <Route
                exact
                path="/students"
                element={isLoggedIn === "true" ? <Students /> : <Login />}
              />
              <Route
                exact
                path="/classes"
                element={isLoggedIn === "true" ? <Classes /> : <Login />}
              />
              <Route
                exact
                path="/sections"
                element={isLoggedIn === "true" ? <Sections /> : <Login />}
              />
              <Route
                exact
                path="/class-section"
                element={isLoggedIn === "true" ? <ClassSection /> : <Login />}
              />
              <Route
                exact
                path="/bar"
                element={isLoggedIn === "true" ? <Bar /> : <Login />}
              />
              <Route
                exact
                path="/pie"
                element={isLoggedIn === "true" ? <Pie /> : <Login />}
              />
              <Route
                exact
                path="/calendar"
                element={isLoggedIn === "true" ? <Calendar /> : <Login />}
              />
            </Routes>}
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
