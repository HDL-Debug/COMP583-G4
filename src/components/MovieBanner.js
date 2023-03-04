import * as React from 'react';
import Card from '@mui/material/Card';

// Consider using CardMedia for background image

function MovieBanner (props) {
    return <div style={{marginTop: '2%', marginLeft: '10%', width: '80%'}}>
        <Card
            sx={{
                width: '100%',
                height: 100
            }}
        >{props.title}</Card>
    </div>;
}

export default MovieBanner;