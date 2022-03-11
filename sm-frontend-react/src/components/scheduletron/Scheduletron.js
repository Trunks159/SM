import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import HealthBar from './HealthBar';

const styles = ()=>({
    main : {
        background : '#F0F0F0',
    },
});

class  Scheduletron extends Component {
    state = {  } 
    render() { 
        const {classes} = this.props;
        const schedules = [[
            {
                weekday : 'Monday',
                date : '9/17',
                health : '.9',
            },
            {
                weekday : 'Monday',
                date : '9/18',
                health : '.9',
            },
            {
                weekday : 'Monday',
                date : '9/18',
                health : '.9',
            },
            {
                weekday : 'Monday',
                date : '9/19',
                health : '.9',
            },
            {
                weekday : 'Monday',
                date : '9/20',
                health : '.9',
            },
            {
                weekday : 'Monday',
                date : '9/21',
                health : '.1',
            },
            {
                weekday : 'Monday',
                date : '9/22',
                health : '.5',
            },
            
        ],];

        return (
            <div className = {classes.main}>
                <p>SELECT SCHEDULE</p>
                {schedules.map((schedule)=>(
                    <div>
                        <p>{schedule[0].date}</p>
                        <p>{schedule[6].date}</p>
                    </div>
                ))}
            </div>
        );
    }
}
 
export default withStyles(styles)(Scheduletron);