import app from 'firebase/app';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyDAXwvNvzAND_2GHmG9YnPKwY5DT07E9Ns",
    authDomain: "root-react.firebaseapp.com",
    databaseURL: "https://root-react.firebaseio.com",
    projectId: "root-react",
    storageBucket: "",
    messagingSenderId: "778411498786",
    appId: "1:778411498786:web:7588ae530278a401"
};

class Firebase {
    constructor() {
        app.initializeApp(config);
        this.db = app.database();
    }

    trips = () => this.db.ref('trips');
}

export default Firebase;