import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import dayjs from 'dayjs';
import { Typography, Divider, TextField, Button } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { useLocation } from "react-router-dom";

import { provide } from "../assets/Utils";

const defaults = {
    _id: undefined,
    title: "Title Failed to Load",
    description: "The movie description, and potentially other information has failed to load. Please return to the dashboard if you see this message.",
    showtimes: [],
    durationHours: 0,
    durationMinutes: 0
};

// Showtime Structure
// {
// --day: int
// --month: int
// --year: int
// --tickets: int
// --startHour: int
// --startMinute: int
// }
// startHour and startMinute are in military time.

const MovieInstance = (props) => {
    const location = useLocation().state;

    const [info, setInfo] = useState({
        _id: provide(location, defaults, "_id"),
        title: provide(location, defaults, "title"),
        description: provide(location, defaults, "description"),
        showtimes: provide(location, defaults, "showtimes"),
        durationHours: provide(location, defaults, "durationHours"),
        durationMinutes: provide(location, defaults, "durationMinutes")
    });
    const [entry, setEntry] = useState({
        seats: 0,
        startHour: 0,
        startMinute: 0,
    });

    const handleEntryChange = (e) => {
        const { name, value } = e.target;
        setEntry({
            ...entry,
            [name]: value
        });
    };

    const addShowtime = () => {
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
                // Brain moment.
            }
        }
        // Otherwise add to the stuff.
    }

    let jsx = <Typography>No showtimes to show.</Typography>;
    if (info.showtimes.length > 0) {
        jsx = [];
        info.showtimes.forEach((e) => {
            jsx.push(<div><Typography>{e.tickets} {e.startHour}:{e.startMinute}</Typography></div>);
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
                    <DateCalendar />
                </div>
            </div>
            <Divider flexItem={true} orientation="vertical" variant="middle" />
            <div style={{flex: 0.45, textAlign: "left"}}>
                <Typography>Showtimes</Typography>
                {jsx}
                <br />
                <div>
                    <TextField
                        required
                        id="outlined-required"
                        label="Required"
                        name="seats"
                        type="number"
                        value={entry.seats}
                        onChange={handleEntryChange}
                    />
                    <MobileTimePicker defaultValue={dayjs('2022-04-17T15:30')} onChange={(e) => console.log(e)}/>
                    <Button variant="contained" onClick={() => console.log("Button Press")}>Add Showtime</Button>
                </div>
            </div>
        </div>
    </LocalizationProvider>;
}
export default MovieInstance;