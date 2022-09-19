import React from "react";

import { Step, StepLabel, Stepper } from "@mui/material";
import { useSelector } from "react-redux";
import { selectSystemSteps } from "../../modules/system";

export function Steps() {
  const activeStep = useSelector(selectSystemSteps);
  return (
    <Stepper activeStep={activeStep}>
      <Step>
        <StepLabel>チャンネルを選択</StepLabel>
      </Step>
      <Step>
        <StepLabel>動画を選択</StepLabel>
      </Step>
      <Step>
        <StepLabel>OBSに接続</StepLabel>
      </Step>
    </Stepper>
  );
}
