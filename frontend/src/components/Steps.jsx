import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import * as React from "react";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import { deserialize, useAccount } from "wagmi";
import AgeVerifier from "./AgeVerifier";
import ExperienceVerifier from "./ExperienceVerifier";
import SalaryVerifier from "./SalaryVerifier";
import useBorrowTransaction from "./hooks/useBorrowTransaction";

const steps = [
  "Verfiy your age",
  "Verfiy your income",
  "Verfiy your creditscore",
];

export default function HorizontalLinearStepper({ setIsVerified, data }) {
  const [tokenId, setTokenId] = React.useState("0");
  const [activeStep, setActiveStep] = React.useState(0);
  const { width, height } = useWindowSize();
  const [skipped, setSkipped] = React.useState(new Set());
  const { address } = useAccount();
  const { borrow } = useBorrowTransaction();

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        flexDirection: "column",
        maxWidth: "70%",
        margin: "0 auto",
        marginTop: "100px",
        alignItems: "center",
        width: "100%",
      }}
    >
      {activeStep === steps.length && (
        <Confetti width={width} height={height} />
      )}

      <Stepper
        activeStep={activeStep}
        style={{
          width: "100%",
        }}
      >
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step
              key={label}
              {...stepProps}
              sx={{
                "& .MuiStepLabel-root .Mui-completed": {
                  color: "secondary.dark", // circle color (COMPLETED)
                },
                "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel":
                  {
                    color: "grey.500", // Just text label (COMPLETED)
                  },
                "& .MuiStepLabel-root .Mui-active": {
                  color: "secondary.main", // circle color (ACTIVE)
                },
                "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel":
                  {
                    color: "common.white", // Just text label (ACTIVE)
                  },
                "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text": {
                  fill: "black", // circle's number (ACTIVE)
                },
              }}
            >
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <div
            style={{
              height: "400px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h1
              style={{
                fontSize: "20px",
              }}
            >
              🎉You are now eligible for the requested loan amount
            </h1>
            <div
              style={{
                height: "20px",
              }}
            />
            <div></div>
            <TextField
              id="outlined-number"
              placeholder="100 USDC"
              disabled
              value={`Transfer ${deserialize(data[0]) / 1e18} loan amount `}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <div className="mt-2">Enter collateral id</div>
            <TextField
              id="outlined-number"
              placeholder="100 USDC"
              value={tokenId}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => {
                setTokenId(e.target.value);
              }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              {address ? (
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#8d2cab",
                    marginTop: "20px",
                    fontWeight: "normal",
                    color: "#fff",
                  }}
                  onClick={() => {
                    borrow(data[4], tokenId);
                  }}
                >
                  Borrow
                </Button>
              ) : (
                <ConnectButton />
              )}
            </div>
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            {activeStep === 0 && (
              <AgeVerifier
                publicServerURL={
                  "https://backend-service-autoloan.onrender.com"
                }
                localServerURL={"https://backend-service-autoloan.onrender.com"}
                credentialType={"KYCAgeCredential"}
                issuerOrHowToLink={
                  "https://oceans404.notion.site/How-to-get-a-Verifiable-Credential-f3d34e7c98ec4147b6b2fae79066c4f6?pvs=4"
                }
                onVerificationResult={() => {
                  localStorage.setItem("isAgeVerified", true);
                  handleNext();
                }}
              />
            )}
            {activeStep === 1 && (
              <ExperienceVerifier
                publicServerURL={
                  "https://backend-service-autoloan.onrender.com"
                }
                localServerURL={"https://backend-service-autoloan.onrender.com"}
                credentialType={"KYCAgeCredential"}
                issuerOrHowToLink={
                  "https://oceans404.notion.site/How-to-get-a-Verifiable-Credential-f3d34e7c98ec4147b6b2fae79066c4f6?pvs=4"
                }
                onVerificationResult={() => {
                  localStorage.setItem("isExperienceVerified", true);
                  handleNext();
                }}
              />
            )}
            {activeStep === 2 && (
              <SalaryVerifier
                publicServerURL={
                  "https://backend-service-autoloan.onrender.com"
                }
                localServerURL={"https://backend-service-autoloan.onrender.com"}
                credentialType={"KYCAgeCredential"}
                issuerOrHowToLink={
                  "https://oceans404.notion.site/How-to-get-a-Verifiable-Credential-f3d34e7c98ec4147b6b2fae79066c4f6?pvs=4"
                }
                onVerificationResult={() => {
                  localStorage.setItem("isSalaryVerified", true);
                  handleNext();
                }}
              />
            )}
          </Typography>
          {/* <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Button
              variant="contained"
              disabled={!txState.isAgeVerified}
              style={{
                fontWeight: "normal",
                backgroundColor: "#8d2cab",
                color: "#fff",
              }}
              onClick={handleNext}
            >
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box> */}
        </React.Fragment>
      )}
    </Box>
  );
}
