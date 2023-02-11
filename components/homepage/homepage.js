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
import { BiLocationPlus } from "react-icons/bi";
import { categories } from "../../services/static-data";
import { AppTheme } from "../../pages/_app";
import CardPopup from "./card-popup/card-popup";
import SingleCard from "../single-card/single-card";
import {
	businessArr,
	restArr,
	housingArr,
	politicsArr,
} from "../../public/utils/static-data";

// Hooks useEffect, useConext, useState, useRef, useLayoutEffect, useTransition
const Homepage = () => {
	const router = useRouter();
	const dataRef = useRef();
	const arr = [];
	let start = false;

	// Item control by 4 categories --->
	const [showFoodItem, setShowFoodItem] = useState([
		false,
		false,
		false,
		false,
	]);

	const [showRealEstateItem, setShowRealEstateItem] = useState([
		false,
		false,
		false,
		false,
	]);

	const [showBusinessItem, setShowBusinessItem] = useState([
		false,
		false,
		false,
		false,
	]);

	const [showPoliticsItem, setShowPoliticsItem] = useState([
		false,
		false,
		false,
		false,
	]);
	// <--- End of item control

	const [businessCtrl, setBusinessCtrl] = useState([
		false,
		false,
		false,
		false,
	]);

	const [foodCtrl, setfoodCtrl] = useState([false, false, false, false]);

	const [housingCtrl, setHousingCtrl] = useState([
		false,
		false,
		false,
		false,
	]);

	const [politicsCtrl, setPoliticsCtrl] = useState([
		false,
		false,
		false,
		false,
	]);
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
		inputRef.current.focus();
		var item = document.getElementById("inputItemSearch");
	}, []);

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
			<div className={styles.homepageContainer}>
				<div className={styles.homepageOverlay}>
					<div className={`position-relative`}>
						<div className={styles.titleText}>
							Afro Business, Afro Education, Afro Community
						</div>
						<h5 className="m-3">
							Largest Black Owned Businesses Directory Worldwide
						</h5>
						<div
							className={`${styles.searchContainer} p-3 mt-3 form-inline`}
						>
							<div
								className={`${styles.itemHolder} form-group m-2 rounded`}
							>
								<span>Type</span>
								<input
									ref={inputRef}
									type="search"
									id="inputItemSearch"
									autoComplete="false"
									onChange={(e) =>
										handleCategoryChange(e.target.value)
									}
									value={type}
									placeholder="Ex: business, service, food"
								/>
								<div
									className={`${styles.categoriesContainer} ${
										showCategories ? styles.display : null
									}`}
								>
									{categories.map(function (item, i) {
										return (
											<div
												key={i}
												onClick={() =>
													setCategory(item)
												}
											>
												{item}
											</div>
										);
									})}
								</div>
							</div>
							<div
								className={`${styles.itemHolder} form-group m-2 rounded`}
							>
								<span>Location</span>
								<span
									onClick={findLocation}
									className={styles.iconHolder}
								>
									<BiLocationPlus></BiLocationPlus>
								</span>
								<input
									className={styles.itemHolderLast}
									type="search"
									autoComplete="false"
									onChange={(e) =>
										setLocation(e.target.value)
									}
									value={location}
									placeholder="Zip code, city or state"
								/>
							</div>
							<Button
								className={`${styles.btn} m-2`}
								variant="contained"
							>
								Search
							</Button>
						</div>
					</div>
					<div className={styles.chevronHolder}>
						<i class="bi bi-chevron-down" onClick={scrollDown}></i>
					</div>
				</div>
				<video autoPlay muted loop id="myVideo">
					<source
						src="https://newbucketpj.s3.us-west-1.amazonaws.com/BGMovieMin.mp4"
						type="video/mp4"
					></source>
				</video>
			</div>
			<div className={styles.containerTitle} ref={dataRef}>
				<div className={styles.entireItemContainer}>
					<div className={styles.titleItem}>
						Recommended Afro Businesses
					</div>
					<div className={styles.style_container}>
						{businessArr.map((it, ind) => (
							<SingleCard item={it} ind={ind}></SingleCard>
						))}
					</div>
					<div className={styles.bottomSection}>
						<p onClick={() => navigateAway("business-listings")}>
							View All Business Listings
						</p>
					</div>
				</div>
				<div className={styles.entireItemContainer}>
					<div className={styles.titleItem}>
						Recommended Afro Restaurants and Catering
					</div>
					<div className={styles.style_container}>
						{restArr.map((it, ind) => (
							<SingleCard item={it} ind={ind}></SingleCard>
						))}
					</div>
					<div className={styles.bottomSection}>
						<p onClick={() => navigateAway("business-listings")}>
							View All Restaurants and Catering Listings
						</p>
					</div>
				</div>
				<div className={styles.entireItemContainer}>
					<div className={styles.titleItem}>
						Recommended Afro Real Estate and Housing
					</div>
					<div className={styles.style_container}>
						{housingArr.map((it, ind) => (
							<SingleCard item={it} ind={ind}></SingleCard>
						))}
					</div>
					<div className={styles.bottomSection}>
						<p onClick={() => navigateAway("housing-listings")}>
							View All Housing Listings
						</p>
					</div>
				</div>
				<div className={styles.entireItemContainer}>
					<div className={styles.titleItem}>
						Afro Politics and Social Media
					</div>
					<div className={styles.style_container}>
						{politicsArr.map((it, ind) => (
							<SingleCard item={it} ind={ind}></SingleCard>
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
