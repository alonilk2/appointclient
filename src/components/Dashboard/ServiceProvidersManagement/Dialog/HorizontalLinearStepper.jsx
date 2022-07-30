import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const steps = [
  "מילוי פרטים",
  "מילוי שעות עבודה",
  "העלאת תמונת פרופיל",
  "סיום וקבלת פרטי חשבון",
];

export default function HorizontalLinearStepper(props) {
  let activeStep = props?.activeStep;
  
  return (
    <Box sx={{ width: "100%", margin: '3% 0'}}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

    </Box>
  );
}
