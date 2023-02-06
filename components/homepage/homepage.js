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

// Hooks useEffect, useConext, useState, useRef, useLayoutEffect, useTransition
const Homepage = () => {
	const arr = [];
	let start = false;
	const dataArr = [3, 4, 5, 3, 3, 3, 2, 1, 7, 3, 5, 9, 1, 9, 9, 9, 9, 9, 9]; // test [9,9,9]
	const businessArr = [
		{
			src: "/tutor.jpeg",
			desc: "Private tutoring with Nancy",
		},
		{
			src: "/creditOption.jpeg",
			desc: "5 star credit repair at Valley Wide Credit Repair",
		},
		{
			src: "/stylist.jpg",
			desc: "Licensed stylist specializing in braids, and dreadlocks",
		},
	];
	const restArr = [
		{
			src: "/rest_1.jpg",
			desc: "Private tutoring with Nancy",
		},
		{
			src: "/rest_2.jpg",
			desc: "5 star credit repair at Valley Wide Credit Repair",
		},
		{
			src: "/rest_3.jpg",
			desc: "Licensed stylist specializing in braids, and dreadlocks",
		},
	];
	const housingArr = [
		{
			src: "/housing_1.jpg",
			desc: "Private tutoring with Nancy",
		},
		{
			src: "/housing_2.jpg",
			desc: "5 star credit repair at Valley Wide Credit Repair",
		},
		{
			src: "/housing_3.jpg",
			desc: "Licensed stylist specializing in braids, and dreadlocks",
		},
	];
	const politicsArr = [
		{
			src: "/politics_1.jpg",
			desc: "Private tutoring with Nancy",
		},
		{
			src: "/politics_2.jpg",
			desc: "5 star credit repair at Valley Wide Credit Repair",
		},
		{
			src: "/politics_3.jpg",
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

	console.log(
		[3, 4, 5, 3, 3, 3, 2, 1, 7, 3, 5, 9, 1, 9, 9, 9, 9, 9, 9],
		" Orginal then new ",
		dataArr
	);

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
							Highest Rated Afro Business Services Directory
							Worldwide, The Best Afro Travel, Afro Education
							Directory
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
				</div>
				<video autoPlay muted loop id="myVideo">
					<source
						src="https://newbucketpj.s3.us-west-1.amazonaws.com/BGMovieMin.mp4"
						type="video/mp4"
					></source>
				</video>
			</div>
			<div className={styles.containerTitle}>
				<div className="my-5">
					<h2>
						<a href="business-listings">Afro Businesses</a>
					</h2>
					<div className={styles.style_container}>
						{businessArr.map((it, ind) => (
							<div className={styles.containerImgHold}>
								<img
									className={styles.containerImg}
									key={ind}
									src={it.src}
								/>
								<p>{it.desc}</p>
							</div>
						))}
					</div>
				</div>
				<div className="my-1">
					<h2>Afro Restaurants and Catering</h2>
					<div className={styles.style_container}>
						{restArr.map((it, ind) => (
							<div className={styles.containerImgHold}>
								<img
									className={styles.containerImg}
									key={ind}
									src={it.src}
								/>
								<p>{it.desc}</p>
							</div>
						))}
					</div>
				</div>
				<div className="my-1">
					<h2>Afro Real Estate and Housing</h2>
					<div className={styles.style_container}>
						{housingArr.map((it, ind) => (
							<div className={styles.containerImgHold}>
								<img
									className={styles.containerImg}
									key={ind}
									src={it.src}
								/>
								<p>{it.desc}</p>
							</div>
						))}
					</div>
				</div>
				<div className="my-1">
					<h2>Afro Politics and Social Media</h2>
					<div className={styles.style_container}>
						{politicsArr.map((it, ind) => (
							<div className={styles.containerImgHold}>
								<img
									className={styles.containerImg}
									key={ind}
									src={it.src}
								/>
								<p>{it.desc}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Homepage;
