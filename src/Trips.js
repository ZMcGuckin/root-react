import React, { Component } from 'react';
import { withFirebase } from './Firebase/context';

const TripTable = () => (
    <div>
        <h3>Trip Table</h3>

        <Trips />
    </div>
);

class TripsBase extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            trips: [],
        };
    }

    componentDidMount() {
        this.setState({ loading: true });

        this.props.firebase.trips().on('value', snapshot => {
            const tripObject = snapshot.val();

            if (tripObject) {
                const tripList = Object.keys(tripObject).map(key => ({
                    ...tripObject[key],
                    name: key,
                }));
                this.setState({
                    trips: tripList,
                    loading: false
                });
            } else {
                this.setState({ trips: null, loading: false });
            }
        });
    }

    componentWillUnmount() {
        this.props.firebase.trips().off();
    }

    render() {
        const {trips, loading} = this.state;

        return (
            <div>
                {loading && <div>Loading ...</div>}

                {trips ? (
                    <Table data={trips} />
                ) : (
                    <div>There are no trips ...</div>
                )}
            </div>
        );
    }
}

class Table extends Component {
    render() {
        return (
            <header className="App-header">
                <table>
                    <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Distance</th>
                        <th>Average MPH</th>
                    </tr>
                    <TableRow data={this.props.data} />
                    </tbody>
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
                <td key={data.driver}>{data.driver}</td>
                <td key={data.startTime}>{data.startTime}</td>
                <td key={data.endTime}>{data.endTime}</td>
                <td key={data.distance}>{data.distance}</td>
                <td key={data.mph}>{data.mph}</td>
            </tr>
        );
        return (row);
    }
}

const Trips = withFirebase(TripsBase);

export default TripTable;