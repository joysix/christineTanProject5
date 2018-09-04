import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyAlqDE-0eeTFrgVPNII7ulpbBO7YNto-6o",
    authDomain: "christinetanproject5.firebaseapp.com",
    databaseURL: "https://christinetanproject5.firebaseio.com",
    projectId: "christinetanproject5",
    storageBucket: "christinetanproject5.appspot.com",
    messagingSenderId: "160570670254"
};

firebase.initializeApp(config);

export default firebase;