import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import Actions from './Actions';

const styles = ()=>({
    main : {
        background :'#F0F0F0',
        width :'100%',
        margin : 12,
        borderRadius : '7px',
        display: 'flex',
        flexDirection :'column',
        justifyContent : 'flex-end',
    },
    workerList:{
        background : '#D2DDDA',
        height: '80%',
        position :'relative',
    },

});

class ShiftEditor extends Component {
    state = {  } 

    componentDidMount = ()=>{

    }

    render() { 
        const {classes} = this.props;
        return (
            <div className= {classes.main}>
                <div className={classes.workerList}>
                    <Actions/>
                </div>
            </div>
        );
    }
}
 
export default withStyles(styles)(ShiftEditor);