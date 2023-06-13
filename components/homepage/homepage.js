import React, {
	useEffect,
	useState,
	useContext,
	useTransition,
	useRef,
} from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { Button } from "@material-ui/core";
import styles from "./homepage.module.css";
import { geoLocation } from "../../services/userServices";
import { categories } from "../../services/static-data";
import { AppTheme } from "../../pages/_app";
import CardPopup from "./card-popup/card-popup";
import SingleCard from "../single-card/single-card";
import Cover from "../cover/cover";
import { getListings } from "../../lib/services/listings-service";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const Homepage = () => {
	const router = useRouter();
	const dataRef = useRef();
	const [businessArr, setBusinessArr] = useState([]);
	const [housingArr, setHousingArr] = useState([]);
	const [politicsArr, setPoliticsArr] = useState([]);
	const [restArr, setRestArr] = useState([]);
	const [influencerArr, setInfluencerArr] = useState([]);
	const [travelArr, setTravelArr] = useState([]);
	const [load, setLoad] = useState(false);
	let start = false;

	useEffect(() => {
		setLoad(true);
	}, []);

	useEffect(() => {
		if (load) {
			setTimeout(() => {
				[
					".apple",
					".orange",
					".grape",
					".kiwi",
					".lemon",
					".lime",
				].forEach((name) => {
					gsap.fromTo(
						name,
						{
							y: 80,
							opacity: 0,
						},
						{
							scrollTrigger: {
								trigger: name,
								toggleActions:
									"play complete complete complete",
								start: "top bottom",
							},
							ease: "in",
							duration: 0.5,
							x: 0,
							y: 0,
							opacity: 1,
						}
					);
				});
			});
		}
	}, [load]);

	const scrollDown = () => {
		dataRef.current.scrollIntoView({ behavior: "smooth" });
	};

	const [type, setType] = useState("");
	const [showCategories, setShowCategories] = useState(false);
	const [location, setLocation] = useState("");

	// useRef example
	const inputRef = useRef();

	//useContext example
	const passedIn = useContext(AppTheme);

	useEffect(() => {
		fetchListings();
		inputRef?.current?.focus();
		var item = document.getElementById("inputItemSearch");
	}, []);

	const fetchListings = async () => {
		let data = await getListings();
		//category_name: "Housing"
		setBusinessArr(
			data
				.filter(
					({ category_name }) =>
						category_name.toLowerCase() === "business"
				)
				.slice(0, 4)
		);
		setPoliticsArr(
			data
				.filter(
					({ category_name }) =>
						category_name.toLowerCase() === "politics"
				)
				.slice(0, 4)
		);
		setRestArr(
			data
				.filter(
					({ category_name }) =>
						category_name.toLowerCase() === "food"
				)
				.slice(0, 4)
		);
		setHousingArr(
			data
				.filter(
					({ category_name }) =>
						category_name.toLowerCase() === "housing"
				)
				.slice(0, 4)
		);
		setInfluencerArr(
			data
				.filter(
					({ category_name }) =>
						category_name.toLowerCase() === "media influencers"
				)
				.slice(0, 4)
		);
		setTravelArr(
			data
				.filter(
					({ category_name }) =>
						category_name.toLowerCase() === "travel"
				)
				.slice(0, 4)
		);
	};

	const navigateAway = (url) => {
		router.push(url);
	};

	const handleCategoryChange = (value) => {
		setShowCategories(value.length);
		setType(value);
	};

	const findLocation = async () => {
		const data = await geoLocation();
		console.log(data, " Locations ");
		setLocation(data.postal);
	};

	const setCategory = (type) => {
		console.log(type);
		setType(type);
		setShowCategories(false);
	};

	const responseGoogle = (response) => {
		console.log(response);
	};

	return (
		<div className={styles.homepageContainerMain}>
			<Cover
				scrollDown={scrollDown}
				inputRef={inputRef}
				type={type}
				categories={categories}
				setType={setType}
				showCategories={showCategories}
				setCategory={setCategory}
				handleCategoryChange={handleCategoryChange}
				bgMedia="https://newbucketpj.s3.us-west-1.amazonaws.com/BGMovieMin.mp4"
			></Cover>
			<div
				className={`${styles.containerTitle} apple_container`}
				ref={dataRef}
			>
				<div className={`${styles.entireItemContainer} apple`}>
					<div className={`${styles.titleItem} `}>
						Recommended Businesses
					</div>
					<div className={styles.style_container}>
						{businessArr.map((it, ind) => (
							<SingleCard
								item={it}
								key={ind}
								ind={ind}
								categories={categories}
							></SingleCard>
						))}
					</div>
					<div className={styles.bottomSection}>
						<p onClick={() => navigateAway("business-listings")}>
							View All Business Listings
						</p>
					</div>
				</div>
				<div className={`${styles.entireItemContainer} orange`}>
					<div className={styles.titleItem}>Recommended Travel</div>
					<div className={styles.style_container}>
						{travelArr.map((it, ind) => (
							<SingleCard
								key={ind}
								item={it}
								ind={ind}
							></SingleCard>
						))}
					</div>
					<div className={styles.bottomSection}>
						<p onClick={() => navigateAway("travel-listings")}>
							View All Travel Listings
						</p>
					</div>
				</div>
				<div className={`${styles.entireItemContainer} grape`}>
					<div className={styles.titleItem}>
						Recommended Social Media Influencers
					</div>
					<div className={styles.style_container}>
						{influencerArr.map((it, ind) => (
							<SingleCard
								key={ind}
								item={it}
								ind={ind}
							></SingleCard>
						))}
					</div>
					<div className={styles.bottomSection}>
						<p onClick={() => navigateAway("influencer-listings")}>
							View All Social Media Influencer Listings
						</p>
					</div>
				</div>
				<div className={`${styles.entireItemContainer} kiwi`}>
					<div className={styles.titleItem}>
						Recommended Restaurants and Catering
					</div>
					<div className={styles.style_container}>
						{restArr.map((it, ind) => (
							<SingleCard
								key={ind}
								item={it}
								ind={ind}
							></SingleCard>
						))}
					</div>
					<div className={styles.bottomSection}>
						<p onClick={() => navigateAway("business-listings")}>
							View All Restaurants and Catering Listings
						</p>
					</div>
				</div>
				<div className={`${styles.entireItemContainer} lime`}>
					<div className={styles.titleItem}>
						Recommended Real Estate and Housing
					</div>
					<div className={styles.style_container}>
						{housingArr.map((it, ind) => (
							<SingleCard
								key={ind}
								item={it}
								ind={ind}
							></SingleCard>
						))}
					</div>
					<div className={styles.bottomSection}>
						<p onClick={() => navigateAway("housing-listings")}>
							View All Housing Listings
						</p>
					</div>
				</div>
				<div className={`${styles.entireItemContainer} lemon`}>
					<div className={styles.titleItem}>
						Politics and Social Media
					</div>
					<div className={styles.style_container}>
						{politicsArr.map((it, ind) => (
							<SingleCard
								key={ind}
								item={it}
								ind={ind}
							></SingleCard>
						))}
					</div>
					<div className={styles.bottomSection}>
						<p onClick={() => navigateAway("housing-listings")}>
							View All Politic Listings
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Homepage;
