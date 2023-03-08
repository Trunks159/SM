import styled from "@emotion/styled";
import { Paper, Tabs, Tab, Button } from "@mui/material";

const StyledTabs = styled(Tabs)({
  background: "#FFFFFF",
  "& .MuiTabs-flexContainer": {
    gap: 20,
  },
  "& .MuiTabs-indicator": {
    display: "none",
  },
  overflowX: "auto",
  flexShrink: 0,
});

const StyledTab = styled(Tab)(({ theme }) => {
  return {
    opacity: 0.5,
    textTransform: "none",
    textDecoration: "none",
    transition: "opacity .25s",
    background: "#275C78",
    borderRadius: "7px 7px 0px 0px",
    minWidth: 150,
    padding: 20,
    fontWeight: 400,
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    color: "white",
    "&:hover": {
      opacity: 1,
    },
    "& .tab-label": {
      display: "flex",
      gap: 8,
      color: "white",
    },
    "&.Mui-selected": {
      opacity: 1,
    },
    [theme.breakpoints.up("md")]: {
      fontSize: 32,
    },
  };
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  display: "grid",
  gridTemplateRows: "max-content 1fr",
  gridTemplateColumns: "1fr",
  flex: 1,
  margin: 5,
  [theme.breakpoints.up("sm")]: {
    margin: 10,
  },
}));

const StyledHamburgerButton = styled(Button)(({ theme }) => ({
  background: "#585858",
  position: "fixed",
  bottom: 13,
  right: 13,
  "&:hover": {
    background: "black",
  },
  zIndex: 1,
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));

export { StyledTab, StyledTabs, StyledPaper, StyledHamburgerButton };
