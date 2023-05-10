import React from "react";

export default function Weather({ weather }) {
	console.log(weather.date);
	return (
		<div className="weather">
			{weather.date}: {weather.description}
		</div>
	);
}
