import React, { useEffect } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import { useToggle } from "react-use";
import Alert from "@material-ui/lab/Alert";

export type ToastProps = {
  open: boolean;
  severity?: "success" | "info" | "warning" | "error" | undefined;
  children: React.ReactNode;
  autoHideDuration?: number;
};

export function Toast({
  open,
  severity,
  children,
  autoHideDuration = 3000,
}: ToastProps) {
  const [currentOpen, toggleOpen] = useToggle(open ?? true);
  useEffect(() => toggleOpen(open), [open]);
  return (
    <Snackbar
      open={currentOpen}
      autoHideDuration={autoHideDuration}
      onClose={toggleOpen}
    >
      <Alert onClose={toggleOpen} severity={severity}>
        {children}
      </Alert>
    </Snackbar>
  );
}
