import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import visualizerIcon from "../../../assets/images/Visualizer Icon.svg";
import editorIcon from "../../../assets/images/Editor Icon.svg";
import metricsIcon from "../../../assets/images/Metrics Icon.svg";
import saveIcon from "../../../assets/images/Save Icon.svg";
import visualizerIconInactive from "../../../assets/images/Visualizer Icon Inactive.svg";
import editorIconInactive from "../../../assets/images/Editor Icon Inactive.svg";
import metricsIconInactive from "../../../assets/images/Metrics Icon Inactive.svg";
import saveIconInactive from "../../../assets/images/Save Icon Inactive.svg";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  tabs: {
    "& .MuiTabs-indicator": {
      top: 0,
    },
    "& .MuiTabs-flexContainer": {
      height: "100%",
      justifyContent: "center",
    },
    flexShrink: 0,
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    value === index && (
      <div
        role="tabpanel"
        hidden={value !== index}
        display={"flex"}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {children}
      </div>
    )
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const classes = useStyles();

  return (
    /* <TabPanel
        style={{
          overflow: "auto",
          background: "red",
          flex: 1,
          minHeight: 0,
          minWidth: 0,
          width: "100%",
        }}
        value={value}
        index={0}
      >
        Item 1
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Three
      </TabPanel> */

    <Tabs
      className={classes.tabs}
      value={value}
      onChange={handleChange}
      aria-label="basic tabs example"
      sx={{
        borderTop: 1,
        borderColor: "divider",
      }}
    >
      <Tab
        icon={
          <img src={value === 0 ? visualizerIcon : visualizerIconInactive} />
        }
        {...a11yProps(0)}
      />
      <Tab
        icon={<img src={value === 1 ? editorIcon : editorIconInactive} />}
        {...a11yProps(1)}
      />
      <Tab
        icon={<img src={value === 2 ? metricsIcon : metricsIconInactive} />}
        {...a11yProps(2)}
      />
      <Tab
        icon={<img src={value === 3 ? saveIcon : saveIconInactive} />}
        {...a11yProps(3)}
      />
    </Tabs>
  );
}
