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
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
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
    [theme.breakpoints.up("sm")]: {
      minWidth: 0,
    },
    backgroundColor: "#275C78",
    fontSize: 29,
    fontWeight: 400,
    height : 70,
    marginRight: theme.spacing(1),
    color: "white",
    fontFamily :[
      'Segoe UI'
    ],
    backgroundColor: "#627E8C",
    borderRadius: "7px 7px 0px 0px",
    "&:hover": {
      color: "#40a9ff",
      opacity: 1,
    },
    "&.Mui-selected": {
      backgroundColor: "#275C78",
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
    'Monday 9/13', 'Tuesday 9/14', 'Wednesday 9/15', 'Thursday 9/16', 'Friday 9/17', 'Saturday 9/18', 'Sunday 9/19'
  ];

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <AntTabs value={value} scrollButtons variant = 'scrollable' onChange={handleChange} aria-label="basic tabs example">
          {days.map((day, index)=>(
            <AntTab label={day} {...a11yProps(index)} />
          ))}

        </AntTabs>
      </Box>
      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </Box>
  );
}