import React, { useState } from 'react';
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

function MovieForm (props) {
    const [entry, setEntry] = useState(defaultEntry);

    const handleClose = () => {
        props.setOpen(false);
        setEntry(defaultEntry);
    }

    const handleAdd = () => {
        console.log(entry);
        // Do something with entry here.
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