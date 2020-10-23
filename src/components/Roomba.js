import React, {Component} from 'react'
import {FaChevronCircleUp} from 'react-icons/fa'
import './Roomba.css'

/*
* The roomba icon
* */
class Roomba extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rotation: ''
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.rotate(this.props.direction, prevProps.direction)
    }

    /*
    * Rotates the roomba based on the direction it's going to move to
    *
    * @param {String} oldDirection The direction the Roomba previously faced
    * @param {String} newDirection The direction the Roomba will move to
    * */
    rotate = (newDirection, oldDirection) => {
        if (oldDirection === 'N') {
            if (newDirection === 'W') {
                this.setState({
                    rotation: 'NW',
                    degree: 270
                })
            } else if (newDirection === 'E') {
                this.setState({
                    rotation: 'NE',
                    degree: 90
                })
            } else if (newDirection === 'S') {
                this.setState({
                    rotation: 'NS',
                    degree: 180
                })
            }
        } else if (oldDirection === 'E') {
            if (newDirection === 'N') {
                this.setState({
                    rotation: 'EN',
                    degree: 0
                })
            } else if (newDirection === 'S') {
                this.setState({
                    rotation: 'ES',
                    degree: 180
                })
            } else if (newDirection === 'W') {
                this.setState({
                    rotation: 'EW',
                    degree: 270
                })
            }
        } else if (oldDirection === 'S') {
            if (newDirection === 'E') {
                this.setState({
                    rotation: 'SE',
                    degree: 90
                })
            } else if (newDirection === 'W') {
                this.setState({
                    rotation: 'SW',
                    degree: 270
                })
            } else if (newDirection === 'N') {
                this.setState({
                    rotation: 'SN',
                    degree: 0
                })
            }
        } else if (oldDirection === 'W') {
            if (newDirection === 'S') {
                this.setState({
                    rotation: 'WS',
                    degree: 180
                })
            } else if (newDirection === 'N') {
                this.setState({
                    rotation: 'WN',
                    degree: 0
                })
            } else if (newDirection === 'E') {
                this.setState({
                    rotation: 'WE',
                    degree: 90
                })
            }
        }
    }

    render() {
        let {degree} = this.props;
        let {rotation} = this.state;
        return (<div>
                <FaChevronCircleUp
                    className="roomba"
                    style={{transform: `rotate(${degree}deg)`}}
                    turn={rotation}/>
            </div>
        )
    }
}

export default Roomba