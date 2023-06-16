import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "./cover.module.css";
import { BiLocationPlus } from "react-icons/bi";
import { Button } from "@material-ui/core";
import { pageTitles, convertToUrl } from "../../public/utils/static-data";
import { useDispatch, useSelector } from "react-redux";
import {
	listingsByParams,
	listingsSearch,
	routeMap,
} from "../../lib/services/listings-service";
import { gsap } from "gsap/dist/gsap";
import { SplitText } from "gsap/dist/SplitText";
if (process.client) gsap.registerPlugin(SplitText);

const Cover = ({
	inputRef,
	handleCategoryChange,
	setCategory,
	scrollDown,
	type = "",
	setType,
	fromTop,
	showCategories,
	bgMedia,
}) => {
	const route = useRouter();
	const [titleObj, setTitleObj] = useState({});
	const [location, setLocation] = useState("");
	const [showTitle, setShowTitle] = useState(false);
	const [comboCategories, setComboCategories] = useState([]);
	const { categories = [], subCategories = [] } = useSelector(
		(store) => store
	);

	const handleKeyPress = (e) => {
		console.log(e);
		if (e.key === "Enter") {
			searchByParams();
		}
	};

	const searchByParams = async () => {
		let listings;
		let format_type = type.toLowerCase().trim();

		if (routeMap[format_type]) {
			// User selected category from dropdown
			listings = await listingsByParams(location, type);
			console.log(listings);
			route.push(
				{
					pathname: routeMap[format_type].split("?")[0],
					query: { listings: JSON.stringify(listings) },
				},
				routeMap[format_type]
			);
		} else {
			// Search by title maybe later by zip
			route.push({
				pathname: "/listings",
				query: { search: type },
			});
		}
	};
	const findLocation = async () => {
		function httpGetAsync(url, callback) {
			const xmlHttp = new XMLHttpRequest();
			xmlHttp.onreadystatechange = function () {
				if (xmlHttp.readyState === 4 && xmlHttp.status === 200)
					callback(xmlHttp.responseText);
			};
			xmlHttp.open("GET", url, true); // true for asynchronous
			xmlHttp.send(null);
		}

		const url = `https://ipgeolocation.abstractapi.com/v1/?api_key=33d8c230d12842a78de2dfbc2ca2cd13`;
		httpGetAsync(url, (resp) => {
			setLocation(JSON.parse(resp).postal_code);
		});
	};

	const updateInput = (e) => {
		setComboCategories(
			[...categories, ...subCategories]
				.filter(({ val }) =>
					val.toLowerCase().includes(type.toLowerCase())
				)
				.sort((a, b) => (a.val < b.val ? -1 : a.val > b.val ? 1 : 0))
				.slice(0, 10)
		);
		handleCategoryChange(e);
	};

	useEffect(() => {
		if (showTitle) {
			var yourElement = document.getElementById("title");
			setTimeout(() => {
				gsap.set("#subTitle", { perspective: 400, x: -80, opacity: 0 });
				gsap.to("#subTitle", {
					duration: 1,
					opacity: 1,
					x: 0,
					delay: 0.9,
					ease: "in",
				});
			});
			setTimeout(() => {
				gsap.set("#inputCont", { y: 65, opacity: 0 });
				gsap.to("#inputCont", {
					opacity: 1,
					duration: 0.7,
					y: 0,
					delay: 1.4,
				});
			});
			if (yourElement) {
				var split = new SplitText(yourElement);
				var tl = gsap.timeline(),
					mySplitText = new SplitText("#title", {
						type: "words,chars",
					}),
					chars = mySplitText.chars; //an array of all the divs that wrap each character

				gsap.set("#title", { perspective: 400 });
				gsap.from(split.chars, {
					duration: 0.6,
					opacity: 0,
					x: -25,
					y: 3,
					ease: "in",
					autoAlpha: 0,
					stagger: 0.02,
				});
			}
		}
	}, [showTitle]);

	useState(() => {
		setTitleObj(pageTitles[route.pathname]);
		console.log(pageTitles[route.pathname]);
		setComboCategories([...categories, ...subCategories]);
		setShowTitle(true);
	}, []);

	useState(() => {
		if (route.pathname === "/" && inputRef.current) {
			setTimeout(() => {
				inputRef.current.focus();
			}, 1000);
		}
	}, [route]);

	return (
		<div
			className={`${styles.homepageContainer} ${
				route.pathname !== "/" ? styles.homepageAltHeight : null
			}`}
		>
			<div className={styles.homepageOverlay}>
				<div className={`position-relative`}>
					{showTitle && (
						<div id="title" className={styles.titleText}>
							{titleObj?.title}
						</div>
					)}
					<h5 id="subTitle" className="m-3" style={{ opacity: 0 }}>
						{titleObj?.subTitle}
					</h5>
					{route.pathname === "/" && (
						<div
							className={`${styles.searchContainer} p-3 mt-3 form-inline`}
							id="inputCont"
							style={{ opacity: 0 }}
						>
							<div
								className={`${styles.itemHolder} form-group m-2 rounded`}
							>
								<span>Type</span>
								<input
									ref={inputRef}
									type="search"
									className={styles.inputMain}
									onKeyPress={handleKeyPress}
									id="inputItemSearch"
									autoComplete="false"
									onChange={(e) =>
										updateInput(e.target.value)
									}
									value={type}
									placeholder="Ex: listing title or category"
								/>
								<div
									className={`${styles.categoriesContainer} ${
										showCategories && comboCategories.length
											? styles.display
											: null
									}`}
								>
									{comboCategories.map(function (item, i) {
										return (
											<div
												tabIndex={0}
												className={
													styles.categoriesContainerDiv
												}
												key={i}
												onClick={() =>
													setCategory(item.val)
												}
											>
												{item.val.toUpperCase()}
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
									onKeyPress={handleKeyPress}
									autoComplete="false"
									onChange={(e) =>
										setLocation(e.target.value)
									}
									value={location}
									placeholder="zip, city or state"
								/>
							</div>
							<Button
								className={`${styles.btn} m-2`}
								onClick={searchByParams}
								variant="contained"
								onKeyPress={handleKeyPress}
							>
								Search
							</Button>
						</div>
					)}
				</div>
				{route.pathname === "/" && (
					<div className={styles.chevronHolder}>
						<i
							className={"bi bi-chevron-down"}
							onClick={scrollDown}
						></i>
					</div>
				)}
			</div>
			{route.pathname === "/" ? (
				<video autoPlay muted id="myVideo" loop>
					<source src={bgMedia} type="video/mp4"></source>
				</video>
			) : (
				<img
					className={styles.backgroundImg}
					src={bgMedia}
					style={{ objectPosition: fromTop ? fromTop : "0 -50px" }}
				/>
			)}
		</div>
	);
};

export default Cover;
