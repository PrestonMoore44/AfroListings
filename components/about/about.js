import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const AboutUs = () => {
	useEffect(() => {
		console.log("Don't fix it... ");
	}, [])
	
	const profile = () => {
		console.log(" Profile view ");
	}

	const halp = () => {
		console.log(" Help and Support ");
	}


	return (
		<div >
			About Us
		</div>
	)
}

export default AboutUs
