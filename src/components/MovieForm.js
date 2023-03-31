import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';

const styles = {
    title_field: {
        marginTop: '5%'
    },
    description_field: {
        marginTop: '5%'
    }
};

const defaultEntry = {
    title: "Movie Title",
    description: "Movie Description"
}

// Props
// variant = add or edit
// currentData
// open
// setOpen
function MovieForm (props) {
    let variant = props.variant;
    if (variant == undefined) variant = "add";
    const [entry, setEntry] = useState((variant == "add") ? defaultEntry : props.currentData);

    useEffect(() => {
        // This will run every time this opens or closes.
        if (variant == "edit")
            setEntry(props.currentData);
    }, [props.open]);

    const handleClose = () => {
        props.setOpen(false);
        if (variant == "add")
            setEntry(defaultEntry);
    }

    const handleAdd = () => {
        console.log(entry);
        // Add the entry to the database here.
        if (variant == "add") {
            // Code for adding a new entry to the database here.
        }
        else {
            // Code for editing an existing entry to the database here.
            // If a reference to the ID is needed might be able to get this back in
            // Dashboard.js and pass it forward to the Banner and then this component
            // through props.
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
            />
            <TextField
                multiline
                required
                maxRows={4}
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