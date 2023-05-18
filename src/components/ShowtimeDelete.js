import React from 'react';
import { doc, updateDoc, getFirestore } from "firebase/firestore";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

import { findCollection } from "../assets/Utils";

const handleClose = (db, title, array, index, setOpen, forceUpdate, remove) => {
    if (!remove) return;
    console.log(array);
    console.log(index);
    delete array[index];
    console.log(array);

    findCollection(db, "Movies", title).then((movieID) => {
        console.log(movieID);
        if (movieID) {
            console.log(movieID);
            updateDoc(doc(db, "Movies", movieID), {
                showtimes: array,
            });
        }
    });

    setOpen(false);
    forceUpdate();
}

// Get Array

const ShowtimeDelete = (props) => {
    const db = getFirestore();

    return (<Dialog
        open={props.open}
        onClose={() => handleClose(false)}
    >
        <DialogTitle>
            {"Confirm Delete"}
        </DialogTitle>
        <DialogContent>
            <DialogContentText>
                Are you sure you would like to delete the selected showtime?
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => handleClose(db, props.title, props.array, props.index, props.setOpen, props.forceUpdate, true)}>Yes</Button>
            <Button onClick={() => handleClose(db, props.title, props.array, props.index, props.setOpen, props.forceUpdate, false)} autoFocus>No</Button>
        </DialogActions>
    </Dialog>);
}
export default ShowtimeDelete;