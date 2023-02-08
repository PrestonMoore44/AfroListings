import React, { useEffect, useState, useRef } from "react";
import styles from "./businesslistings.module.css";
import { useRouter } from 'next/router';
import { BsEye, BsBookmark } from "react-icons/bs";

const BusinessListings = () => {
   const editorRef = useRef(null);
   const [arr, setArr] = useState([1,2,3,4,5,6]);

	useEffect(() => {
	}, [])
	
	const profile = () => {
		console.log(" Profile view ");
	}

	const halp = () => {
		console.log(" Help and Support ");
	}

	return (
		<>
		<div className={styles.bgOutterMost}>
			<div>Hello Sammy</div>
		</div>
		</>
	)
}

export default BusinessListings
