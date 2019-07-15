import React, { Component } from 'react';
import { withFirebase } from '../Firebase/context';

const Drivers = () => (
    <div>
        <h3>Driver Log</h3>
        <DriverData />
    </div>
);

class DriverBase extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            drivers: [],
        };
    }

    componentDidMount() {
        this.setState({ loading: true });

        this.props.firebase.db.ref('trips').on('value', snapshot => {

            const tripObject = snapshot.val();

            if (tripObject) {
                let tripList = Object.keys(tripObject).map(key => ({
                    ...tripObject[key],
                    name: key,
                }));
                tripList.sort((a, b) => parseFloat(b.distance) - parseFloat(a.distance));
                this.setState({
                    drivers: tripList,
                    loading: false
                });
            } else {
                this.setState({ drivers: null, loading: false });
            }
        });
    }

    componentWillUnmount() {
        this.props.firebase.db.ref('trips').off();
    }

    render() {
        const {drivers, loading} = this.state;

        return (
            <div>
                {loading && <div>Loading ...</div>}
                {drivers ? (
                    <DriverTable drivers={drivers} />
                ) : (
                    <div>There are no drivers...</div>
                )}
            </div>
        );
    }
}

class DriverTable extends Component {

    render() {
        return (
            <header className="App-header">
                <table>
                    <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Distance</th>
                        <th>Average MPH</th>
                    </tr>
                    <Driver drivers = {this.props.drivers}/>
                    </tbody>
                </table>
            </header>
        );
    }
}

class Driver extends Component {

    render() {
        const { drivers } = this.props;
        const row = drivers.map((driver) =>
            <tr key = {driver.name}>
                <td>{driver.driver}</td>
                <td>{driver.distance}</td>
                <td>{driver.mph}</td>
            </tr>
        );
        return (row);
    }
}

const DriverData = withFirebase(DriverBase);

export default Drivers;