import styles from "../profile.module.css";
import React, { useEffect, useState } from "react";
import {
	getListings,
	getUserListings,
} from "../../../lib/services/listings-service";
import { useDispatch, useSelector } from "react-redux";
import SingleCard from "../../single-card/single-card";
const Home = () => {
	const [homeListing, setHomeListing] = useState({});
	const fetchListings = async () => {
		const user = JSON.parse(sessionStorage.getItem("user"));
		console.log(user);
		let data = await getUserListings(user?.id);
		setHomeListing(data[0]);
		console.log(data);
	};
	useEffect(() => {
		fetchListings();
	}, []);
	return (
		<div className={styles.bodyMain}>
			<div>
				<SingleCard item={homeListing} alt={true}></SingleCard>
			</div>
		</div>
	);
};

export default Home;
