import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

import { provide, provideAll, handleEntryChange } from "../assets/Utils";

const styles = {
    title_field: {
        marginTop: '5%'
    },
    description_field: {
        marginTop: '5%'
    }
};

const defaults = {
    title: "Movie Title",
    description: "Movie Description",
    img: "https://img.freepik.com/free-vector/online-cinema-banner-with-open-clapper-board-film-strip_1419-2242.jpg"
}

const handleClose = (setOpen, setEntry) => {
    setOpen(false);
    setEntry(defaults);
}

const handleAdd = (db, entry, forceUpdate, setOpen, setEntry) => {
    // Add the entry to the database here.
    // Code for adding a new entry to the database here.
    addDoc(collection(db, "Movies"), {
        title: entry.title,
        description: entry.description,
        showtimes: [],
        durationHours: 0,
        durationMinutes: 0,
        img: entry.img
    }).then(() => forceUpdate());
    handleClose(setOpen, setEntry);
}

function MovieForm (props) {
    const data = provideAll(props.data ? props.data : {});

    const [entry, setEntry] = useState({
        title: provide(data, defaults, "title"),
        description: provide(data, defaults, "description"),
        img: provide(data, defaults, "img")
    });

    const db = getFirestore();

    return <Dialog
        open={props.open}
        onClose={() => handleClose(props.setOpen, setEntry)}
    >
        <DialogTitle>
            {"Add Movie"}
        </DialogTitle>
        <DialogContent>
            <TextField
                required
                id="outlined-required"
                label="Required"
                style={styles.title_field}
                name="title"
                value={entry.title}
                onChange={(e) => handleEntryChange(e, entry, setEntry)}
            /><br />
            <TextField
                multiline
                required
                minRows={4}
                id="outlined-required"
                label="Required"
                style={styles.description_field}
                name="description"
                value={entry.description}
                onChange={(e) => handleEntryChange(e, entry, setEntry)}
            /><br />
            <TextField
                required
                id="outlined-required"
                label="Required"
                style={styles.title_field}
                name="img"
                value={entry.img}
                onChange={(e) => handleEntryChange(e, entry, setEntry)}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={() => handleAdd(db, entry, props.forceUpdate, props.setOpen, setEntry)}>Add</Button>
            <Button onClick={() => handleClose(props.setOpen, setEntry)} autoFocus>Close</Button>
        </DialogActions>
    </Dialog>;
}
export default MovieForm;