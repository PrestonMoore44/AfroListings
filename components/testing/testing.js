import React, { useState, useEffect } from "react";

const Testing = () => {
	useEffect(() => {
		somePromiseFunc();
		someAwaitFunc();
	}, []);

	const somePromiseFunc = () => {
		console.log("Fetching 1");
		// Fetch returns a promise
		fetch("https://jsonplaceholder.typicode.com/albums")
			.then((response) => response.json())
			.then((json) => console.log(json, " JSON 1"));

		console.log("Finished 1?");
	};

	const someAwaitFunc = async () => {
		console.log("Fetching 2");
		let albums = await fetch("https://jsonplaceholder.typicode.com/albums");
		let jsonData = await albums.json();
		console.log(jsonData, " JSON 2");
		console.log("Finished 2?");
	};
	return (
		<div>
			{" "}
			<iframe
				src="https://giphy.com/embed/ule4vhcY1xEKQ"
				width="480"
				height="480"
				frameBorder="0"
				class="giphy-embed"
				allowFullScreen
			></iframe>
			<p>
				<a href="https://giphy.com/gifs/reactionseditor-cat-typing-ule4vhcY1xEKQ">
					via GIPHY
				</a>
			</p>
		</div>
	);
};

export default Testing;
