import React, { Component } from 'react';
import logo from './logo.svg';
import './Root.css';
import InputForm from './InputForm';

class Root extends Component {

    render() {
        return (
            <div className="App">
              <header className="App-header">
                <h1>
                  Welcome, Zach McGuckin.
                </h1>
                <img src={logo} className="App-logo" alt="logo"/>
                <InputForm />
              </header>
            </div>
        );
    }
}

export default Root;
