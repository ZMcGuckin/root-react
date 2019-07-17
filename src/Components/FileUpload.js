import React, { Component } from 'react';
import { withFirebase } from '../Firebase/context';

const UploadFile = () => (
    <div>
        <FileUpload />
    </div>
);

class FileUploadBase extends Component {

    handleFileChosen = (file) => {
        console.log(file);
        let fileReader = new FileReader();
        let fileText = '';
        let that = this;
        fileReader.onload = function(){
            fileText = fileReader.result.substring(0, 200);
            that.handleTripUpload(fileText);
        };
        fileReader.readAsText(file);
    };

    handleTripUpload(fileText) {
        //separate trips by lines
        let trips = fileText.split('\n');
        //upload to db
        const db = this.props.firebase.db;
        let that = this;
        trips.forEach(function (trip) {
            //get trip data
            console.log(trip);
            let tripData = trip.split(',');
            const driver = tripData[0].trim();
            const startTime = tripData[1].trim();
            const endTime = tripData[2].trim();
            const distance = parseInt(tripData[3].trim());
            let tripStats = that.calculateTripStats(tripData);
            if (tripStats.mph > 100 || tripStats.mph < 5) {
                alert(tripStats.mph + " mph is not between 5 and 100, therefore will not be stored.");
            } else {
                //save to trips table
                db.ref('trips').push({
                    driver: driver,
                    distance: parseInt(distance),
                    endTime: endTime,
                    startTime: startTime,
                    mph: tripStats.mph
                }).then((snap) => {
                    const tripKey = snap.key;
                    //save to driver table
                    db.ref('drivers/' + driver + '/trips/' + tripKey).set({
                        distance: parseInt(distance),
                        duration: tripStats.duration
                    }).then(() => {
                        alert(driver + " was submitted driving " + distance + " miles at " +
                            "an average of " + tripStats.mph + " mph.");
                    });
                });
            }
        });
    }

    calculateTripStats(tripData) {
        let startDate = new Date();
        let timeData = tripData[1].match(/\d+/g).map(Number);
        startDate.setHours(timeData[0]);
        startDate.setMinutes(timeData[1]);
        let endDate = new Date();
        timeData = tripData[2].match(/\d+/g).map(Number);
        endDate.setHours(timeData[0]);
        endDate.setMinutes(timeData[1]);
        const timeDifference = (endDate - startDate)/(60*1000);
        return {
            mph: Math.round(parseInt(tripData[3])/timeDifference*60),
            duration: timeDifference
        };
    }

    render() {
        return (
            <div>
                Upload via a csv file here:
                <input type="file" accept=".csv" onChange={(e) => this.handleFileChosen(e.target.files[0])}/>
                <form method="get" action="template.csv">
                    <button type="submit">Download File Template</button>
                </form>
            </div>
        );
    }
}


const FileUpload = withFirebase(FileUploadBase);

export default UploadFile;