import React, {Component} from 'react';
import './App.css';
import Table from './components/Table'

class App extends Component {
    state = {
        selectedFile: null,
        roomDimensions: '',
        initialRoombaLocation: [],
        dirtLocations: [],
        drivingInstructions: [],
    }

    onFileChange = event => {
        this.setState({selectedFile: event.target.files[0]});
    };

    onFileUpload = () => {
        const fileReader = new FileReader()
        fileReader.readAsText(this.state.selectedFile, "UTF-8");
        fileReader.onload = e => {
            let result = JSON.parse(e.target.result)
            this.setState({
                roomDimensions: result.roomDimensions,
                initialRoombaLocation: result.initialRoombaLocation,
                dirtLocations: result.dirtLocations,
                drivingInstructions: result.drivingInstructions,
            }, () => {
                console.log(this.state)
            })
        };
    }

    render() {
        let {roomDimensions, initialRoombaLocation, dirtLocations, drivingInstructions} = this.state
        return (
            <div className="App">
                {roomDimensions ? (<>
                    <h2>Upload another file</h2>
                    <div>
                    <input type="file" onChange={this.onFileChange} accept=".json"/>
                    <button onClick={this.onFileUpload}>Upload!</button>
                </div>
                    <Table key={roomDimensions} roomDimensions={roomDimensions} initialRoombaLocation={initialRoombaLocation}
                           dirtLocations={dirtLocations}
                           drivingInstructions={drivingInstructions}/>
                </>) : (
                    <div>
                        <h2>Welcome!</h2>
                        <p>Upload JSON File of Roomba path</p>
                        <div>
                            <input type="file" onChange={this.onFileChange} accept=".json"/>
                            <button onClick={this.onFileUpload}>Upload!</button>
                        </div>
                    </div>
                )}

            </div>
        );
    }
}

export default App;
