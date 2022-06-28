import {  ToggleButton } from "@mui/material";
import {makeStyles} from '@mui/styles';
import React from "react";

const useStyles = makeStyles({
  button: {
    "& Mui-selected": {
      background: "red",
    },
  },
});

function MyToggleButton({ children }) {
  const [selected, setSelected] = React.useState(false);
  const classes = useStyles();
  return (
    <ToggleButton
      className={classes.button}
      style={{
        textTransform: "capitalize",
        width: 150,
        background: "white",
        color: "black",
        borderRadius: 7,
      }}
      value="check"
      selected={selected}
      onChange={() => {
        setSelected(!selected);
      }}
    >
      {children}
    </ToggleButton>
  );
}

export default MyToggleButton;
