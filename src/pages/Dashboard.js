import React, { useState, useEffect, useRef } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { Button } from '@mui/material';
import Navbar from '../components/Navbar';
import MovieForm from '../components/MovieForm';
import MovieBanner from '../components/MovieBanner';

const fetchCollection = async (db, collectionName, setData) => {
    const querySnapshot = await getDocs(collection(db, collectionName));
    setData(querySnapshot.docs);
};
// MovieName, MovieDescription

const styles = {
    add_button: {
        marginTop: '2%',
        right: 0
    },
    movie_container: {
        marginLeft: '10%',
        width: '80%'
    }
};

function Dashboard (props) {
    const isInitialMount = useRef(true);
    const [movies, setMovies] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (isInitialMount) {
            fetchCollection(props.db, "Movies", setMovies);
            isInitialMount.current = false;
        }
    }, []);

    let jsx = <p>No data at the moment.</p>;
    if (movies.length > 0) {
        jsx = movies.map((e, index) => <MovieBanner 
            title={e.data().MovieName} 
            description={e.data().MovieDescription} 
            key={"b"+index}
        />);
    }

    const handleAddMovie = () => {
        setOpen(true)
    }

    return <div>
        <Navbar />
        <div style={styles.movie_container}>
            <Button variant="contained" style={styles.add_button} onClick={() => handleAddMovie()}>Add Movie</Button>
            {jsx}
        </div>
        <MovieForm 
            open={open}
            setOpen={setOpen}
        />
    </div>;
}

export default Dashboard;