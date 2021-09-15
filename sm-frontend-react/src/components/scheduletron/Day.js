import { Button, Typography } from "@material-ui/core";
import React from "react";

const func = (variant)=>{
    if(variant === 'error'){
        return (

        )   
    }
}

const Day = (day, imgSrc) =>{
    const {date, variant, weekday, shiftHealth} = day
    if (variant === 'error'){
        return (
            <Button>
                <Typography variant =  'body1' >{weekday}</Typography>
                <img src = {imgSrc + /Error Icon.svg'} />
            </Button>
        )
    }else if(variant === 'complete'){
        return(

        )
    }else if (variant === 'untouched'){
        return(
            
        )
    }
    return (    
        
    )
}