import React from 'react';
import { doc, deleteDoc, getFirestore } from "firebase/firestore";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

import { findMovie } from "../assets/Utils";

const handleClose = (db, title, setOpenDelete, forceUpdate, deleteMovie) => {
    if (deleteMovie) {
        // Handle removing the movie here.
        // Remove it from the database.
        findMovie(db, "Movies", title).then((movieID) => {
            if (movieID) {
                deleteDoc(doc(db, "Movies", movieID)).then(() => console.log(title + " was removed.")).then(() => forceUpdate());
            }
        });
    }
    setOpenDelete(false);
}

const MovieDelete = (props) => {
    const db = getFirestore();

    return (<Dialog
        open={props.openDelete}
        onClose={() => handleClose(false)}
    >
        <DialogTitle>
            {"Confirm Delete"}
        </DialogTitle>
        <DialogContent>
            <DialogContentText>
                Are you sure you would like to delete the movie named {props.title}?
                Doing so will remove it completely and this action cannot be undone.
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => handleClose(db, props.title, props.setOpenDelete, props.forceUpdate, true)}>Yes</Button>
            <Button onClick={() => handleClose(db, props.title, props.setOpenDelete, props.forceUpdate, false)} autoFocus>No</Button>
        </DialogActions>
    </Dialog>);
}
export default MovieDelete;