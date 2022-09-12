import { styled } from "@material-ui/core/styles";
import { Tabs, Tab } from "@mui/material";

const StyledTabs = styled(Tabs)({
  "& .MuiTabs-indicator": {
    background: "white",
    left: 0,
  },
  width: "100%",

  "& .MuiTab-labelIcon": {
    color: "white",
  },
  marginTop: "auto",
});

const StyledTab = styled(Tab)({
  textTransform: "capitalize",
  minWidth: 0,
  "& p": {
    margin: 0,
    fontSize: 12,
  },
});

export { StyledTabs, StyledTab };
