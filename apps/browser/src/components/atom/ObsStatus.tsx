import React, { useState } from "react";
import { useEffectOnce } from "react-use";
import { Toast } from "./Toast";
import PowerIcon from "@mui/icons-material/Power";
import WarningIcon from "@mui/icons-material/Warning";
import { useSelector } from "react-redux";
import { selectObsStatus } from "../../modules/obs";

export function ObsStatus() {
  const status = useSelector(selectObsStatus);

  return <>{status ? <PowerIcon /> : <WarningIcon />}</>;
}

export function ObsStatusToast() {
  const status = useSelector(selectObsStatus);
  return (
    <Toast open severity={status ? "success" : "error"}>
      {status ? "接続しました" : "切断されました"}
    </Toast>
  );
}
