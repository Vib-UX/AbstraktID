import { Button, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginVerifier from "./LoginModal";

export default function Navigation() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <LoginVerifier
        publicServerURL={"https://backend-service-autoloan.onrender.com"}
        localServerURL={"https://backend-service-autoloan.onrender.com"}
        open={open}
        setOpen={setOpen}
        onVerificationResult={() => {
          console.log("verified");
          navigate("/claim");
        }}
      />

      <AppBar
        position="static"
        style={{
          height: "80px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Toolbar
          variant="dense"
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            flexDirection: "row",
          }}
        >
          <Typography variant="h6" color="inherit" component="div">
            <Link
              to={"/"}
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              Abstrakt ID Powered by{" "}
              <img
                src="https://assets-global.website-files.com/637359c81e22b715cec245ad/63dc31f8817a4a509d7635a7_Logo.svg"
                style={{
                  width: "100px",
                  height: "30px",
                  marginLeft: "10px",
                }}
                alt="polygon"
              />{" "}
              &nbsp; and
              <h1 className="ml-2">Safe Wallet</h1>
            </Link>
          </Typography>
          <div className="flex items-center space-x-2 justify-end">
            <Button
              variant="contained"
              style={{
                backgroundColor: "#8d2cab",
                fontWeight: "normal",
                color: "#fff",
                marginRight: "10px",
              }}
              onClick={() => {
                if (localStorage.getItem("user_did")) {
                  navigate("/claim");
                } else {
                  setOpen(true);
                }
              }}
            >
              Create a new claim
            </Button>
            <ConnectButton />
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
