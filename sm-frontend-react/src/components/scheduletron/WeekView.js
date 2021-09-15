import React, {Component} from 'react';
import { withStyles } from '@material-ui/styles';
import { Button, Typography } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    fontSize:'100px',
    color: 'blue',
    fontFamily: [
      'Segoe Ui',
    ],
  },});

const styles = ()=>({
    main:{
        width:'100%',
    },
    head:{
        display: 'flex',
        justifyContent: 'center',
        alignItems : 'center', 
        fontFamily : "Segoe UI",
        
    },
    headText : {
        padding : '25px',
        width:'100%',
    },
    mainContent:{
        height: '100%',
    },
    forward : {
        height: '100px',
        marginLeft:'auto',
    },

})

class WeekView extends Component{

    state = {

    }
    dot = (imgSrc)=><img className = 'dot' src= {this.props.imgSrc + '/Dot.svg'}/>
    render(){
        const day = {date : '9/13', variant : 'error', shiftHealth : 7.5, weekday: 'monday'} ;
        const {classes,imgSrc, colorPalette } = this.props
        return(
            
                <div className={classes.main}>
                    <div className = {classes.head}>
                        <MuiThemeProvider theme = {theme}>
                            <Typography className = {classes.headText}variant = 'h3'>9/13 {this.dot(imgSrc)} {this.dot(imgSrc)} {this.dot(imgSrc)} 9/19</Typography>
                        </MuiThemeProvider>
                        <Button className = {classes.forward}>
                            <img className = {classes.forward} src = {imgSrc + '/Forward Icon.svg'}/>
                        </Button>
                    </div>
                    <div className  = {classes.mainContent} style = {{background: colorPalette.secondaryLight}}>
                        <Day day = {day} imgSrc = {imgSrc}/>
                    </div>
                </div>
            
        )
    }

}




export default withStyles(styles)(WeekView);