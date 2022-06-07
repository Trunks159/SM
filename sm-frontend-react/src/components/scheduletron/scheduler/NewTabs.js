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
      style={{
        background: "white",
      }}
    >
      {value === index && (
        <div>
          <Typography>{children}</Typography>
        </div>
      )}
    </div>
  );
}

const AntTabs = styled((props) => <Tabs {...props} />)(({ theme }) => ({
  width: "40%",
  "& .MuiTabs-indicator": {
    display: "none",
  },
}));

const AntTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    borderRadius: "7px 7px 7px 0px",
    minWidth: 0,
    fontSize: 29,
    fontWeight: "normal",
    height: 70,
    "&.MuiTab-root": {
      backgroundColor: "#627E8C",
      borderRadius: "7px 7px 0px 0px",
      color: "#BECACF",
      marginRight: 10,
    },
    "&:hover": {
      color: "white",
      opacity: 1,
    },
    "&.Mui-selected": {
      "&.MuiTab-root": {
        backgroundColor: "#275C78",
        color: "white",
      },
    },

    "&.Mui-focusVisible": {
      backgroundColor: "#275C78",
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
const BasicTabs = ({ days }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <div
      style={{
        boxSizing: "border-box",
        background: "red",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        margin: 100,
      }}
    >
      <div>
        <AntTabs
          value={value}
          scrollButtons
          variant="scrollable"
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {days.map((day, index) => (
            <AntTab
              label={
                <div style={{ display: "flex", gap: 9, margin: "0px 25px" }}>
                  {value === index && <p>{day.weekday}</p>}
                  <p>
                    {day.month}/{day.day}
                  </p>
                </div>
              }
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
};

export default BasicTabs;
