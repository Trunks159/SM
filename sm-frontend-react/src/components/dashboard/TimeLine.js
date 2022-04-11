import React from "react";

function TimeLine() {
  return (
    <div style = {{marginRight : 0,  maxWidth: 710, marginLeft : 'auto', width : '90%'}}>
      <div style = {{display : 'flex', alignItems : 'center'}}>
      <p style={{marginBottom : 0, fontSize : 13,color  : '#888888' }}>
          7AM
        </p>
        <p style={{marginLeft : '80%', marginBottom : 0,  fontSize : 13,color  : '#888888'}}>
          12AM
        </p>

      </div>
        
      <svg style={{  height: 5, width: "94%",}}>
        <line
          style={{ display: "flex", alignItems: "center" , background:'red'}}
          stroke={"#C1C1C1"}
          strokeWidth={"1"}
          y1={"50%"}
          y2={"50%"}
          x1={'3%'}
          x2={"100%"}
        />
      </svg>
    </div>
  );
}

export default TimeLine;
