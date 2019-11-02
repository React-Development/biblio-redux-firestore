import {createStore, combineReducers, compose} from 'redux';
import {reactReduxFirebase, firebaseReducer} from 'react-redux-firebase';
import {reduxFirestore, firestoreReducer} from 'redux-firestore';
import firebase from 'firebase/app';
import 'firebase/firestore';

// Configurar firestore.
const firebaseConfig = {
    apiKey: "AIzaSyC0ulHThxIQS-ylpOGDhijX-F_TuxsAqzo",
    authDomain: "bibliostore-cd00d.firebaseapp.com",
    databaseURL: "https://bibliostore-cd00d.firebaseio.com",
    projectId: "bibliostore-cd00d",
    storageBucket: "bibliostore-cd00d.appspot.com",
    messagingSenderId: "1008828724911",
    appId: "1:1008828724911:web:d3592e5958cd7325e6c65a",
    measurementId: "G-HKXYTP3P4P"
}

// inicializar firebase
firebase.initializeApp(firebaseConfig);

// configuracion de react-redux
const rrfConfig = {
    userProfile : 'users',
    useFirestoreForProfile: true
}

// crear el enhancer con el compose de redux y firestore
const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase)
)(createStore);

// Reducers
const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer 
});

// state inicial
const initialState = {};

// crear el store
const store = createStoreWithFirebase(rootReducer, initialState, compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

export default store;