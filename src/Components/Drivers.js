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

        this.props.firebase.db.ref('drivers').on('value', snapshot => {

            const driverObject = snapshot.val();

            if (driverObject) {
                let driverList = Object.keys(driverObject).map(key => ({
                    ...driverObject[key],
                    name: key,
                }));
                driverList = this.reformatDriverList(driverList);
                driverList.sort((a, b) => parseFloat(b.distance) - parseFloat(a.distance));
                this.setState({
                    drivers: driverList,
                    loading: false
                });
            } else {
                this.setState({ drivers: null, loading: false });
            }
        });
    }

    reformatDriverList(driverList) {
        let truncatedDriverList = [];
        driverList.forEach(function(driver){
            let driverData = {
                name: driver.name,
                distance: 0,
                duration: 0,
                mph: 0,
                trips: driver.trips
            };
            for(let trip in driver.trips){
                for(let data in driver.trips[trip]){
                    driverData[data] = (driverData[data]+driver.trips[trip][data]);
                }
            }
            driverData['mph'] = Math.round(driverData['distance']/driverData['duration']*60);
            truncatedDriverList.push(driverData);
        });
        return truncatedDriverList;
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
                <td>{driver.name}</td>
                <td>{driver.distance}</td>
                <td>{driver.mph}</td>
            </tr>
        );
        return (row);
    }
}

const DriverData = withFirebase(DriverBase);

export default Drivers;