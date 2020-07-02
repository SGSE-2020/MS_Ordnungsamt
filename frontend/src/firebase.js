import firebase from 'firebase'
import store from "./store";
// firebase init goes here
const config = {
   apiKey: "AIzaSyBvTg0_QrhEvQ9UeZPH8--E2JZ55KA_u_c",
     authDomain: "smart-city-ss2020.firebaseapp.com",
     databaseURL: "https://smart-city-ss2020.firebaseio.com",
     projectId: "smart-city-ss2020",
   storageBucket: "smart-city-ss2020.appspot.com",
   messagingSenderId: "957240233717"
};

firebase.initializeApp(config)

firebase.auth().onAuthStateChanged(user => {
    store.dispatch("fetchUser", user);
});

// firebase utils
const auth = firebase.auth()
const currentUser = auth.currentUser

export {
    auth,
    currentUser
}