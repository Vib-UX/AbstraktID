import { Button, FormGroup, Paper } from "@mui/material";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import axios from "axios";
import * as React from "react";
import Navigation from "./Header";
import QRCodeModel from "./QRModal";
import SimpleBackdrop from "./SimpleBackdrop";

const API_URL = "https://backend-service-autoloan.onrender.com";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function FormPropsTextFields() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isQrOpen, setIsQrOpen] = React.useState(false);
  const [qrCode, setQrCode] = React.useState("");
  const [data, setData] = React.useState({
    did: localStorage.getItem("user_did"),
    age: "",
    workExperience: "",
    salary: "",
  });

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(API_URL + "/api/get-vc", {
        id: data.did,
        age: data.age,
        income: data.workExperience,
        creditScore: data.salary,
      });
      const axiosdata = res.data;
      setIsLoading(false);
      setQrCode(axiosdata);
      setIsQrOpen(true);
    } catch (error) {
      setIsLoading(false);
      setQrCode(null);
      console.log(error);
    }
  };
  return (
    <ThemeProvider theme={darkTheme}>
      <SimpleBackdrop open={isLoading} setOpen={setIsLoading} />
      <QRCodeModel open={isQrOpen} qrCodeData={qrCode} />
      <CssBaseline />
      <Navigation />
      <Box
        component="form"
        sx={{
          display: "flex",
          marginTop: "100px",
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <FormGroup
          style={{
            margin: "auto",
          }}
        >
          <Paper
            style={{
              borderRadius: "10px",
              padding: "20px",
              margin: "auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <TextField
              id="outlined-number"
              label="Enter DID"
              value={data.did}
              onChange={(e) => setData({ ...data, did: e.target.value })}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <div
              style={{
                height: "20px",
              }}
            />
            <TextField
              id="outlined-number"
              label="Enter age"
              type="number"
              value={data.age}
              onChange={(e) => setData({ ...data, age: e.target.value })}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <div
              style={{
                height: "20px",
              }}
            />
            <TextField
              id="outlined-number"
              label="Enter your income"
              value={data.workExperience}
              onChange={(e) =>
                setData({ ...data, workExperience: e.target.value })
              }
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <div
              style={{
                height: "20px",
              }}
            />
            <TextField
              id="outlined-number"
              label="Enter credit score"
              type="number"
              value={data.salary}
              onChange={(e) => setData({ ...data, salary: e.target.value })}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <div
              style={{
                height: "20px",
              }}
            />
            <Button
              variant="contained"
              style={{
                backgroundColor: "#8d2cab",
                fontWeight: "normal",
                color: "#fff",
              }}
              onClick={() => {
                handleSubmit();
              }}
            >
              Submit
            </Button>
          </Paper>
        </FormGroup>
      </Box>
    </ThemeProvider>
  );
}
