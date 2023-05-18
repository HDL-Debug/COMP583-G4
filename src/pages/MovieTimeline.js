import React, { useState, useEffect } from 'react';
import Timeline from 'react-calendar-timeline';
import 'react-calendar-timeline/lib/Timeline.css';
import moment from 'moment';
import Navbar from '../components/NavbarCustomer';
import { fetchCollection } from '../assets/Utils';
import { getFirestore } from 'firebase/firestore';
import CircularProgress from '@mui/material/CircularProgress';

import { useNavigate } from "react-router-dom";

const MovieTimeline = () => {
    const [movies, setMovies] = useState(null);

    const db = getFirestore();
    const navigate = useNavigate();

    useEffect(() => {
        fetchCollection(db, "Movies", setMovies);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const groups = [];
    const items = [];
    if (movies)
        movies.forEach((movie, mIndex) => {
            groups.push({
                id: mIndex,
                title: movie.data().title
            })
            movie.data().showtimes.forEach((showtime, sIndex) => {
                const date = `${showtime.year}${showtime.month > 9 ? showtime.month : "0" + showtime.month}${showtime.day > 9 ? showtime.day : "0" + showtime.day}`;
                items.push({
                    id: parseInt(`${mIndex}${sIndex}`) + 1,
                    group: mIndex,
                    start_time: moment(date).add(showtime.startHour, 'hour').add(showtime.startMinute, 'minute'),
                    end_time: moment(date).add(showtime.startHour + movie.data().durationHours, 'hour').add(showtime.startMinute + movie.data().durationMinutes, 'minute'),
                    title: '' + showtime.seats,
                    itemProps: {
                        onDoubleClick: () => {
                            navigate("../movie", {state: movie.data()})
                        }
                    }
                }) 
            });
        });

    return (<>
        <Navbar />
        {!movies ? <CircularProgress /> :
        <div style={{margin:40}}>
            <Timeline
                groups={groups}
                items={items}
                canMove={false}
                canResize={false}
                defaultTimeStart={moment().add(-12, 'hour')}
                defaultTimeEnd={moment().add(12, 'hour')}
            />
        </div>
        }
    </>);
}
export default MovieTimeline;