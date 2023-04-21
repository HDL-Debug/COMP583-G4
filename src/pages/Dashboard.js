import React, { useState, useEffect, useRef, useReducer } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { getFirestore } from 'firebase/firestore';
import { Button } from '@mui/material';
import Navbar from '../components/Navbar';
import MovieForm from '../components/MovieForm';
import MovieBanner from '../components/MovieBanner';

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

const fetchCollection = async (db, collectionName, setData) => {
    const querySnapshot = await getDocs(collection(db, collectionName));
    setData(querySnapshot.docs);
};
// MovieName, MovieDescription

function Dashboard (props) {
    const doMount = useRef(true);
    const [movies, setMovies] = useState([]);
    const [open, setOpen] = useState(false);
    const [counter, forceUpdate] = useReducer(e => {
        doMount.current = true;
        return e + 1;
    }, 0);

    const db = getFirestore();

    useEffect(() => {
        if (doMount) {
            console.log("Dashboard is fetching!")
            fetchCollection(db, "Movies", setMovies);
            doMount.current = false;
        }
    }, [counter]);

    let jsx = <p>No data at the moment.</p>;
    if (movies.length > 0) {
        jsx = movies.map((e, index) => <MovieBanner 
            data={e.data()}
            forceUpdate={forceUpdate}
            key={"b"+index}
        />);
    }

    return <>
        <Navbar />
        <div style={styles.movie_container}>
            <Button variant="contained" style={styles.add_button} onClick={() => setOpen(true)}>Add Movie</Button>
            {jsx}
        </div>
        <MovieForm 
            open={open}
            setOpen={setOpen}
            doMount={doMount}
            forceUpdate={forceUpdate}
        />
    </>
}

export default Dashboard;