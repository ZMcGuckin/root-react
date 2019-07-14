import React, { Component } from 'react';

class InputForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: 'Name',
            startTime: '12:00',
            endTime: '12:30',
            distance: '0',
            data: [
                {id: 1, name:"User1", distance: 5, mph: 13},
                {id: 2, name:"User2", distance: 5, mph: 13},
                {id: 3, name:"User3", distance: 5, mph: 13},
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
        const newId = this.state.data.length + 1;
        newData.push({id: newId, name: this.state.name, distance: this.state.distance, mph: 13});
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
                        <th>Id</th>
                        <th>Name</th>
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
                <td key={data.id}>{data.id}</td>
                <td key={data.name}>{data.name}</td>
                <td key={data.distance}>{data.distance}</td>
                <td key={data.mph}>{data.mph}</td>
            </tr>
        );
        return (row);
    }
}

export default InputForm;