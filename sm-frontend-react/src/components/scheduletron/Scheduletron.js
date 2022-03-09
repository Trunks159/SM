import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';

const styles = ()=>({
    main : {
        background : '#F0F0F0',
    },
});

class  Scheduletron extends Component {
    state = {  } 
    render() { 
        const {classes} = this.props;
        const schedules = 
        return (
            <div>
                <p>SELECT SCHEDULE</p>

            </div>
        );
    }
}
 
export default withStyles(styles)(Scheduletron);