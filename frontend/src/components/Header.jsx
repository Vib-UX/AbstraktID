"use client";
import SafeApp from "@/app/SafeApp";
import { Button, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
import LoginVerifier from "./LoginModal";
export default function Navigation() {
  const navigate = useRouter();
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
          <Typography
            variant="h6"
            color="inherit"
            component="div"
            className="flex items-center justify-start space-x-4"
          >
            <Link
              href={"/"}
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              Powered by{" "}
              <img
                src="https://assets-global.website-files.com/637359c81e22b715cec245ad/63dc31f8817a4a509d7635a7_Logo.svg"
                style={{
                  width: "100px",
                  height: "30px",
                  marginLeft: "10px",
                }}
                alt="polygon"
              />{" "}
              <img
                src="https://sepolia-blockscout.scroll.io/images/logo-3ce7703860c2e6a0c62fdfa7fe6850d5.png?vsn=d"
                style={{
                  width: "100px",
                  height: "30px",
                  marginLeft: "10px",
                  filter: "brightness(0) invert(1)",
                }}
                alt="polygon"
              />{" "}
              <img
                src={"/safe.svg"}
                style={{
                  width: "100px",
                  height: "30px",
                  filter: "brightness(0) invert(1)",
                }}
                alt="polygon"
              />{" "}
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
            <SafeApp />
            <ConnectButton />
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
