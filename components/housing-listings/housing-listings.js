import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./housing-listings.module.css";
import { categories } from "../../services/static-data";
import Cover from "../cover/cover";
import SingleCard from "../single-card/single-card";
import { getListings } from "../../lib/services/listings-service";

const HousingListings = () => {
	const router = useRouter();
	const [listings, setListings] = useState([]);
	const [arr, setArr] = useState([1, 2, 3, 4, 5, 6]);

	useEffect(() => {
		if (router?.query?.listings) {
			setListings(JSON.parse(router.query.listings));
		} else {
			fetchListings();
		}
	}, [router]);

	const fetchListings = async () => {
		let data = await getListings();
		if (!router?.query?.type) {
			setListings(
				data.filter(
					({ category_name, subcategory_name }) =>
						category_name.toLowerCase() === "housing"
				)
			);
		} else {
			setListings(
				data.filter(
					({ category_name, subcategory_name, subcategory }) =>
						subcategory_name === router?.query?.type
				)
			);
		}
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
			<div className={"sectionTitle"}>HOUSING</div>
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
