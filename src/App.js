import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
	const [searchQuery, setsearchQuery] = useState("");
	const [location, setLocation] = useState({});
	const [mapImg, setmapImg] = useState("");

	async function getLocality(event) {
		event.preventDefault();
		// get the main location data
		let API = `https://eu1.locationiq.com/v1/search?key=${process.env.REACT_APP_API_KEY}&q=${searchQuery}&format=json`;

		try {
			// get location data
			const result = await axios.get(API);
			setLocation(result.data[0]);
			// create location map url
			setmapImg(
				`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_API_KEY}&center=${location.lat},${location.lon}&zoom=15`
			);
		} catch (error) {
			// error message
			alert("It looks like what you entered is not a placename");
		}
	}
	// get the string from input
	function handleChange(event) {
		setsearchQuery(event.target.value);
	}

	return (
		<div className="App">
			<h1>Location Explorer</h1>
			<form>
				<fieldset>
					<legend>Input a location</legend>
					<input onChange={handleChange} type="text" id="locationInput" />
					<button onClick={getLocality} type="submit">
						Find me!
					</button>
				</fieldset>
			</form>
			{location && (
				<div>
					<h3>{location.display_name}</h3>
					<div>Latitude: {location.lat}</div>
					<div>Longitude: {location.lon}</div>
				</div>
			)}

			<div className="mapDisplay">
				{mapImg && <img src={mapImg} alt="map"></img>}
			</div>
		</div>
	);
}

export default App;
