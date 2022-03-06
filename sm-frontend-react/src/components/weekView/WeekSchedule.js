import React, { Component } from 'react';
import DayBtn from './DayBtn';
import { withStyles } from '@material-ui/styles';
import { Route } from 'react-router';

const styles = ()=>({
    main : {
        background :'#E2F4F0',
        borderRadius : '7px',
        margin : 10,
        width : '92%',
        maxHeight :'100%',
        minHeight :300,
    },

    dayList:{
        display :'flex',
        flexWrap  :'wrap',
        overflowY:'auto',
        height : '100%',
        justifyContent :'center',
        gap : '44px',

    }

})

class WeekSchedule extends Component {
    state = {};
    render() {
        const {classes, url} = this.props;
        const schedule = [
            {name : 'Monday', date : {day : 13, month : 9, year : 2021}, health : [2,10]},
            {name : 'Tuesday', date : {day : 14, month : 9, year : 2021}, health : [8,10]},
            {name : 'Wednesday', date : {day : 15, month : 9, year : 2021}, health : [1,10]},
            {name : 'Thursday', date : {day : 16, month : 9, year : 2021}, health : [5,10]},
            {name : 'Friday', date : {day : 17, month : 9, year : 2021}, health : [6,10]},
            {name : 'Saturday', date : {day : 18, month : 9, year : 2021}, health : [5,10]},
            {name : 'Sunday', date : {day : 19, month : 9, year : 2021}, health : null},
        ];
        return (
            <div className = {classes.main}>
                <div className = {classes.dayList}>

                    <div className = {'btn'} style = {{background : 'red'}}>
                        Yo
                    </div>
                    {schedule.map(({name, date, health}, index)=>{
                        return(
                            <DayBtn
                            name = {name}
                            date = {date}
                            health = {health}
                            index = {index + 1}
                            url ={url}
                            colorPalette = {this.props.colorPalette}
                            />
                        )
                    })}
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(WeekSchedule);
