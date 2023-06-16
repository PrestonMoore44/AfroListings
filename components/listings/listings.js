import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./listings.module.css";
import { categories } from "../../services/static-data";
import Cover from "../cover/cover";
import SingleCard from "../single-card/single-card";
import {
	getListings,
	listingsSearch,
} from "../../lib/services/listings-service";

const Listings = () => {
	const router = useRouter();
	const [listings, setListings] = useState([]);
	useEffect(() => {
		getListings(router.query.search);
	}, [router]);

	const getListings = async (type) => {
		const tmpListings = await listingsSearch("", type);
		console.log(tmpListings);
		setListings(tmpListings);
	};

	return (
		<>
			<div className={styles.homepageContainerMain}>
				<Cover
					fromTop="0 -225px"
					listings={listings}
					bgMedia="https://newbucketpj.s3.us-west-1.amazonaws.com/housing.jpeg"
				></Cover>
			</div>
			<div className={styles.bussinessBody}>
				<div className={styles.bussinessSides}></div>
				<div className={styles.bussinessCenter}></div>
				<div className={styles.bussinessSides}></div>
			</div>
			<div className={"sectionTitle"}>
				Search{" "}
				<i
					style={{
						background: "#F8F9FC",
						borderRadius: 10,
						padding: 5,
					}}
				>
					"{router?.query?.search}"
				</i>
			</div>
			<div className={`${styles.bussinessBody}`}>
				{listings.map((it, ind) => (
					<div className={styles.style_container} key={ind}>
						<SingleCard
							item={it}
							ind={ind}
							categories={categories}
						></SingleCard>
					</div>
				))}
				{listings.length === 0 && (
					<i style={{ paddingLeft: 20 }}>No results found</i>
				)}
			</div>
		</>
	);
};

export default Listings;
