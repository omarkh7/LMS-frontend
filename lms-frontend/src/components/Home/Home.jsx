import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../Header";
import BarChart from "../BarChart";
import StatBox from "../StatBox";
import ProgressCircle from "../ProgressCircle";
import Calendar from "../../scenes/calendar/calendar";

import { useState } from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";

const Home = () => {
	const [currentEvents, setCurrentEvents] = useState([]);

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

	return (
		<Box m="20px">
			{/* HEADER */}
			<Box display="flex" justifyContent="space-between" alignItems="center">
				<Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

				<Box>
					<Button
						sx={{
							backgroundColor: colors.blueAccent[700],
							color: colors.grey[100],
							fontSize: "14px",
							fontWeight: "bold",
							padding: "10px 20px",
						}}
					>
						<DownloadOutlinedIcon sx={{ mr: "10px" }} />
						Download Reports
					</Button>
				</Box>
			</Box>

			{/* GRID & CHARTS */}
			<Box
				display="grid"
				gridTemplateColumns="repeat(12, 1fr)"
				gridAutoRows="140px"
				gap="20px"
			>
				{/* ROW 1 */}
				<Box
					gridColumn="span 3"
					backgroundColor={colors.primary[400]}
					display="flex"
					alignItems="center"
					justifyContent="center"
				>
					<StatBox
						title="12,361"
						subtitle="Emails Sent"
						progress="0.75"
						increase="+14%"
						icon={
							<EmailIcon
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
						title="431,225"
						subtitle="Sales Obtained"
						progress="0.50"
						increase="+21%"
						icon={
							<PointOfSaleIcon
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
						title="32,441"
						subtitle="New Clients"
						progress="0.30"
						increase="+5%"
						icon={
							<PersonAddIcon
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
						title="1,325,134"
						subtitle="Traffic Received"
						progress="0.80"
						increase="+43%"
						icon={
							<TrafficIcon
								sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
							/>
						}
					/>
				</Box>

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
