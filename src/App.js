import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
	const [searchQuery, setsearchQuery] = useState("");
	const [location, setLocation] = useState({});

	async function getLocality(event) {
		event.preventDefault();
		let API = `https://eu1.locationiq.com/v1/search?key=${process.env.REACT_APP_API_KEY}&q=${searchQuery}&format=json`;
		try {
			const result = await axios.get(API);
			setLocation(result.data[0]);
		} catch (error) {
			console.log("The error is " + error);
		}
		console.log(location);
	}
	function handleChange(event) {
		setsearchQuery(event.target.value);
	}
	return (
		<div className="App">
			<h1>Location Explorer</h1>
			<h2>{searchQuery}</h2>
			<form>
				<fieldset>
					<legend>Input a location</legend>
					<input onChange={handleChange} type="text" id="locationInput" />
					<button onClick={getLocality} type="submit">
						Find me!
					</button>
				</fieldset>
			</form>

			<div>Name: {location.display_name}</div>
			<div>Latitude: {location.lat}</div>
			<div>Longitude: {location.lon}</div>
		</div>
	);
}

export default App;
