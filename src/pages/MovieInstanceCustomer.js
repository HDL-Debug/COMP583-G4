import React, { useState, useRef } from 'react';
import Navbar from '../components/NavbarCustomer';
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

const getIndex = (array, item) => {
    let index = -1;
    array.forEach((e, i) => {
        if ((item.day === e.day) && (item.month === e.month) && (item.startHour === e.startHour) && (item.startMinute === e.startMinute) && (item.year === e.year)) {
            index = i;
        }
    });
    return index;
}

const MovieInstance = (props) => {
    console.log("=== Render ===");
    const nowRef = useRef(dayjs());

    const now = nowRef.current;
    const location = useLocation().state;

    const [info, setInfo] = useState(provideAll(location));
    const [entry, setEntry] = useState({
        day: now.$D,
        month: now.$M + 1,
        year: now.$y,
        seats: 1,
        startHour: now.$H,
        startMinute: now.$m,
    });

    const handleDateChange = (e) => {
        setEntry({
            ...entry,
            day: e.$D,
            month: e.$M + 1,
            year: e.$y,
        });
    }

    let i = 0;
    let jsx = <Typography>No showtimes in records.</Typography>;
    if (info.showtimes.length > 0) {
        console.log(info.showtimes);
        jsx = [];
        info.showtimes.filter((e) => {
            return (e.month === entry.month) && (e.day === entry.day) && (e.year === entry.year);
        }).sort((a, b) => {
            return (a.startHour - b.startHour) + ((a.startMinute - b.startMinute)/60)
        }).forEach((e, index, arr) => {
            jsx.push(<Showtime 
                data={e}  
                index={getIndex(info.showtimes, e)} 
                title={info.title} 
                key={"s" + (++i)} 
                last={(index + 1) === arr.length}
                info={info}
                setInfo={setInfo}
                isCustomer={true}
            />);
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
            </div>
        </div>
    </LocalizationProvider>;
}
export default MovieInstance;