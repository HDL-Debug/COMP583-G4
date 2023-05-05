import React, { useState, useRef } from 'react';
import Navbar from '../components/Navbar';
import dayjs from 'dayjs';
import { Typography, Divider, TextField, Button } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { useLocation } from "react-router-dom";
import Showtime from "../components/Showtime";

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
    const nowRef = useRef(dayjs());

    const now = nowRef.current;
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
            month: e.$M + 1,
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
    let jsx = <Typography>No showtimes in records.</Typography>;
    if (info.showtimes.length > 0) {
        jsx = [];
        info.showtimes.filter((e) => {
            return (e.month === entry.month) && (e.day === entry.day) && (e.year === entry.year);
        }).sort((a, b) => {
            return (a.startHour - b.startHour) + ((a.startMinute - b.startMinute)/60)
        }).forEach((e, index, arr) => {
            jsx.push(<Showtime data={e} title={info.title} key={"s" + (++i)} last={(index + 1) === arr.length}/>);
        });
        if (jsx.length === 0) {
            jsx = <Typography>No showtimes in records.</Typography>;
        }
    };

    return <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Navbar />
        <div style={{
            backgroundColor: "rgb(231, 235, 240, 0.7)",
            margin: 10,
            borderRadius: 5,
            padding: 5
        }}>
            <Typography
                variant="h2"
            >{info.title}</Typography>
            <Typography>{info.description}</Typography>
        </div>
        <Divider variant="middle" sx={{ borderBottomWidth: 2 }}/>
        <div style={{
            display: "flex",
        }}>
            <div style={{flex: 0.5}}>
                <div style={{width: "fit-content", marginLeft: "auto"}}>
                    <DateCalendar 
                        onChange={handleDateChange}
                        style={{
                            backgroundColor: "rgb(231, 235, 240, 0.7)",
                            margin: 10,
                            borderRadius: 5
                        }}
                    />
                </div>
            </div>
            <Divider flexItem={true} orientation="vertical" variant="middle" sx={{ borderRightWidth: 2 }}/>
            <div style={{
                flex: 0.5, 
                textAlign: "left", 
                backgroundColor: "rgb(231, 235, 240, 0.7)",
                margin: 10,
                borderRadius: 5,
                padding: 5
            }}>
                <Typography variant="h3">Showtimes</Typography>
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
                        style={{
                            height: 40,
                            marginRight: 5
                        }}
                    />
                    <MobileTimePicker defaultValue={now} onChange={handleTimeChange} ampm={false}/>
                    <Button variant="contained" onClick={addShowtime} style={{
                        marginLeft: 5,
                        height: 55
                    }}>Add Showtime</Button>
                </div>
            </div>
        </div>
    </LocalizationProvider>;
}
export default MovieInstance;