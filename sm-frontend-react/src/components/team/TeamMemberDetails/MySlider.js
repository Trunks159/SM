import styled from "@emotion/styled";
import { Slider } from "@mui/material";
import React, { useState } from "react";
import moment from "moment";

const StyledSlider = styled(Slider)({});
//make a date and use it 

function makeFullAvailability(){
    const startTime = moment().hour(0).minute(0).second(0).millisecond(0);
const endTime = startTime.add(1, 'days');
return [startTime.format(), endTime.format()];
}

function doStuff(availability){
    //if availability === true that means its open availability
    //if its an array use the 2 values to set the sliders
    //if false turn the slider off because they are not available
    if(availability){
        return (availability === true ? (1) : 2)
    }
    return false
}

function MySlider({defaultAvailability}) {

    [availability, setAvailability] = useState(defaultAvailability === true ? makeFullAvailability() : []);
    
    console.log('AV: ', av)
  return <StyledSlider value={[startTime, endTime]} />;
}

export default MySlider;
