import React, { Component } from 'react';
import { withFirebase } from '../Firebase/context';

const Trips = () => (
    <div>
        <h3>Trip Log</h3>
        <TripData />
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

        this.props.firebase.db.ref('trips').on('value', snapshot => {

            const tripObject = snapshot.val();

            if (tripObject) {
                let tripList = Object.keys(tripObject).map(key => ({
                    ...tripObject[key],
                    name: key,
                }));
                tripList.sort((a, b) => parseFloat(b.distance) - parseFloat(a.distance));
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
        this.props.firebase.db.ref('trips').off();
    }

    onTripRemove = trip => {
        //remove the trip item
        const db = this.props.firebase.db;
        db.ref('trips').child(trip.name).remove()
            .then(function() {
                //remove the trip from the driver
                db.ref('drivers/'+trip.driver+'/trips').child(trip.name).remove()
                    .then(function(){
                        alert("Delete succeeded.")
                    });
            })
            .catch(function(error) {
                alert("Delete failed: " + error.message)
            });
    };

    render() {
        const {trips, loading} = this.state;

        return (
            <div>
                {loading && <div>Loading ...</div>}
                {trips ? (
                    <TripTable trips={trips} onTripRemove={this.onTripRemove}/>
                ) : (
                    <div>There are no trips...</div>
                )}
            </div>
        );
    }
}

class TripTable extends Component {

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
                        <Trip trips = {this.props.trips} onTripRemove = {this.props.onTripRemove}/>
                    </tbody>
                </table>
            </header>
        );
    }
}

class Trip extends Component {

    render() {
        const { trips } = this.props;
        const row = trips.map((trip) =>
            <tr key = {trip.name}>
                <td>{trip.driver}</td>
                <td>{trip.startTime}</td>
                <td>{trip.endTime}</td>
                <td>{trip.distance}</td>
                <td>{trip.mph}</td>
                <td className="del-cell">
                    <input type="button"
                           onClick={() =>  { if (window.confirm('Are you sure you wish to delete this item?'))
                                   this.props.onTripRemove(trip)}}
                           value="X" className="del-btn"/>
                </td>
            </tr>
        );
        return (row);
    }
}

const TripData = withFirebase(TripsBase);

export default Trips;