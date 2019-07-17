import React, { Component } from 'react';
import logo from './car.png';
import './App.css';
import InputForm from './Components/InputForm';
import { FirebaseContext } from './Firebase';
import Trips from "./Components/Trips";
import Drivers from "./Components/Drivers";
import FileUpload from "./Components/FileUpload";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

class App extends Component {

    render() {
        return (
            <div>
                <FirebaseContext.Consumer>
                    {firebase => {
                        return(
                            <div className="App">
                                <header className="App-header">
                                    <h1>
                                        React Trip Logger
                                    </h1>
                                    <img src={logo} className="App-logo" alt="logo"/>
                                    <FileUpload />
                                    <br />
                                    <InputForm />
                                    <br />
                                </header>
                                <CarouselProvider
                                    className = "App-slider"
                                    naturalSlideWidth={50}
                                    naturalSlideHeight={100}
                                    totalSlides={2}
                                >
                                    <ButtonBack>Trips</ButtonBack>
                                    <ButtonNext>Drivers</ButtonNext>
                                    <Slider>
                                        <Slide index={0}>
                                            <Trips />
                                        </Slide>
                                        <Slide index={1}>
                                            <Drivers />
                                        </Slide>
                                    </Slider>
                                </CarouselProvider>
                            </div>);
                    }}
                </FirebaseContext.Consumer>
            </div>
        );
    }
}

export default App;
