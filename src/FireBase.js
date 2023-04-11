import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

const app = firebase.initializeApp ({
  apiKey: "AIzaSyDBrzZfX5BJJEPQpUxBmaFDNAY23k-I1oc",
  authDomain: "comp-598-g4.firebaseapp.com",
  projectId: "comp-598-g4",
  storageBucket: "comp-598-g4.appspot.com",
  messagingSenderId: "850825401729",
  appId: "1:850825401729:web:b3119a0210be2732b68480",
  measurementId: "G-3B9HL2STSG"
})

export const auth = app.auth()
export default app