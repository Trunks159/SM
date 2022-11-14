import React from 'react';

function MainContent() {
    return ( <div style = {{display : 'flex'}}>

        <Timeline/>
        <TimeSlots/>
        <Functions/>

    </div> );
}

export MainContent;