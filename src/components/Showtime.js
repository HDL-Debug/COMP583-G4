import React from 'react';
import { Typography, Divider } from '@mui/material';

const Showtime = (props) => {
    let hour = props.data.startHour;
    if (hour < 10)
        hour = "0" + hour;
    let minute = props.data.startMinute;
    if (minute < 10)
        minute = "0" + minute;

    return (<>
        <Typography>
            {props.data.seats} {props.data.month}/{props.data.day}/{props.data.year} {hour}:{minute}
        </Typography>
        {props.last ? "" : <Divider />}
    </>);
}
export default Showtime;