import React, { Component } from 'react';
import { withFirebase } from './Firebase/context';

const InputForm = () => (
    <div>
        <Form />
    </div>
);

class InputFormBase extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: 'Name',
            startTime: '00:00',
            endTime: '00:00',
            distance: '0'
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        //Limits the input to a certain amount of characters
        let maxInput;
        if(event.target.name === "name"){
            maxInput = 15;
        }
        else {
            maxInput = 5;
        }
        const input = event.target.value.slice(0, maxInput);
        this.setState({ [event.target.name]: input });
    }

    handleSubmit(event) {
        this.props.firebase.trips().push({
            driver: this.state.name,
            distance: this.state.distance,
            endTime: this.state.endTime,
            startTime: this.state.startTime,
            mph: 13
        });
        alert(this.state.name + " was submitted driving " + this.state.distance + " miles.");
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name:
                        <input type="text" name="name" size={15} value={this.state.name} onChange={this.handleChange} />
                    </label>
                    <label>
                        Start Time:
                        <input type="time" name="startTime" size={5} value={this.state.startTime} onChange={this.handleChange} />
                    </label>
                    <label>
                        End Time:
                        <input type="time" name="endTime" size={5} value={this.state.endTime} onChange={this.handleChange} />
                    </label>
                    <label>
                        Distance:
                        <input type="decimal" name="distance" size={5} value={this.state.distance} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

const Form = withFirebase(InputFormBase);

export default InputForm;