import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Visualizer from "./Visualizer";
import vsIcon from "../../../assets/images/Visualizer Icon.svg";
import editorIcon from "../../../assets/images/Editor Icon.svg";
import saveIcon from "../../../assets/images/Save Icon.svg";
import Editor from "./Editor";

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

export default function BasicTabs({ schedule }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", display: "flex" , background : 'orange'}}>
      <Box
        sx={{
          borderRight: 1,
          borderColor: "divider",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          orientation="vertical"
          style = {{width : 72, display : 'flex'}}
        >
          <Tab
            icon={<img src={vsIcon} />}
            label="Visualizer"
            {...a11yProps(0)}
            sx={{ textTransform: "none", fontSize: 8, fontWeight: "bold" }}
          />
          <Tab
            icon={<img src={editorIcon} />}
            label="Editor"
            {...a11yProps(1)}
            sx={{ textTransform: "none", fontSize: 8, fontWeight: "bold" }}
          />
          <Tab
            icon={<img src={saveIcon} />}
            label="Save"
            {...a11yProps(2)}
            sx={{
              textTransform: "none",
              fontSize: 8,
              fontWeight: "bold",
            }}
          />
        </Tabs>
      </Box>
      <TabPanel
        value={value}
        index={0}
        style={{
          height: "100%",
          width: "100%",
          overflowY: "auto",
          background: 'red',
        }}
      >
        <Visualizer schedule={schedule} />
      </TabPanel>
      <TabPanel
        value={value}
        index={1}
        style={{
          height: "100%",
          width: "100%",
          overflowY: "auto",
          background: "blue",
          display: "flex",
          visibility : 'hidden',
        }}
      >
        <Editor />
        You
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </Box>
  );
}
