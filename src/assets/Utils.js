import { collection, getDocs, getFirestore } from "firebase/firestore";

export const fetchCollection = async (db, collectionName, setData) => {
    const querySnapshot = await getDocs(collection(db, collectionName));
    setData(querySnapshot.docs);
}

// Find a movie by its name and get the ID.
export const findMovie = async (db, collectionName, title) => {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const snapshots = querySnapshot.docs;
    for (let i in snapshots) {
        if (snapshots[i].data().title === title)
            return snapshots[i].id;
    }
    return undefined;
}

export const provide = (dictionary, defaults, name) => {
    return (dictionary[name] ? dictionary[name] : defaults[name]);
}

const basicDefaults = {
    _id: undefined,
    title: "Title Failed to Load",
    description: "The movie description, and potentially other information has failed to load. Please return to the dashboard if you see this message.",
    showtimes: [],
    durationHours: 0,
    durationMinutes: 0
};

export const provideAll = (dictionary, defaults=basicDefaults) => {
    const results = {};
    for (let key in defaults) {
        results[key] = provide(dictionary, defaults, key);
    }
    return results;
}