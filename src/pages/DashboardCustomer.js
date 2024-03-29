import React, { useState, useEffect, useRef } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { getFirestore } from 'firebase/firestore';
import Navbar from '../components/NavbarCustomer';
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

function DashboardCustomer(props) {
    const doMount = useRef(true);
    const [movies, setMovies] = useState([]);

    const db = getFirestore();

    useEffect(() => {
        if (doMount) {
            console.log("Dashboard is fetching!")
            fetchCollection(db, "Movies", setMovies);
            doMount.current = false;
        }
    }, []);

    let jsx = <p>No data at the moment.</p>;
    if (movies.length > 0) {
        jsx = movies.map((e, index) => <MovieBanner 
            data={e.data()}
            key={"b"+index}
            isCustomer={true}
        />);
    }

    return <>
        <Navbar />
        <div style={styles.movie_container}>
            {jsx}
        </div>
    </>
}

export default DashboardCustomer;