import React, { useState, useEffect } from 'react';
import { Typography, Divider, TextField, IconButton } from '@mui/material';
import { getFirestore, updateDoc, doc } from 'firebase/firestore';
import { Delete } from '@mui/icons-material';
import ShowtimeDelete from './ShowtimeDelete';

import { findCollection } from "../assets/Utils";

const styles = {
    icon: {
        px: 1,
        py: 1,
        borderRadius: 1,
        boxSizing: "content-box",
        color: "primary.contrastText",
        backgroundColor: "primary.main"
    }
}

const handleChange = (e, entry, setEntry, db, title, array, index) => {
    if (entry < 0) return;
    // eslint-disable-next-line no-unused-vars
    const { name, value } = e.target;

    array[index].seats = parseInt(value);

    findCollection(db, "Movies", title).then((movieID) => {
        console.log(movieID);
        if (movieID) {
            console.log(movieID);
            updateDoc(doc(db, "Movies", movieID), {
                showtimes: array,
            });
        }
    });

    setEntry(value);
}

const handleDelete = (db, title, info, setInfo, index) => {
    info.showtimes.splice(index, 1);

    findCollection(db, "Movies", title).then((movieID) => {
        if (movieID) {
            updateDoc(doc(db, "Movies", movieID), {
                showtimes: info.showtimes
            });
        }
    });

    setInfo({
        ...info,
        showtimes: info.showtimes
    });
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

    // Prevents an odd issue with React components retaining values across renders.
    useEffect(() => {
        setEntry(props.data.seats);
    }, [props.data.seats]);

    return (<div style={{display: "flex"}}>
        <TextField
            id="outlined"
            name="seats"
            type="number"
            value={entry}
            onChange={(e) => handleChange(e, entry, setEntry, db, props.title, props.array, props.index)}
            size="small"
            style={{
                width: 62
            }}
        />
        <Typography variant="h5" style={{margin: "auto", marginLeft: 5}}>
            {props.data.month}/{props.data.day}/{props.data.year} {hour}:{minute}
        </Typography>
        <IconButton 
            style={{marginLeft: 5}}
            onClick={(event) => {
                handleDelete(db, props.title, props.info, props.setInfo, props.index);
            }}
        ><Delete sx={styles.icon}/></IconButton>
        {props.last ? "" : <Divider />}
    </div>);
}
export default Showtime;