import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./housing-listings.module.css";
import { categories } from "../../services/static-data";
import Cover from "../cover/cover";
import SingleCard from "../single-card/single-card";
import { getListings } from "../../lib/services/listings-service";

const HousingListings = () => {
	const [listings, setListings] = useState([]);
	const [arr, setArr] = useState([1, 2, 3, 4, 5, 6]);

	useEffect(() => {
		fetchListings();
	}, []);

	const fetchListings = async () => {
		console.log(" Grabbing listings... ");
		let data = await getListings();
		setListings(data.filter((it) => it.type === "housing"));
		console.log(data, " Listings? ");
	};

	return (
		<>
			<div className={styles.homepageContainerMain}>
				<Cover
					listings={listings}
					bgMedia="https://newbucketpj.s3.us-west-1.amazonaws.com/businessBG.jpeg"
				></Cover>
			</div>
			<div className={styles.bussinessBody}>
				<div className={styles.bussinessSides}></div>
				<div className={styles.bussinessCenter}></div>
				<div className={styles.bussinessSides}></div>
			</div>
			<div className={styles.sectionTitle}>HOUSING</div>
			<div className={`${styles.bussinessBody}`}>
				{listings.map((it, ind) => (
					<div className={styles.style_container} key={it.id}>
						<SingleCard
							item={it}
							ind={ind}
							categories={categories}
						></SingleCard>
					</div>
				))}
			</div>
		</>
	);
};

export default HousingListings;
