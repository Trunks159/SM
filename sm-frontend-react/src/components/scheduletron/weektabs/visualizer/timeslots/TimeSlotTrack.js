import React, { useRef } from 'react';

//This track initializes height or width
//and renders the actual timeslot once height 
//or width is initialized

function TimeSlotTrack() {
    const myRef = useRef();
    return (<div ref = {myRef}>
        

    </div>);
}

export default TimeSlotTrack;