import React, { useEffect, useState, useRef } from "react";
import styles from "./businesslistings.module.css";
import { useRouter } from "next/router";
import { getListings } from "../../lib/services/listings-service";
import { categories } from "../../services/static-data";
import Cover from "../cover/cover";
import SingleCard from "../single-card/single-card";

const BusinessListings = () => {
	const router = useRouter();
	const editorRef = useRef(null);
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
		// If type is listed filter else show business listings
		if (!router?.query?.type) {
			setListings(
				data.filter(
					({ category_name, subcategory_name }) =>
						category_name.toLowerCase() === "business"
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
					listings={listings}
					bgMedia="https://newbucketpj.s3.us-west-1.amazonaws.com/businessBG.jpeg"
				></Cover>
			</div>
			<div className={styles.bussinessBody}>
				<div className={styles.bussinessSides}></div>
				<div className={styles.bussinessCenter}></div>
				<div className={styles.bussinessSides}></div>
			</div>
			<div className={"sectionTitle"}>BUSINESS</div>
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
			</div>
		</>
	);
};

export default BusinessListings;
