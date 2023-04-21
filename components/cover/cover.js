import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "./cover.module.css";
import { BiLocationPlus } from "react-icons/bi";
import { Button } from "@material-ui/core";
import { pageTitles, convertToUrl } from "../../public/utils/static-data";
import { useDispatch, useSelector } from "react-redux";
import { listingsByParams } from "../../lib/services/listings-service";

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
	const [comboCategories, setComboCategories] = useState([]);
	const { categories = [], subCategories = [] } = useSelector(
		(store) => store
	);

	const searchByParams = async () => {
		console.log(location, type);
		const listings = await listingsByParams(location, type);
		console.log(listings);
		// const item = comboCategories.filter(
		// 	(it) => it.val.toLowerCase() === type.toLowerCase()
		// )[0];
		// const category = categories.filter(
		// 	(it) => it.id === item.categoryid
		// )[0];
		// if (item.categoryid && convertToUrl[category.val]) {
		// 	route.push({
		// 		pathname: convertToUrl[category.val],
		// 		query: { type: item.val },
		// 	});
		// } else {
		// }
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
			console.log(resp, JSON.parse(resp).postal_code);
		});
	};

	const updateInput = (e) => {
		console.log(comboCategories, " Categories... ", e);
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

	useState(() => {
		setTitleObj(pageTitles[route.pathname]);
		setComboCategories([...categories, ...subCategories]);
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
					<div className={styles.titleText}>{titleObj.title}</div>
					<h5 className="m-3">{titleObj.subTitle}</h5>
					{route.pathname === "/" && (
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
										updateInput(e.target.value)
									}
									value={type}
									placeholder="Ex: business, service, food"
								/>
								<div
									className={`${styles.categoriesContainer} ${
										showCategories ? styles.display : null
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
								onClick={searchByParams}
								variant="contained"
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
