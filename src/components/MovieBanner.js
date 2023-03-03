import * as React from 'react';
import Button from '@mui/material/Card';
import MovieData from '../assets/MovieData.json'

function MovieBanner () {
    return MovieData.forEach(e => <Card />);
}

export default MovieBanner;