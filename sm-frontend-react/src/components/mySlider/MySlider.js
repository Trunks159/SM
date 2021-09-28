import React from "react";
import { Slider } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { valueToDt, miliToReg, getMarks } from "./TimeFunctions";

const MySlider = ({
  classes,
  id,
  handleSlider,
  value,
  
}) =>   
    {
      return (
          <Slider
          /*I changed name to id so watch out bro */
          className = {classes.slider}
            key={id}
            defaultValue={value}
            marks={getMarks()}
            valueLabelFormat={(value) =>
              miliToReg(valueToDt(value).toTimeString().slice(0, 5))
            }
            valueLabelDisplay='on'
            step={null}
            valueLabelDisplay="auto"
            onChangeCommitted={(e, new_value) =>
              handleSlider(e, new_value, id)
            }
          />

  );
};

export default MySlider;
