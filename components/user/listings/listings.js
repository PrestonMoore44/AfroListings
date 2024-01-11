import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from 'react-redux';
import { GoTriangleUp } from "react-icons/go";
import styles from "./listings.module.css";
import CreateListings from "../../modals/create-listings/create-listings";

const Listings = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const showNewListing = useSelector((store) => store.showNewListing);
	const user = useSelector((store) => store.user);
	useEffect(() => {
		console.log(user, " User from store  from Listings ");
	}, [user]);

	return (
		<>
		<div className={styles.container}>
			Listings... 
		</div>
		{ showNewListing && (
		<div className={styles.createContainer}>
			<CreateListings></CreateListings>
		</div>
		)}
		</>
	)
}

export default Listings
