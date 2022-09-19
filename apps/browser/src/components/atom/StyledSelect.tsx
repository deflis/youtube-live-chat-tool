import { Select, styled } from "@mui/material";

export const StyledSelect = styled(Select)(({ theme }) => ({
  minWidth: "200px",
  maxWidth: theme.breakpoints.values.sm,
  [theme.breakpoints.up("md")]: {
    maxWidth: theme.breakpoints.values.md,
  },
  [theme.breakpoints.up("lg")]: {
    maxWidth: theme.breakpoints.values.lg,
  },
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  "MuiSelect-root": {},
}));
