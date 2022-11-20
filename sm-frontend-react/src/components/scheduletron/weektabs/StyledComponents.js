import styled from "@emotion/styled";
import { Paper, Tabs, Tab } from "@material-ui/core";

const StyledTabs = styled(Tabs)(({ theme }) => {
  return {
    height: 35,
    "& .MuiTabs-flexContainer": {
      gap: 10,
      height: "100%",
    },
    "& .MuiTabs-indicator": {
      display: "none",
    },
    [theme.breakpoints.up("md")]: {
      height: 80,
    },
  };
});

const StyledTab = styled(Tab)(({ currentDayIndex, value }) => {
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
    fontSize: "32px",
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    color: "white",
    "&:hover": {
      opacity: 1,
    },
    "& .weekday": {
      display: isActive ? "inline" : "none",
      paddingRight: "7px",
    },
  };
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  margin: 0,
  maxWidth: 1600,
  backgroundColor: "white",
  minHeight: "100%",
  [theme.breakpoints.up("md")]: {
    margin: "0px 10px 0px 10px",
  },
}));

export { StyledTab, StyledTabs, StyledPaper };
