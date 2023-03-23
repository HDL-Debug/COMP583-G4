import * as React from 'react';
import CardMedia from '@mui/material/CardMedia';

// Consider using CardMedia for background image

function MovieBanner (props) {
    return <div style={{marginTop: '2%', marginLeft: '10%', width: '80%'}}>
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
            <p style={{paddingTop: 35, paddingLeft: 10, size: 20}}>{props.title}</p>
        </CardMedia>
    </div>;
}

export default MovieBanner;