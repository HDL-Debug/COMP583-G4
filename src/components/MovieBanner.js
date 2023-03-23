import React, { useState } from 'react';
import { CardMedia, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { Delete, Create } from '@mui/icons-material';

// Consider using CardMedia for background image

const styles = {
    icon: {
        px: 1,
        py: 1,
        borderRadius: 1,
        boxSizing: "content-box",
        color: "primary.contrastText",
        backgroundColor: "primary.main"
    }
}

function MovieBanner (props) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = (deleteMovie) => {
        if (deleteMovie) {
            // Handle removing the movie here.

            console.log(props.title + " was removed.");
        }
        setOpen(false);
    }

    return <div>
        <div style={{marginTop: '2%', marginLeft: '10%', width: '80%'}}>
        <CardMedia
            sx={{
                width: '100%',
                height: 100,
                ':hover': {
                    boxShadow: 20, // theme.shadows[20]
                }
            }}
            image="https://img.freepik.com/free-vector/online-cinema-banner-with-open-clapper-board-film-strip_1419-2242.jpg"
        >
            <div style={{display: "flex", alignItems: "center"}}>
                <p style={{paddingTop: 15, paddingLeft: 10, size: 20, fontSize: 22}}>{props.title}</p>
                <div style={{marginTop: 15, marginLeft: "auto"}}>
                    <IconButton style={{marginRight: 5}} onClick={handleOpen}><Delete sx={styles.icon}/></IconButton>
                    <IconButton style={{marginRight: 5}}><Create sx={styles.icon}/></IconButton>
                </div>
            </div>
        </CardMedia>
        </div>
        <Dialog
            open={open}
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
                <Button onClick={() => handleClose(true)}>Yes</Button>
                <Button onClick={() => handleClose(false)} autoFocus>No</Button>
            </DialogActions>
        </Dialog>
    </div>;
}

export default MovieBanner;