import React, { useState } from 'react';
import { CardMedia, CardActionArea, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { Delete, Create } from '@mui/icons-material';
import MovieForm from './MovieForm';

// Consider using CardMedia for background image

const styles = {
    banner_container: {
        marginTop: '2%', 
        width: '100%'
    },
    banner_inner_content: {
        display: "flex", 
        alignItems: "center"
    },
    icon: {
        px: 1,
        py: 1,
        borderRadius: 1,
        boxSizing: "content-box",
        color: "primary.contrastText",
        backgroundColor: "primary.main"
    }
}

const MovieBanner = (props) => {
    const [openDelete, setOpenDelete] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);

    const handleOpenDelete = () => {
        setOpenDelete(true);
    }

    const handleOpenEdit = () => {
        setOpenEdit(true);
    }

    const handleClose = (deleteMovie) => {
        if (deleteMovie) {
            // Handle removing the movie here.
            // Remove it from the database.
            console.log(props.title + " was removed.");
        }
        setOpenDelete(false);
    }

    return <div>
        <div style={styles.banner_container}>
            <CardActionArea>
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
                <div style={styles.banner_inner_content}>
                    <p style={{paddingTop: 15, paddingLeft: 10, size: 20, fontSize: 22}}>{props.title}</p>
                    <div style={{marginTop: 15, marginLeft: "auto"}}>
                        <IconButton style={{marginRight: 5}} onClick={handleOpenDelete}><Delete sx={styles.icon}/></IconButton>
                        <IconButton style={{marginRight: 5}} onClick={handleOpenEdit}><Create sx={styles.icon}/></IconButton>
                    </div>
                </div>
            </CardMedia>
            </CardActionArea>
        </div>
        <Dialog
            open={openDelete}
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
        <MovieForm 
            variant="edit"
            currentData={{
                title: props.title, 
                description: props.description
            }}
            open={openEdit}
            setOpen={setOpenEdit}
        />
    </div>;
}

export default MovieBanner;