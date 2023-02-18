import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./influencer-listings.module.css";
import { categories } from "../../services/static-data";
import Cover from "../cover/cover";
import SingleCard from "../single-card/single-card";
import { getListings } from "../../lib/services/listings-service";

const InfluencerListings = () => {
	const [listings, setListings] = useState([]);
	const [arr, setArr] = useState([1, 2, 3, 4, 5, 6]);

	useEffect(() => {
		fetchListings();
	}, []);

	const fetchListings = async () => {
		console.log(" Grabbing listings... ");
		let data = await getListings();
		setListings(data.filter((it) => it.type === "influencer"));
		console.log(data, " Listings? ");
	};

	return (
		<>
			<div className={styles.homepageContainerMain}>
				<Cover
					fromTop="0 -225px"
					listings={listings}
					bgMedia="https://newbucketpj.s3.us-west-1.amazonaws.com/InfluencerMain.jpeg"
				></Cover>
			</div>
			<div className={styles.bussinessBody}>
				<div className={styles.bussinessSides}></div>
				<div className={styles.bussinessCenter}></div>
				<div className={styles.bussinessSides}></div>
			</div>
			<div className={styles.sectionTitle}>SOCIAL MEDIA INFLUENCERS</div>
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

export default InfluencerListings;
