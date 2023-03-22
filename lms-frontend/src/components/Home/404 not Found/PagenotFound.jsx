import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./PagenotFound.css";

function PagenotFound() {
  return (
    <div className="pagenotfound">
      <h1 className="notfound">404</h1>
      <br></br>
      <p>The page you're looking for doesn't exists</p>
      <Link to="./">
        <Button variant="contained" color="primary">
          Go to Dashboard
        </Button>
      </Link>{" "}
    </div>
  );
}

export default PagenotFound;
