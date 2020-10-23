import React, {Component} from 'react'
import './Table.css'
import {FaCertificate} from "react-icons/fa";
import Roomba from "./Roomba";


/*
* The general view of the roomba layout as a table and the results
* */
class Table extends Component {
    constructor(props) {
        super(props);

        this.state = {
            roombaLocation: this.props.initialRoombaLocation,
            dirtCollected: 0,
            wallsHit: 0,
            direction: 'N',
            tableState: [],
            degree: 0,
            resultsTable: [],
            totalDistance: 0,
            finalPosition: '',
        }
    }

    searchArray(parent, child) {
        for (let i = 0; i < parent.length; i++) {
            if (parent[i][0] === child[0] && parent[i][1] === child[1]) {
                return true
            }
        }
        return false
    }

    componentDidMount() {
        let {roomDimensions, initialRoombaLocation, dirtLocations, drivingInstructions} = this.props
        let tableState = [], initRowState = []
        initRowState[0] = ''
        for (let i = 0; i < roomDimensions[1]; i++) {
            initRowState[i + 1] = i
        }
        tableState[roomDimensions[0]] = initRowState
        for (let i = roomDimensions[0] - 1; i >= 0; i--) {
            let rowState = []
            rowState[0] = i
            for (let j = 0; j < roomDimensions[1]; j++) {
                if (initialRoombaLocation[0] === i && initialRoombaLocation[1] === j) {
                    rowState[j + 1] = 'roomba'
                } else if (this.searchArray(dirtLocations, [j, i])) {
                    rowState[j + 1] = 'dirt'
                } else {
                    rowState[j + 1] = ''
                }
            }
            tableState[i] = rowState
        }
        this.setState({tableState: tableState}, () => {
            let tableState = JSON.parse(JSON.stringify(this.state.tableState));
            let resultsTable = [], tempTable = tableState, x = Object.assign(initialRoombaLocation[0]),
                y = Object.assign(initialRoombaLocation[1] + 1),
                dirtCollected = 0, wallsHit = 0, totalDistance = 0;
            resultsTable[0] = {
                step: 1,
                roombaLocation: `${initialRoombaLocation[1]}, ${initialRoombaLocation[0]}`,
                action: '',
                totalDirtCollected: 0,
                totalWallHits: 0
            }

            drivingInstructions.forEach((direction, index) => {
                if (direction === 'N') {
                    if (x + 1 < roomDimensions[0]) {
                        x = x + 1
                        totalDistance = totalDistance + 1
                    } else {
                        wallsHit = wallsHit + 1
                        direction = ""

                    }
                } else if (direction === 'S') {
                    if (x - 1 > -1) {
                        x = x - 1
                        totalDistance = totalDistance + 1
                    } else {
                        wallsHit = wallsHit + 1
                        direction = ""

                    }
                } else if (direction === 'W') {
                    if (y - 1 > 0) {
                        y = y - 1
                        totalDistance = totalDistance + 1
                    } else {
                        wallsHit = wallsHit + 1
                        direction = ""

                    }
                } else if (direction === 'E') {
                    if (y + 1 < roomDimensions[1] + 1) {
                        y = y + 1
                        totalDistance = totalDistance + 1
                    } else {
                        wallsHit = wallsHit + 1
                        direction = ""
                    }
                }
                if (tempTable[x][y] === 'dirt') {
                    dirtCollected = dirtCollected + 1
                    tempTable[x][y] = ""
                }
                resultsTable[index + 1] = {
                    step: index + 2,
                    roombaLocation: `${y - 1}, ${x}`,
                    action: direction,
                    totalDirtCollected: dirtCollected,
                    totalWallHits: wallsHit,
                }
            })
            this.setState({
                dirtCollected: dirtCollected,
                wallsHit: wallsHit,
                finalPosition: `${y - 1}, ${x}`,
                totalDistance: totalDistance,
                resultsTable: resultsTable
            }, () => {
                for (let i = 1; i < drivingInstructions.length + 1; i++) {
                    setTimeout(() => {
                        this.moveUp(drivingInstructions[i - 1])
                    }, i * 500);
                }
            })
            console.log(resultsTable)
            console.log(totalDistance)
        })
    }

    renderTable() {
        let {direction, degree} = this.state
        return this.state.tableState.reverse().map((content, index) => {
            return (<tr key={index}>
                {content.map((value, i) => {
                    return (<td className="room" id={`${index}-${i}`}>{value === 'roomba' ? (
                        <Roomba direction={direction} degree={degree}/>) : value === 'dirt' ? (
                        <FaCertificate size='0.75em'/>) : value}</td>)
                })}
            </tr>)
        })
    }

    renderResults() {
        let {resultsTable} = this.state
        return resultsTable.map((content, index) => {
            return (<tr key={index}>
                <td style={{border: '1px solid black', padding: '5px'}}>{content.step}</td>
                <td style={{border: '1px solid black'}}>{content.roombaLocation}</td>
                <td style={{border: '1px solid black'}}>{content.action}</td>
                <td style={{border: '1px solid black'}}>{content.totalDirtCollected}</td>
                <td style={{border: '1px solid black'}}>{content.totalWallHits}</td>
            </tr>)
        })
    }

    /* *
    * Function for roomba to move forward one space
    *
    * @param {String} direction The direction the Roomba will move
    *  */
    moveUp = (direction) => {
        let {roomDimensions} = this.props
        let {tableState, roombaLocation, degree} = this.state
        let x = roombaLocation[0], y = roombaLocation[1] + 1
        tableState[x][y] = ''
        if (direction === 'N') {
            if (x + 1 < roomDimensions[0]) {
                x = x + 1
                degree = 0
            }
        } else if (direction === 'S') {
            if (x - 1 > -1) {
                x = x - 1
                degree = 180
            }
        } else if (direction === 'E') {
            if (y + 1 < roomDimensions[1] + 1) {
                y = y + 1
                degree = 90
            }
        } else if (direction === 'W') {
            if (y - 1 > 0) {
                y = y - 1
                degree = 270
            }
        }
        tableState[x][y] = 'roomba'
        this.setState({
            roombaLocation: [x, y - 1],
            tableState: tableState,
            degree: degree
        }, () => {
            this.setState({
                direction: direction
            })
        })
    }

    render() {
        let {resultsTable, finalPosition, dirtCollected, wallsHit, totalDistance} = this.state
        return (
            <div>
                <table>
                    <tbody>
                    {this.renderTable()}
                    </tbody>
                </table>
                <table style={{border: '1px solid black'}}>
                    <thead>
                    <tr>
                        <td>Step</td>
                        <td>Roomba Location</td>
                        <td>Action</td>
                        <td>Total Dirt Collected</td>
                        <td>Total Wall Hits</td>
                    </tr>
                    </thead>
                    <tbody>
                    {resultsTable && this.renderResults()}
                    </tbody>
                    <div style={{textAlign: "left"}}>
                        <p>Final Position: {finalPosition}</p>
                        <p>Total dirt collected: {dirtCollected}</p>
                        <p>Total distance travelled: {totalDistance}</p>
                        <p>Total walls hit: {wallsHit}</p>
                    </div>
                </table>
            </div>
        )
    }
}

export default Table