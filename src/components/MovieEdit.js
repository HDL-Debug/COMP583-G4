import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import { getFirestore, updateDoc, doc } from 'firebase/firestore';

import { provide, findCollection, provideAll, handleEntryChange } from "../assets/Utils";

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

const handleClose = (setOpen) => {
    setOpen(false);
}

const handleAdd = (db, data, entry, setEntry, forceUpdate, setOpen) => {
    // Code for editing an existing entry to the database here.
    // If a reference to the ID is needed might be able to get this back in
    // Dashboard.js and pass it forward to the Banner and then this component
    // through props.
    findCollection(db, "Movies", data.title).then((movieID) => {
        if (movieID) {
            updateDoc(doc(db, "Movies", movieID), {
                title: entry.title,
                description: entry.description,
            }).then(() => forceUpdate());
        }
    });
    handleClose(setOpen, setEntry);
}

function MovieEdit (props) {
    const data = provideAll(props.data ? props.data : {});

    const [entry, setEntry] = useState({
        title: provide(data, defaults, "title"),
        description: provide(data, defaults, "description"),
        img: provide(data, defaults, "img")
    });

    const db = getFirestore();

    useEffect(() => {
        // This will run every time this opens or closes.
        setEntry(data);
    }, [props.open]);

    return <Dialog
        open={props.open}
        onClose={() => handleClose(props.setOpen)}
    >
        <DialogTitle>
            {"Edit Movie"}
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
            <Button onClick={() => handleAdd(db, data, entry, setEntry, props.forceUpdate, props.setOpen)}>Edit</Button>
            <Button onClick={() => handleClose(props.setOpen)} autoFocus>Close</Button>
        </DialogActions>
    </Dialog>;
}
export default MovieEdit;