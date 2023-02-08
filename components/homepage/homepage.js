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
import { CardPopup } from "./card-popup/card-popup";

// Hooks useEffect, useConext, useState, useRef, useLayoutEffect, useTransition
const Homepage = () => {
	const dataRef = useRef();
	const arr = [];
	let start = false;
	const [showFoodItem, setShowFoodItem] = useState([
		false,
		false,
		false,
		false,
	]);
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
	const dataArr = [3, 4, 5, 3, 3, 3, 2, 1, 7, 3, 5, 9, 1, 9, 9, 9, 9, 9, 9]; // test [9,9,9]
	const businessArr = [
		{
			src: "/tutor.jpeg",
			user: "Nancy Cooks",
			title: "Private tutoring with Nancy",
			desc: "Give a child a headstart with tutoring. I'm a teacher with 5 years teaching experience",
		},
		{
			src: "/creditOption.jpeg",
			user: "Credit Master Sean",
			title: "Have an 800 Credit Score Yet",
			desc: "We can get you there! 5 star credit repair at Valley Wide Credit Repair",
		},
		{
			src: "/stylist.jpg",
			user: "Kesha Kay",
			title: "Is Your Hair Ready For The Big Event",
			desc: "Licensed stylist specializing in braids, and dreadlocks",
		},
		{
			src: "/stylist.jpg",
			user: "Kesha Kay",
			title: "Is Your Hair Ready For The Big Event",
			desc: "Licensed stylist specializing in braids, and dreadlocks",
		},
	];
	const restArr = [
		{
			src: "/rest_1.jpg",
			user: "Honey Tea LLC",
			title: "Have You Heard of Just Add Honey Tea Company",
			desc: "Blended tea's for everyone! Sweetened and served just for you",
		},
		{
			src: "/rest_2.jpg",
			user: "Hammin's All Star BBQ",
			title: "Lip Smackin Hammin's BBQ Will Leave You Speachless",
			desc: "Award winning BBQ for the entire family. Pull up and see what everyone's talking about",
		},
		{
			src: "/rest_3.jpg",
			user: "Wendy's Kitchen",
			title: "Wendy's Southern Kitchen Is The Best in the Midwest",
			desc: "Traditional Souther Cousine with a midwest twist",
		},
		{
			src: "/rest_3.jpg",
			user: "Wendy's Kitchen",
			title: "Wendy's Southern Kitchen Is The Best in the Midwest",
			desc: "Traditional Souther Cousine with a midwest twist",
		},
	];
	const housingArr = [
		{
			src: "/housing_1.jpg",
			user: "Paramount Properties LLC",
			title: "Modern 1 Bedroom Studio in Heart of Downtown",
			desc: "In the heart of the much desired downtown district",
		},
		{
			src: "/housing_2.jpg",
			user: "Yannique Golden",
			title: "3 Bedroom 2 Bath Home For Rent in Central Fresno",
			desc: "Spacious home recently remodeled in Central Unified school district",
		},
		{
			src: "/housing_3.jpg",
			user: "AJ For The Win",
			title: "2 Bedroom 1.5 Bath Apartment For Rent in Anticoch",
			desc: "Two story apartment with spacious patio and attached garage",
		},
		{
			src: "/housing_3.jpg",
			user: "AJ For The Win",
			title: "2 Bedroom 1.5 Bath Apartment For Rent in Anticoch",
			desc: "Two story apartment with spacious patio and attached garage",
		},
	];
	const politicsArr = [
		{
			src: "/politics_1.jpg",
			user: "Johnny the Activist",
			title: "Gun Rights Activist Says Black Guns Matter",
			desc: "Private tutoring with Nancy",
		},
		{
			src: "/politics_2.jpg",
			user: "Highlife Movements",
			title: "Why Reparations 2023 May Be Reality For Californian's",
			desc: "5 star credit repair at Valley Wide Credit Repair",
		},
		{
			src: "/politics_3.jpg",
			user: "Tremale Jacobs",
			title: "Why Mattlock Belives He Has The Winning Ticket",
			desc: "Licensed stylist specializing in braids, and dreadlocks",
		},
		{
			src: "/politics_3.jpg",
			user: "Tremale Jacobs",
			title: "Why Mattlock Belives He Has The Winning Ticket",
			desc: "Licensed stylist specializing in braids, and dreadlocks",
		},
	];
	for (let i = dataArr.length - 1; i >= 0; i--) {
		if (dataArr[i] >= 9) {
			start = true;
			dataArr[i] = 0;
			dataArr[i - 1]++;
		} else {
			if (start) {
				break;
			}
		}
	}

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
		console.log(inputRef.current, " Hello Sammy ", passedIn);
		inputRef.current.focus();
		var item = document.getElementById("inputItemSearch");
		// setTimeout(() => {
		// 	item.focus();
		// }, 250);
		console.log(" Hello ", categories);
	}, []);

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
							<div
								onMouseEnter={() =>
									setBusinessCtrl(
										businessCtrl.map(
											(iti, nd) => ind === nd
										)
									)
								}
								onMouseLeave={() =>
									setBusinessCtrl(
										businessCtrl.map((iti, nd) => false)
									)
								}
								className={styles.containerImgHold}
							>
								<img
									className={styles.containerImg}
									key={ind}
									src={it.src}
								/>
								<div className={styles.containerBodyLow}>
									<div className={styles.smallMe}>
										<small>{it.user}</small>
									</div>
									<div className={styles.titleContainer}>
										<div
											className={
												styles.titleContainerTitle
											}
										>
											{it.title}
										</div>
										<div
											className={
												styles.titleContainerOption
											}
										>
											{!!businessCtrl[ind] && (
												<i className="bi bi-three-dots-vertical"></i>
											)}
										</div>
									</div>
									<small>{it.desc}</small>
								</div>
							</div>
						))}
					</div>
					<div className={styles.bottomSection}>
						<p>View All Business Listings</p>
					</div>
				</div>
				<div className={styles.entireItemContainer}>
					<div className={styles.titleItem}>
						Recommended Afro Restaurants and Catering
					</div>
					<div className={styles.style_container}>
						{restArr.map((it, ind) => (
							<div
								onMouseEnter={() =>
									setfoodCtrl(
										foodCtrl.map((iti, nd) => ind === nd)
									)
								}
								onMouseLeave={() =>
									setfoodCtrl(
										foodCtrl.map((iti, nd) => false)
									)
								}
								className={styles.containerImgHold}
							>
								<img
									className={styles.containerImg}
									key={ind}
									src={it.src}
								/>
								<div className={styles.containerBodyLow}>
									<div className={styles.smallMe}>
										<small>{it.user}</small>
									</div>
									<div className={styles.titleContainer}>
										<div
											className={
												styles.titleContainerTitle
											}
										>
											{it.title}
										</div>
										{!!showFoodItem[ind] && <CardPopup />}
										<div
											className={
												styles.titleContainerOption
											}
										>
											{(!!foodCtrl[ind] ||
												!!showFoodItem[ind]) && (
												<i
													onClick={() =>
														setShowFoodItem(
															showFoodItem.map(
																(item, index) =>
																	index ===
																	ind
																		? !item
																		: false
															)
														)
													}
													className="bi bi-three-dots-vertical"
												></i>
											)}
										</div>
									</div>
									<small>{it.desc}</small>
								</div>
							</div>
						))}
					</div>
					<div className={styles.bottomSection}></div>
				</div>
				<div className={styles.entireItemContainer}>
					<div className={styles.titleItem}>
						Recommended Afro Real Estate and Housing
					</div>
					<div className={styles.style_container}>
						{housingArr.map((it, ind) => (
							<div
								onMouseEnter={() =>
									setHousingCtrl(
										housingCtrl.map((iti, nd) => ind === nd)
									)
								}
								onMouseLeave={() =>
									setHousingCtrl(
										housingCtrl.map((iti, nd) => false)
									)
								}
								className={styles.containerImgHold}
							>
								<img
									className={styles.containerImg}
									key={ind}
									src={it.src}
								/>
								<div className={styles.containerBodyLow}>
									<div className={styles.smallMe}>
										<small>{it.user}</small>
									</div>
									<div className={styles.titleContainer}>
										<div
											className={
												styles.titleContainerTitle
											}
										>
											{it.title}
										</div>
										<div
											className={
												styles.titleContainerOption
											}
										>
											{!!housingCtrl[ind] && (
												<i className="bi bi-three-dots-vertical"></i>
											)}
										</div>
									</div>
									<small>{it.desc}</small>
								</div>
							</div>
						))}
					</div>
					<div className={styles.bottomSection}></div>
				</div>
				<div className={styles.entireItemContainer}>
					<div className={styles.titleItem}>
						Afro Politics and Social Media
					</div>
					<div className={styles.style_container}>
						{politicsArr.map((it, ind) => (
							<div
								onMouseEnter={() =>
									setPoliticsCtrl(
										politicsCtrl.map(
											(iti, nd) => ind === nd
										)
									)
								}
								onMouseLeave={() =>
									setPoliticsCtrl(
										politicsCtrl.map((iti, nd) => false)
									)
								}
								className={styles.containerImgHold}
							>
								<img
									className={styles.containerImg}
									key={ind}
									src={it.src}
								/>
								<div className={styles.containerBodyLow}>
									<div className={styles.smallMe}>
										<small>{it.user}</small>
									</div>
									<div className={styles.titleContainer}>
										<div
											className={
												styles.titleContainerTitle
											}
										>
											{it.title}
										</div>
										<div
											className={
												styles.titleContainerOption
											}
										>
											{!!politicsCtrl[ind] && (
												<i className="bi bi-three-dots-vertical"></i>
											)}
										</div>
									</div>
									<small>{it.desc}</small>
								</div>
							</div>
						))}
					</div>
					<div className={styles.bottomSection}></div>
				</div>
			</div>
		</div>
	);
};

export default Homepage;
