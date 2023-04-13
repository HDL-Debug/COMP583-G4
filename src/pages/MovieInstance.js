import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import dayjs from 'dayjs';
import { Typography, Divider, TextField, Button } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { useLocation } from "react-router-dom";

import { getFirestore, updateDoc, doc } from 'firebase/firestore';

import { provideAll, handleEntryChange, findMovie } from "../assets/Utils";

// Showtime Structure
// {
// --day: int
// --month: int
// --year: int
// --seats: int
// --startHour: int
// --startMinute: int
// }
// startHour and startMinute are in military time.

const MovieInstance = (props) => {
    const now = dayjs();
    const location = useLocation().state;

    const db = getFirestore();

    const [info, setInfo] = useState(provideAll(location));
    const [entry, setEntry] = useState({
        day: now.$D,
        month: now.$M,
        year: now.$y,
        seats: 1,
        startHour: now.$H,
        startMinute: now.$m,
    });

    const addShowtime = () => {
        /*
        let endHour = entry.startHour + info.durationHours;
        let endMinute = entry.startMinute + info.durationMinutes;
        for (let showtime in info.showtimes) {
            let showtimeEndHour = showtime.startHour + info.durationHours;
            let showtimeEndMinute = showtime.startMinute + info.durationMinutes;
            if (showtime.startHour < endHour) {
                if (entry.startHour < showtime.startHour) {
                    // Popup a modal to say that there is an issue.
                    return; // Can't add. Overlapping time.
                }
            }
            else if (entry.startHour < showtimeEndHour) {
            }
        }
        */
        // Otherwise add to the stuff.
        let newShowtimes = JSON.parse(JSON.stringify(info.showtimes));
        newShowtimes = newShowtimes === 1 ? [] : newShowtimes;
        newShowtimes.push(entry);
        findMovie(db, "Movies", info.title).then((movieID) => {
            console.log(movieID);
            if (movieID) {
                console.log(movieID);
                updateDoc(doc(db, "Movies", movieID), {
                    showtimes: newShowtimes,
                });
            }
        });
        setInfo({
            ...info,
            showtimes: newShowtimes,
        });
    }

    const handleDateChange = (e) => {
        setEntry({
            ...entry,
            day: e.$D,
            month: e.$M,
            year: e.$y,
        });
    }

    const handleTimeChange = (e) => {
        setEntry({
            ...entry,
            startHour: e.$H,
            startMinute: e.$m,
        });
    }

    let i = 0;
    let jsx = <Typography>No showtimes to show.</Typography>;
    if (info.showtimes.length > 0) {
        jsx = [];
        info.showtimes.forEach((e) => {
            jsx.push(<Typography key={"s" + (++i)}>{e.seats} {e.month}/{e.day}/{e.year} {e.startHour}:{e.startMinute}</Typography>);
        });
    };

    return <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Navbar />
        <Typography
            variant="h2"
        >{info.title}</Typography>
        <Typography>{info.description}</Typography>
        <Divider variant="middle" />
        <div style={{display: "flex"}}>
            <div style={{flex: 0.55}}>
                <div style={{width: "fit-content", marginLeft: "auto"}}>
                    <DateCalendar 
                        onChange={handleDateChange}
                    />
                </div>
            </div>
            <Divider flexItem={true} orientation="vertical" variant="middle" />
            <div style={{flex: 0.45, textAlign: "left"}}>
                <Typography>Showtimes</Typography>
                <div>
                    {jsx}
                </div>
                <br />
                <div>
                    <TextField
                        required
                        id="outlined-required"
                        label="Required"
                        name="seats"
                        type="number"
                        value={entry.seats}
                        onChange={(e) => handleEntryChange(e, entry, setEntry)}
                    />
                    <MobileTimePicker defaultValue={now} onChange={handleTimeChange} ampm={false}/>
                    <Button variant="contained" onClick={addShowtime}>Add Showtime</Button>
                </div>
            </div>
        </div>
    </LocalizationProvider>;
}
export default MovieInstance;