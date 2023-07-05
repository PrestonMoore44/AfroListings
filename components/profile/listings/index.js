import React, { useEffect, useState } from "react";
import styles from "../profile.module.css";
import {
	getListings,
	getUserListings,
} from "../../../lib/services/listings-service";
import { useDispatch, useSelector } from "react-redux";
import SingleCard from "../../single-card/single-card";
import { useRouter } from "next/router";

const Listings = () => {
	const router = useRouter();
	const [listings, setListings] = useState([]);
	useEffect(() => {
		if (router.isReady) {
			fetchListings();
		}
	}, [router.isReady]);

	const fetchListings = async () => {
		const user = JSON.parse(sessionStorage.getItem("user"));
		let data = await getUserListings(router?.query?.handle);
		setListings(data);
	};
	return (
		<div className={styles.cardContainer}>
			<div className={styles.listBody}>
				{listings.map((it, i) => (
					<div className={styles.listBodyItem} key={i}>
						<SingleCard item={it} index={i}></SingleCard>
					</div>
				))}
			</div>
		</div>
	);
};

export default Listings;
