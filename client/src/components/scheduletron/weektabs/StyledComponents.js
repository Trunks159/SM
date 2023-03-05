import styled from "@emotion/styled";
import { Paper, Tabs, Tab } from "@mui/material";

const StyledTabs = styled(Tabs)(({ theme }) => {
  return {
    background: "#FFFFFF",
    position: "sticky",
    top: 0,
    "& .MuiTabs-flexContainer": {
      gap: 10,
    },
    "& .MuiTabs-indicator": {
      display: "none",
    },
  };
});

const StyledTab = styled(Tab)(({ theme }) => {
  return {
    opacity: 0.5,
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
      display: "none",
      paddingRight: "7px",
    },
    "&.Mui-selected": {
      opacity: 1,
      "& .weekday": {
        display: "inline",
        paddingRight: "7px",
      },
    },
    [theme.breakpoints.up("md")]: {
      fontSize: 32,
    },
  };
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  display: "grid",
  gridTemplateRows: "90px 1fr",
  margin: 10,
  maxWidth: 1600,
  [theme.breakpoints.up("md")]: {},
}));

export { StyledTab, StyledTabs, StyledPaper };
