import { ToggleButton } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  button: {
    textTransform: "capitalize",
    width: 150,
    background: "white",
    color: "black",
    borderRadius: 7,
    transitionDuration: ".2s",
    "&:hover": {
      background: "red",
    },
    "&.Mui-selected": {
      background: "red",
      "&:hover": {
        background: "red",
      },
    },
  },
});

function MyToggleButton({ children }) {
  const [selected, setSelected] = React.useState(false);
  const classes = useStyles();
  return (
    <ToggleButton
      className={classes.button}
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
