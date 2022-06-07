import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div >
          <Typography>{children}</Typography>
        </div>
      )}
    </div>
  );
}

const AntTabs = styled((props) => <Tabs {...props} />)(({ theme }) => ({
  "& .MuiTabs-indicator": {
    display: "none",
  },
}));

const AntTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    minWidth: 0,
    fontSize: 29,
    fontWeight: 'normal',
    height: 70,
    marginRight: 10,
    color: "white",
    backgroundColor: "blue",
    borderRadius: "7px 7px 0px 0px",

    '&:.MuiTab-root' : {
        backgroundColor : 'red'
    },    
    "&:hover": {
      color: "#40a9ff",
      opacity: 1,
    },
    "&.Mui-selected": {
      background: "black",
      color: "white",
    },

    "&.Mui-focusVisible": {
      backgroundColor: "#d1eaff",
    },
  })
);

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

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const days = [
    "Monday 9/13",
    "Tuesday 9/14",
    "Wednesday 9/15",
    "Thursday 9/16",
    "Friday 9/17",
    "Saturday 9/18",
    "Sunday 9/19",
  ];

  return (
    <div style={{ flex: 1 }}>
      <div style={{ borderBottom: 1, borderColor: "divider" }}>
        <AntTabs
          value={value}
          scrollButtons
          variant="scrollable"
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {days.map((day, index) => (
            <AntTab
              style={{ borderRadius: 7 }}
              label={day}
              {...a11yProps(index)}
            />
          ))}
        </AntTabs>
      </div>
      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </div>
  );
}
