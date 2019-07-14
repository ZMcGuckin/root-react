import React, { Component } from 'react';
import { withFirebase } from '../Firebase/context';

const InputForm = () => (
    <div>
        <Form />
    </div>
);

class InputFormBase extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
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
        if(this.validateParameters()) {
            this.props.firebase.trips().push({
                driver: this.state.name,
                distance: this.state.distance,
                endTime: this.state.endTime,
                startTime: this.state.startTime
            });
            alert(this.state.name + " was submitted driving " + this.state.distance + " miles.");
        }
        event.preventDefault();
    }

    validateParameters() {
        let res = true;
        if(this.state.name === ""){
            res = false;
            alert("Name can not be empty!");
        } else if (this.state.distance === "0"){
            res = false;
            alert("Distance can not be 0!");
        } else if (isNaN(this.state.distance)){
            res = false;
            alert("Distance must be a number!");
        } else if (this.state.startTime === this.state.endTime){
            res = false;
            alert("Start time can not equal end time!");
        }
        return res;
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