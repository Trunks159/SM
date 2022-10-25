import { Tabs, Tab, Divider } from "@material-ui/core";
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

const StyledTab = styled(Tab, {
  shouldForwardProp: (prop) => prop !== "color",
})(({ currentMenu, label }) => {
  const isActive = currentMenu === label.toLowerCase();
  return {
    textTransform: "capitalize",
    minWidth: 0,
    fontSize: 12,
    padding: "15px 0px",
    color: isActive ? "white" : "transparent",
    "&:hover": {
      opacity: 1,
      color: "white",
    },
  };
});

export { StyledTabs, StyledTab, StyledDivider };
