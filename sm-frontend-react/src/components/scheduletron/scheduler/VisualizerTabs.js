import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { makeStyles } from "@material-ui/core";
import visualizerIcon from "../../../assets/images/Visualizer Icon.svg";
import editorIcon from "../../../assets/images/Editor Icon.svg";
import metricsIcon from "../../../assets/images/Metrics Icon.svg";
import saveIcon from "../../../assets/images/Save Icon.svg";

const useStyles = makeStyles({
  box1: {
    display: "grid",
    gridTemplateRows: "1fr 80px",
    width: "100%",
  },
  box2: {
    borderTop: 1,
    borderColor: "divider",
    display: "flex",
  },
  tabs: {
    "& .MuiTabs-indicator": {
      top: 0,
      background: "#54DCF2",
    },
    flex: 1,
    alignItems: "center",
    display: "flex",
  },
  tab: {
    height: 80,
    opacity: 0.8,
    transitionDuration: ".2s",
    "&.Mui-selected": {
      opacity: 1,
    },
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    value === index && (
      <div
        role="tabpanel"
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
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
    <Box className={classes.box1}>
      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
      <Box className={classes.box2}>
        <Tabs
          className={classes.tabs}
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            className={classes.tab}
            icon={<img src={visualizerIcon} />}
            {...a11yProps(0)}
          />
          <Tab
            className={classes.tab}
            icon={<img src={editorIcon} />}
            {...a11yProps(1)}
          />
          <Tab
            className={classes.tab}
            icon={<img src={metricsIcon} />}
            {...a11yProps(2)}
          />
          <Tab
            className={classes.tab}
            icon={<img src={saveIcon} />}
            {...a11yProps(3)}
          />
        </Tabs>
      </Box>
    </Box>
  );
}
