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
            const mph = this.calculateMPH();
            if (mph > 100 || mph < 5) {
                alert(mph + " mph is not between 5 and 100, therefore will not be stored.");
            } else {
                this.props.firebase.db.ref('trips').push({
                    driver: this.state.name,
                    distance: this.state.distance,
                    endTime: this.state.endTime,
                    startTime: this.state.startTime,
                    mph: mph
                });
                alert(this.state.name + " was submitted driving " + this.state.distance + " miles at " +
                    "an average of " + mph + " mph.");
            }
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

    calculateMPH() {
        let startDate = new Date();
        let timeData = this.state.startTime.match(/\d+/g).map(Number);
        startDate.setHours(timeData[0]);
        startDate.setMinutes(timeData[1]);
        let endDate = new Date();
        timeData = this.state.endTime.match(/\d+/g).map(Number);
        endDate.setHours(timeData[0]);
        endDate.setMinutes(timeData[1]);
        const timeDifference = (endDate - startDate)/(60*1000);
        return Math.round(this.state.distance/timeDifference*60);
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