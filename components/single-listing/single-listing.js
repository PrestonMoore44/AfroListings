import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./single-listing.module.css";
import { categories } from "../../services/static-data";
import Cover from "../cover/cover";
import SingleCard from "../single-card/single-card";
import SingleListing from "../../components/single-listing/single-listing";
import { getListing } from "../../lib/services/listings-service";
import {
	FacebookIcon,
	FacebookMessengerIcon,
	InstapaperIcon,
	LinkedinIcon,
	RedditIcon,
	TwitterIcon,
	WhatsappIcon,
} from "react-share";

const SingleListings = () => {
	const [listings, setListings] = useState([]);
	const [arr, setArr] = useState([1, 2, 3, 4, 5, 6]);
	const router = useRouter();
	const { lid } = router.query;
	const [listing, setListing] = useState({});

	useEffect(() => {
		if (!lid) {
			return;
		}
		fetchListing(lid);
	}, [lid]);

	const fetchListing = async (lid) => {
		let data = await getListing(lid);
		console.log(data, " Listing info");
		setListing(data);
	};

	return (
		<>
			<div className={styles.postOutterContainer}>
				<div className={styles.topBody}>
					<div className={styles.title}>{listing.title}</div>
					<div className={styles.subTitle}>{listing.description}</div>
					<div className={styles.byAndDate}>
						<span className={styles.greyMe}>By</span>{" "}
						<span className="text-decoration-underline user-select-all pe-auto">
							{listing.username}
						</span>
						<span className={styles.greyMe}>
							{" "}
							| {new Date(listing.creationdate).toDateString()}
						</span>
					</div>
					<div className={styles.actionsContainer}>
						<div className={styles.saveContainer}>
							<i class="bi bi-bookmark"></i>
							<span>Save</span>
						</div>
						<div>
							<FacebookIcon size={32} round={true} />
						</div>
						<div>
							<TwitterIcon size={32} round={true} />
						</div>
						<div>
							<LinkedinIcon size={32} round={true} />
						</div>
						<div>
							<RedditIcon size={32} round={true} />
						</div>
					</div>
				</div>
				<div className={styles.postBody}>
					<img src={listing.url} className={styles.imgMain} />
				</div>
			</div>
		</>
	);
};

export default SingleListings;
