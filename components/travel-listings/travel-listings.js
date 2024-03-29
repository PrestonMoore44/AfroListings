import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getListings } from "../../lib/services/listings-service";
import { categories } from "../../services/static-data";
import Cover from "../cover/cover";
import styles from "./travel-listings.module.css";
import SingleCard from "../single-card/single-card";
import { useDispatch, useSelector } from "react-redux";

const TravelListings = () => {
	const router = useRouter();
	const [listings, setListings] = useState([]);
	const [arr, setArr] = useState([1, 2, 3, 4, 5, 6]);
	const { categories, subCategories } = useSelector((store) => store);

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
						category_name.toLowerCase() === "travel"
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
		console.log(data, " Listings filtered");
	};

	return (
		<>
			<div className={styles.homepageContainerMain}>
				<Cover
					fromTop="0 -125px"
					listings={listings}
					bgMedia="https://newbucketpj.s3.us-west-1.amazonaws.com/travelMain.jpeg"
				></Cover>
			</div>
			<div className={styles.bussinessBody}>
				<div className={styles.bussinessSides}></div>
				<div className={styles.bussinessCenter}></div>
				<div className={styles.bussinessSides}></div>
			</div>
			<div className={"sectionTitle"}>TRAVEL</div>
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

export default TravelListings;
