import React, { useState } from 'react';
import { Typography, Divider, TextField } from '@mui/material';
import { getFirestore, updateDoc, doc } from 'firebase/firestore';

import { findMovie } from "../assets/Utils";

const handleChange = (e, entry, setEntry, db, title) => {
    if (entry < 0) return;
    const { name, value } = e.target;

    /*
    findMovie(db, "Movies", title).then((movieID) => {
        console.log(movieID);
        if (movieID) {
            console.log(movieID);
            updateDoc(doc(db, "Movies", movieID), {
                showtimes: newShowtimes,
            });
        }
    });
    */

    setEntry(value);
}

const Showtime = (props) => {
    let [entry, setEntry] = useState(props.data.seats);

    const db = getFirestore();

    let hour = props.data.startHour;
    if (hour < 10)
        hour = "0" + hour;
    let minute = props.data.startMinute;
    if (minute < 10)
        minute = "0" + minute;

    return (<div style={{display: "flex"}}>
        <TextField
            id="outlined"
            name="seats"
            type="number"
            value={entry}
            onChange={(e) => handleChange(e, entry, setEntry, db, props.title)}
            size="small"
            style={{
                width: 62
            }}
        />
        <Typography variant="h5" style={{margin: "auto", marginLeft: 5}}>
            {props.data.month}/{props.data.day}/{props.data.year} {hour}:{minute}
        </Typography>
        {props.last ? "" : <Divider />}
    </div>);
}
export default Showtime;