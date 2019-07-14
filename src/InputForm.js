import React, { Component } from 'react';

class InputForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: 'Name',
            startTime: '00:00',
            endTime: '00:00',
            distance: '0',
            data: [
                {name:"User1", startTime: "12:00", endTime: "12:30", distance: 45, mph: 90},
                {name:"User2", startTime: "2:10", endTime: "2:30", distance: 20, mph: 60},
                {name:"User3", startTime: "5:30", endTime: "6:30", distance: 45, mph: 45},
            ]
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
        let newData = this.state.data.slice();
        newData.push({name: this.state.name, distance: this.state.distance, mph: 13});
        this.setState({ data: newData});
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
                <br />
                <Table data={this.state.data} />
            </div>
        );
    }
}

class Table extends Component {
    render() {
        return (
            <header className="App-header">
                Trip Log:
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Distance</th>
                        <th>Average MPH</th>
                    </tr>
                    <TableRow data={this.props.data} />
                </table>
            </header>
        );
    }
}

class TableRow extends Component {
    render() {
        const {
            data
        } = this.props;
        const row = data.map((data) =>
            <tr>
                <td key={data.name}>{data.name}</td>
                <td key={data.startTime}>{data.startTime}</td>
                <td key={data.endTime}>{data.endTime}</td>
                <td key={data.distance}>{data.distance}</td>
                <td key={data.mph}>{data.mph}</td>
            </tr>
        );
        return (row);
    }
}

export default InputForm;