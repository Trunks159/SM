import styled from "@emotion/styled";
import { Paper, Tabs, Tab } from "@material-ui/core";

const StyledTabs = styled(Tabs)(({ theme }) => {
  return {
    position: "relative",
    height: 30,
    overflowX: "auto",
    "& .MuiTabs-flexContainer": {
      gap: 10,
      height: "100%",
      flex: 1,
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      position: "absolute",
    },
    "& .MuiTabs-indicator": {
      display: "none",
    },
    [theme.breakpoints.up("md")]: {
      height: 80,
    },
  };
});

const StyledTab = styled(Tab)(({ currentDayId, value, theme }) => {
  const isActive = currentDayIndex === value;
  return {
    opacity: isActive ? 1 : 0.5,
    textTransform: "none",
    textDecoration: "none",
    transition: "opacity .25s",
    background: "#275C78",
    margin: "0px 12.5px",
    borderRadius: "7px 7px 0px 0px",
    minWidth: 150,
    padding: "0px 20px",
    fontSize: 19,
    fontWeight: 400,
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    color: "white",
    "&:hover": {
      opacity: 1,
    },
    "& .weekday": {
      display: isActive ? "inline" : "none",
      paddingRight: "7px",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: 32,
    },
  };
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  position: "relative",
  margin: 0,
  maxWidth: 1600,
  backgroundColor: "white",
  minHeight: "100%",

  [theme.breakpoints.up("md")]: {
    margin: "0px 10px 0px 10px",
  },
}));

export { StyledTab, StyledTabs, StyledPaper };
