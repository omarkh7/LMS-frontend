import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "../Header";
import BarChart from "../BarChart";
import StatBox from "../StatBox";
import "./Home.css";
import axios from "axios";
import { useState, useEffect } from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import ClassOutlinedIcon from "@mui/icons-material/ClassOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";

const Home = () => {
  const [currentEvents, setCurrentEvents] = useState([]);
  const [alldata, setAllData] = useState([]);
  const [allclassesdata, setClassesData] = useState([]);
  const [allsectiondata, setSectionsData] = useState([]);


  const isAdmin = localStorage.getItem("role") === "1";
  const role = isAdmin ? "admin" : "teacher";
  console.log("isAdmin ",isAdmin);



  const apiUserURL = "http://localhost:8000/api/users";
  const apiClassesURL = "http://localhost:8000/api/classes";
  const apiSectionsURL = "http://localhost:8000/api/sections";

  //USERS
  const fetchallUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(apiUserURL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("fetch data ", response.data);
      console.log(response.data)
      setAllData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  //CLASSES

  const fetchallClassesData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(apiClassesURL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("fetch data ", response.data);
      setClassesData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  //SECTIONS
  const fetchallSectionsData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(apiSectionsURL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("fetch data ", response.data);
      setSectionsData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchallUserData();
    fetchallClassesData();
    fetchallSectionsData();
  }, []);

  const handleDateClick = (selected) => {
    const title = prompt("Please enter a new title for your event");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        id: `${selected.dateStr}-${title}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
      });
    }
  };

  const handleEventClick = (selected) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    ) {
      selected.event.remove();
    }
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const teacherData = alldata.filter((info) => info.role === 2);
  const StudentData = alldata.filter((info) => info.role === 3);
  const adminData = alldata.filter((info) => info.role === 1);

  const ClassesData = allclassesdata;
  const SectionData = allsectiondata;

  console.log("Teachers", teacherData.length);
  console.log("Students", StudentData.length);
  console.log("Classes", ClassesData.length);
  console.log("Sections", SectionData.length);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle={(teacherData.userName) || (adminData.userName)} />

   
      </Box>

      {/* GRID & CHARTS */}

      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        {role === "admin" ? (
  <>
    <Box
      gridColumn="span 3"
      backgroundColor={colors.primary[400]}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <StatBox
        title={teacherData.length}
        subtitle="Teachers"
        progress={teacherData.length * 0.01}
        icon={
          <ContactsOutlinedIcon
            sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
          />
        }
      />
    </Box>
    <Box
      gridColumn="span 3"
      backgroundColor={colors.primary[400]}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <StatBox
        title={StudentData.length}
        subtitle="Students"
        progress={StudentData.length * 0.01}
        icon={
          <GroupsOutlinedIcon
            sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
          />
        }
      />
    </Box>
    <Box
      gridColumn="span 3"
      backgroundColor={colors.primary[400]}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <StatBox
        title={ClassesData.length}
        subtitle="Classes"
        progress={ClassesData.length * 0.01}
        icon={
          <ClassOutlinedIcon
            sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
          />
        }
      />
    </Box>
    <Box
      gridColumn="span 3"
      backgroundColor={colors.primary[400]}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <StatBox
        title={SectionData.length}
        subtitle="Sections"
        progress={SectionData.length * 0.01}
        icon={
          <SchoolOutlinedIcon
            sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
          />
        }
      />
    </Box>
  </>
) : (
  <>
    <Box
      gridColumn="span 4"
      backgroundColor={colors.primary[400]}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <StatBox
        title={StudentData.length}
        subtitle="Students"
        progress={StudentData.length * 0.01}
        icon={
          <GroupsOutlinedIcon
            sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
          />
        }
      />
    </Box>
    <Box
      gridColumn="span 4"
      backgroundColor={colors.primary[400]}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <StatBox
        title={ClassesData.length}
        subtitle="Classes"
        progress={ClassesData.length * 0.01}
        icon={
          <ClassOutlinedIcon
            sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
          />
        }
      />
    </Box>
    <Box
      gridColumn="span 4"
      backgroundColor={colors.primary[400]}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <StatBox
        title={SectionData.length}
        subtitle="Sections"
        progress={SectionData.length * 0.01}
        icon={
          <SchoolOutlinedIcon
            sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
            />
          }
        />
      </Box>
      </>
)}
   
        {/* ROW 2 */}
        <Box
          gridColumn="span 6"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
        >
          <Box mt="25px" p="0 30px">
            <FullCalendar
              height="45vh"
              plugins={[
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin,
                listPlugin,
              ]}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
              }}
              initialView="dayGridMonth"
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              select={handleDateClick}
              eventClick={handleEventClick}
              eventsSet={(events) => setCurrentEvents(events)}
              initialEvents={[
                {
                  id: "12315",
                  title: "All-day event",
                  date: "2022-09-14",
                },
                {
                  id: "5123",
                  title: "Timed event",
                  date: "2022-09-28",
                },
              ]}
            />
          </Box>
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 6"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Attendance{" "}
          </Typography>
          <Box height="400px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
