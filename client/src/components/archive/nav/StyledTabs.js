import { Tabs, Tab, Divider } from "@mui/material";
import styled from "@emotion/styled";

const StyledDivider = styled(Divider)({
  background: "#71828B",
  width: "90%",
  marginBottom: 15,
});

const StyledTabs = styled(Tabs)({
  "& .MuiTabs-indicator": {
    background: "white",
    left: 0,
  },
  width: "100%",
});

const StyledTab = styled(Tab)(() => ({
  textTransform: "capitalize",
  minWidth: 0,
  fontSize: 12,
  padding: "15px 0px",
  color: "transparent",
  "&:hover": {
    opacity: 1,
    color: "white",
  },
  "&.Mui-selected": {
    color: "white",
  },
}));

export { StyledTabs, StyledTab, StyledDivider };
