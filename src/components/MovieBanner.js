import React, { useState } from 'react';
import { CardMedia, CardActionArea, IconButton, Button, Typography } from '@mui/material';
import { Delete, Create } from '@mui/icons-material';
import MovieForm from './MovieForm';
import MovieDelete from './MovieDelete'

import { useNavigate } from "react-router-dom";

import { findMovie, provideAll } from "../assets/Utils";

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

    const data = provideAll(props.data ? props.data : {});

    const navigate = useNavigate();

    return <>
        <div style={styles.banner_container}>
            <CardActionArea onClick={() => navigate("../movie", {state: data})}>
            <CardMedia
                sx={{
                    width: '100%',
                    height: 100,
                    ':hover': {
                        boxShadow: 20, // theme.shadows[20]
                    },
                    borderRadius: 2
                }}
                image={data.img}
            >
                <div style={styles.banner_inner_content}>
                    <Typography variant="h4" style={{paddingTop: 15, paddingLeft: 10}}>{data.title}</Typography>
                    <div style={{marginTop: 15, marginLeft: "auto"}}>
                        <IconButton 
                            style={{marginRight: 5}}
                            onMouseDown={(event) => event.stopPropagation()}
                            onClick={(event) => {
                                event.stopPropagation();
                                event.preventDefault();
                                setOpenDelete(true);
                            }}
                        ><Delete sx={styles.icon}/></IconButton>
                        <IconButton 
                            style={{marginRight: 5}} 
                            onMouseDown={(event) => event.stopPropagation()}
                            onClick={(event) => {
                                event.stopPropagation();
                                event.preventDefault();
                                setOpenEdit(true);
                            }}
                        ><Create sx={styles.icon}/></IconButton>
                    </div>
                </div>
            </CardMedia>
            </CardActionArea>
        </div>
        <MovieDelete
            title={data.title}
            openDelete={openDelete}
            setOpenDelete={setOpenDelete}
            forceUpdate={props.forceUpdate}
        />
        <MovieForm 
            variant="edit"
            data={data}
            open={openEdit}
            setOpen={setOpenEdit}
            forceUpdate={props.forceUpdate}
        />
    </>;
}

export default MovieBanner;