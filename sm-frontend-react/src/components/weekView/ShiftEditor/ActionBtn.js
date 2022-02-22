import React from 'react';
import { Button } from '@material-ui/core';

function ActionBtn({iconPath, label}) {
    return (  
        <Button style = {{textTransform : 'none'}}>
            <div style={{ display: "flex", flexDirection: "column", alignItems :'center'}}>
              <img style =  {{margin : 0}} src={iconPath} />
              <p style = {{margin :0, color :'white'}}>{label}</p>
            </div>
          </Button>
    );
}

export default ActionBtn;