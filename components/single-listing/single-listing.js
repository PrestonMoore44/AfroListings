import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./single-listing.module.css";
import { categories } from "../../services/static-data";
import Cover from "../cover/cover";
import SingleCard from "../single-card/single-card";
import SingleListing from "../../components/single-listing/single-listing";
import { getListing } from "../../lib/services/listings-service";
import StarRatings from "react-star-ratings";
import decodeHTMLEntities from "decode-html";
import { htmlEncode } from "htmlencode";
import ReactHtmlParser from "react-html-parser";
import {
	FacebookIcon,
	FacebookMessengerIcon,
	InstapaperIcon,
	LinkedinIcon,
	RedditIcon,
	TwitterIcon,
	WhatsappIcon,
} from "react-share";
/*
	<div className={styles.reviewContainer}>
		<div className={styles.reviewContainerDiv}>4.5</div>
		<StarRatings
			rating={4.5}
			numberOfStars={5}
			starRatedColor="#ec7211"
			starDimension="20px"
			starSpacing="2px"
			starEmptyColor="#DADCE0"
		/>
		<div className={styles.reviewContainerDivAlt}>
			71 Afro Listings Reviews
		</div>
	</div>
*/

const SingleListings = () => {
	const longSTRING = htmlEncode(`<div className={styles.reviewContainer}>
		<p className={styles.reviewContainerDivAlt}>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, <a href="https://www.youtube.com/@TheAngryman"  target="_blank">sed do eiusmod tempor</a> incididunt ut labore et dolore magna aliqua. Nec ullamcorper sit amet risus nullam eget felis. Sociis natoque penatibus et magnis. Elit ut aliquam purus sit amet. Nibh tellus molestie nunc non blandit massa enim nec. Ut tortor pretium viverra suspendisse potenti nullam ac.
		</p>
		<p>Urna condimentum mattis pellentesque id. Mauris pellentesque pulvinar pellentesque habitant. Eu volutpat odio facilisis mauris sit amet massa. Rutrum quisque non tellus orci ac auctor augue. Ipsum dolor sit amet consectetur. </p>
		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nec ullamcorper sit amet risus nullam eget felis. Sociis natoque penatibus et magnis. Elit ut aliquam purus sit amet. Nibh tellus molestie nunc non blandit massa enim nec. Ut tortor pretium viverra suspendisse potenti nullam ac.</p>
		<p>Nec ullamcorper sit amet risus nullam eget felis. Sociis natoque penatibus et magnis. Elit ut aliquam purus sit amet. Ut tortor pretium viverra suspendisse potenti nullam ac.</p>
	</div>`);
	const [listings, setListings] = useState([]);
	const [arr, setArr] = useState([1, 2, 3, 4, 5, 6]);
	const router = useRouter();
	const { lid } = router.query;
	const [listing, setListing] = useState({});
	const [article, setArticle] = useState(null);

	useEffect(() => {
		if (!lid) {
			return;
		}
		setArticle(decodeHTMLEntities(longSTRING));

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
							<i className="bi bi-bookmark"></i>
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
					<div className={styles.postBodyLeft}>
						<div className={styles.imgContainer}>
							<img src={listing.url} className={styles.imgMain} />
						</div>
						<div className={styles.innerBodyContainer}>
							<div>{ReactHtmlParser(article)}</div>
						</div>
					</div>
					<div className={styles.postBodyRight}></div>
				</div>
			</div>
		</>
	);
};

export default SingleListings;
