import React, { Component } from "react";
import axios from "axios";

export default class Weather extends Component {
	constructor(props) {
		super(props);

		this.handleChangeLat = this.handleChangeLat.bind(this);
        this.handleChangeLon = this.handleChangeLon.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);

		this.state = {lat: '',
					  lon: '',
	                  mean: 0,
	                  median: 0,
	                  mode: 0};
	}

	handleChangeLat(event) {
    this.setState({lat: event.target.value});
  };

  	handleChangeLon(event) {
    this.setState({lon: event.target.value});
  };

	handleButtonClick = () => {

		const userObject = {
            lon: this.state.lon,
            lat: this.state.lat
        };

		axios.post('/weather', userObject)
            .then((res) => {
            	console.log(res);
                this.setState({mean: res.data.mean, median: res.data.median, mode: res.data.mode, lat: '', lon: '' });
            }).catch((error) => {
                console.log(error)
            });
	};
	render() {
		return (
			<div>
				<label>
		          Latitude: &nbsp;&nbsp; <input type="text" placeholder="Latitude" value={this.state.lat} onChange={this.handleChangeLat} /><br></br>
		          Longitude: <input type="text" placeholder="Longitude" value={this.state.lon} onChange={this.handleChangeLon} /><br></br>
		        </label>
				<button onClick={this.handleButtonClick}>Get Weather</button>
				<br></br>
				<br></br>
				<div>Mean: {this.state.mean} &deg;F </div>
			     <div>Median:{this.state.median} &deg;F </div>
			     <div>Mode: {this.state.mode} &deg;F </div>
				</div>
			);
	}
}