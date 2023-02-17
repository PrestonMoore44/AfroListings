import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "./cover.module.css";
import { BiLocationPlus } from "react-icons/bi";
import { Button } from "@material-ui/core";
import { pageTitles } from "../../public/utils/static-data";

const Cover = ({
	inputRef,
	handleCategoryChange,
	categories,
	setCategory,
	scrollDown,
	type,
	setType,
	showCategories,
	bgMedia,
}) => {
	const route = useRouter();
	const [titleObj, setTitleObj] = useState({});
	const findLocation = async () => {
		const data = await geoLocation();
		setLocation(data.postal);
	};

	useState(() => {
		setTitleObj(pageTitles[route.pathname]);
	}, []);

	return (
		<div
			className={`${styles.homepageContainer} ${
				route.pathname !== "/" && styles.homepageAltHeight
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
									value={null}
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
					)}
				</div>
				<div className={styles.chevronHolder}>
					<i
						className={"bi bi-chevron-down"}
						onClick={scrollDown}
					></i>
				</div>
			</div>
			{route.pathname === "/" ? (
				<video autoPlay muted loop id="myVideo">
					<source src={bgMedia} type="video/mp4"></source>
				</video>
			) : (
				<img className={styles.backgroundImg} src={bgMedia} />
			)}
		</div>
	);
};

export default Cover;
