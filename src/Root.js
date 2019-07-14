import React, { Component } from 'react';
import logo from './logo.svg';
import './Root.css';
import InputForm from './Components/InputForm';
import { FirebaseContext } from './Firebase';
import TripTable from "./Components/Trips";

class Root extends Component {

    render() {
        return (
            <div>
                <FirebaseContext.Consumer>
                    {firebase => {
                        return(
                            <div className="App">
                                <header className="App-header">
                                    <h1>
                                        Welcome, Zach McGuckin.
                                    </h1>
                                    <img src={logo} className="App-logo" alt="logo"/>
                                    <InputForm />
                                    <TripTable />
                                </header>
                            </div>);
                    }}
                </FirebaseContext.Consumer>
            </div>
        );
    }
}

export default Root;
