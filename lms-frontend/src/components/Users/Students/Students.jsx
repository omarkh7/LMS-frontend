import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../Header";
import axios from "axios";
import React, { useState, useEffect } from "react";

import { useTheme } from "@mui/material";

const Students = () => {
	const [alldata, setAllData] = useState([]);

	const apiURL = "http://localhost:8000/api/users/";

	const fetchallData = async () => {
		try {
			const response = await axios.get(apiURL);
			console.log(response.data);
			setAllData(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchallData();
	}, []);

	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const columns = [
		{ field: "id", headerName: "ID", flex: 0.5 },
		{ field: "registrarId", headerName: "Registrar ID" },
		{
			field: "name",
			headerName: "Name",
			flex: 1,
			cellClassName: "name-column--cell",
		},
		{
			field: "age",
			headerName: "Age",
			type: "number",
			headerAlign: "left",
			align: "left",
		},
		{
			field: "phone",
			headerName: "Phone Number",
			flex: 1,
		},
		{
			field: "email",
			headerName: "Email",
			flex: 1,
		},
		{
			field: "address",
			headerName: "Address",
			flex: 1,
		},
		{
			field: "city",
			headerName: "City",
			flex: 1,
		},
		{
			field: "zipCode",
			headerName: "Zip Code",
			flex: 1,
		},
	];

	return (
		<Box m="20px">
			<Header title="STUDENTS" subtitle="List of Students" />
			<Box
				m="40px 0 0 0"
				height="75vh"
				sx={{
					"& .MuiDataGrid-root": {
						border: "none",
					},
					"& .MuiDataGrid-cell": {
						borderBottom: "none",
					},
					"& .name-column--cell": {
						color: colors.greenAccent[300],
					},
					"& .MuiDataGrid-columnHeaders": {
						backgroundColor: colors.blueAccent[700],
						borderBottom: "none",
					},
					"& .MuiDataGrid-virtualScroller": {
						backgroundColor: colors.primary[400],
					},
					"& .MuiDataGrid-footerContainer": {
						borderTop: "none",
						backgroundColor: colors.blueAccent[700],
					},
					"& .MuiCheckbox-root": {
						color: `${colors.greenAccent[200]} !important`,
					},
					"& .MuiDataGrid-toolbarContainer .MuiButton-text": {
						color: `${colors.grey[100]} !important`,
					},
				}}
			>
				{alldata.map((info) => (
					<div key={info._id}>
						<h1>{info.info_title}</h1>
						<p className="p">{info.info_description}</p>
					</div>
				))}
			</Box>
		</Box>
	);
};

export default Students;
