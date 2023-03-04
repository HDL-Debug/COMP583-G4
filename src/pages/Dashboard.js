import React, { useState, useEffect, useRef } from 'react';
import MovieBanner from '../components/MovieBanner';
import { collection, getDocs } from "firebase/firestore";

const fetchCollection = async (db, collectionName, setData) => {
    const querySnapshot = await getDocs(collection(db, collectionName));
    setData(querySnapshot.docs);
};

function Dashboard (props) {
    console.log("Dashboard Render");
    const isInitialMount = useRef(true);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        if (isInitialMount) {
            console.log("Fetching Data");
            fetchCollection(props.db, "Movies", setMovies);
            isInitialMount.current = false;
        }
    }, []);

    console.log(movies);

    let jsx = <p>No data at the moment.</p>;
    if (movies.length > 0) {
        console.log("Rendering Banner");
        jsx = movies.map((e, index) => <MovieBanner title={e.data().MovieName} key={"b"+index}/>);
    }

    return (jsx);
}

export default Dashboard;