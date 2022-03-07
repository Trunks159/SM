import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';

const styles = ()=>({
    stuff : 1,
});

class  Scheduletron extends Component {
    state = {  } 
    render() { 
        const {classes} = this.props;
        return (
            <h1>
                Stuff
            </h1>
        );
    }
}
 
export default withStyles(styles)(Scheduletron);