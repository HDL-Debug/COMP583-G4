import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import { getFirestore, collection, addDoc, updateDoc, doc } from 'firebase/firestore';

import { provide, findMovie, provideAll } from "../assets/Utils";

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
    description: "Movie Description"
}

// Props
// variant = add or edit
// currentData
// open
// setOpen
function MovieForm (props) {
    const variant = props.variant ? props.variant : "add";

    const data = provideAll(props.data ? props.data : {});

    const [entry, setEntry] = useState({
        title: provide(data, defaults, "title"),
        description: provide(data, defaults, "description"),
    });

    const db = getFirestore();

    useEffect(() => {
        // This will run every time this opens or closes.
        if (variant === "edit")
            setEntry(data);
    }, [props.open]);

    const handleClose = () => {
        props.setOpen(false);
        if (variant === "add")
            setEntry(defaults);
    }

    const handleAdd = () => {
        // Add the entry to the database here.
        if (variant === "add") {
            // Code for adding a new entry to the database here.
            addDoc(collection(db, "Movies"), {
                title: entry.title,
                description: entry.description,
                showtimes: [],
                durationHours: 0,
                durationMinutes: 0,
            }).then(() => props.forceUpdate());
        }
        else {
            // Code for editing an existing entry to the database here.
            // If a reference to the ID is needed might be able to get this back in
            // Dashboard.js and pass it forward to the Banner and then this component
            // through props.
            findMovie(db, "Movies", data.title).then((movieID) => {
                if (movieID) {
                    updateDoc(doc(db, "Movies", movieID), {
                        title: entry.title,
                        description: entry.description,
                    }).then(() => props.forceUpdate());
                }
            });
        }
        handleClose();
    }

    const handleEntryChange = (e) => {
        const { name, value } = e.target;
        setEntry({
            ...entry,
            [name]: value
        });
    }

    return <Dialog
        open={props.open}
        onClose={handleClose}
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
                onChange={handleEntryChange}
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
                onChange={handleEntryChange}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleAdd}>Add</Button>
            <Button onClick={handleClose} autoFocus>Close</Button>
        </DialogActions>
    </Dialog>;
}
export default MovieForm;