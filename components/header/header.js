import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { GoTriangleUp } from "react-icons/go";
import styles from "./header.module.css";
import Login from "../modals/login/login";
import CreateListings from "../modals/create-listings/create-listings";
import { BsPlusSquare } from "react-icons/bs";
import { BiUser } from "react-icons/bi";
import DropDown from "./dropdown/dropdown";
import { IoExitOutline } from "react-icons/io5";
import {
	getCategories,
	getSubCategories,
} from "../../lib/services/listings-service";

const Header = ({ theme }) => {
	const router = useRouter();
	const [hoverItem, setHoverItem] = useState(null);
	const [showLogin, setShowLogin] = useState(false);
	const [dropDownType, setDropdownType] = useState({});
	const [ctrlLogin, setCtrlLogin] = useState(false);
	const [showCreateListing, setShowCreateListing] = useState(false);
	const [categories, setCategories] = useState([]);
	const [subCategories, setSubCategories] = useState([]);
	const dispatch = useDispatch();
	const user = useSelector((store) => store.user);
	const routesCtrl = {
		"/business-listings": 1,
		"/influencer-listings": 1,
		"/education-listings": 1,
		"/housing-listings": 1,
		"/travel-listings": 1,
	};
	useEffect(() => {
		// console.log(user, " User from store  from header ", theme);
		fetchCategories();
	}, [user]);

	useEffect(() => {
		if (routesCtrl[router.pathname] && !user) {
			restrictUser();
		}
	}, [router]);

	useEffect(() => {
		if (ctrlLogin && !showLogin && routesCtrl[router.pathname] && !user) {
			setCtrlLogin(false);
			router.push(`/`);
		}
	}, [showLogin]);

	const fetchCategories = async () => {
		let data = await getCategories();
		let subs = await getSubCategories();
		dispatch({
			type: "setSubCategories",
			subCategories: subs,
		});
		dispatch({
			type: "setCategories",
			categories: data,
		});
		setSubCategories(subs);
		setCategories(data);
	};

	const navigate = (type, pathname) => {
		router.push({
			pathname,
			query: { type: type },
		});
	};

	const home = () => router.push("/");
	const viewBusiness = () => router.push("/business-listings");
	const viewEducation = () => router.push("/education-listings");
	const viewHousing = () => router.push("/housing-listings");
	const viewTravel = () => router.push("/travel-listings");
	const viewInfluencer = () => router.push("/influencer-listings");
	const viewNews = () => router.push("/news");
	const restrictUser = () => {
		setTimeout(() => {
			setShowLogin(true);
			setCtrlLogin(true);
		}, 500);
	};

	const signOut = () => {
		dispatch({
			type: "setUser",
			user: null,
		});
	};

	const create = () => {
		router.push(`/listing/create`);
		dispatch({
			type: "setShowNewListing",
			showNewListing: true,
		});
	};

	return (
		<>
			{showLogin && <Login setShowLogin={setShowLogin}></Login>}
			<div
				className={`${styles.headerContainer} ${
					theme === "dark" ? styles.darkTheme : null
				}`}
			>
				<div className={styles.leftContainer}></div>
				<div className={styles.rightContainer}>
					<div
						onMouseOver={() =>
							setDropdownType(
								categories.filter(
									(it) => it.val === "Business"
								)[0]
							)
						}
						onMouseLeave={() => setDropdownType(null)}
						className={`${styles.rightItem} ${
							router.pathname === "/business-listings"
								? styles.active
								: null
						}`}
					>
						<div onClick={() => viewBusiness()}>Business</div>
						{dropDownType?.val === "Business" && (
							<div className={styles.dropContainer}>
								<DropDown
									pathname={"/business-listings"}
									navigate={navigate}
									category={dropDownType.val}
									categories={subCategories.filter(
										(it) =>
											it.categoryid === dropDownType.id
									)}
								></DropDown>
							</div>
						)}
					</div>
					<div
						onMouseOver={() =>
							setDropdownType(
								categories.filter(
									(it) => it.val === "Media Influencers"
								)[0]
							)
						}
						onMouseLeave={() => setDropdownType(null)}
						className={`${styles.rightItem} ${
							router.pathname === "/influencer-listings"
								? styles.active
								: null
						}`}
					>
						<div onClick={() => viewBusiness()}>
							Media Influencers
						</div>
						{dropDownType?.val === "Media Influencers" && (
							<div className={styles.dropContainer}>
								<DropDown
									pathname={"/influencer-listings"}
									navigate={navigate}
									category={dropDownType.val}
									categories={subCategories.filter(
										(it) =>
											it.categoryid === dropDownType.id
									)}
								></DropDown>
							</div>
						)}
					</div>
					<div
						onMouseOver={() =>
							setDropdownType(
								categories.filter(
									(it) => it.val === "Education"
								)[0]
							)
						}
						onMouseLeave={() => setDropdownType(null)}
						className={`${styles.rightItem} ${
							router.pathname === "/education-listings"
								? styles.active
								: null
						}`}
					>
						<div onClick={() => viewEducation()}>Education</div>
						{dropDownType?.val === "Education" && (
							<div className={styles.dropContainer}>
								<DropDown
									pathname={"/education-listings"}
									navigate={navigate}
									category={dropDownType.val}
									categories={subCategories.filter(
										(it) =>
											it.categoryid === dropDownType.id
									)}
								></DropDown>
							</div>
						)}
					</div>
					<div
						onMouseOver={() =>
							setDropdownType(
								categories.filter(
									(it) => it.val === "Dining"
								)[0]
							)
						}
						onMouseLeave={() => setDropdownType(null)}
						className={`${styles.rightItem} ${
							router.pathname === "/education-listings"
								? styles.active
								: null
						}`}
					>
						<div onClick={() => viewEducation()}>Dining</div>
						{dropDownType?.val === "Dining" && (
							<div className={styles.dropContainer}>
								<DropDown
									pathname={"/education-listings"}
									navigate={navigate}
									category={dropDownType.val}
									categories={subCategories.filter(
										(it) =>
											it.categoryid === dropDownType.id
									)}
								></DropDown>
							</div>
						)}
					</div>
					<div
						onMouseOver={() =>
							setDropdownType(
								categories.filter(
									(it) => it.val === "Fitness"
								)[0]
							)
						}
						onMouseLeave={() => setDropdownType(null)}
						className={`${styles.rightItem} ${
							router.pathname === "/education-listings"
								? styles.active
								: null
						}`}
					>
						<div onClick={() => viewEducation()}>Fitness</div>
						{dropDownType?.val === "Fitness" && (
							<div className={styles.dropContainer}>
								<DropDown
									pathname={"/education-listings"}
									navigate={navigate}
									category={dropDownType.val}
									categories={subCategories.filter(
										(it) =>
											it.categoryid === dropDownType.id
									)}
								></DropDown>
							</div>
						)}
					</div>
					<div
						onMouseOver={() =>
							setDropdownType(
								categories.filter(
									(it) => it.val === "Housing"
								)[0]
							)
						}
						onMouseLeave={() => setDropdownType(null)}
						className={`${styles.rightItem} ${
							router.pathname === "/housing-listings"
								? styles.active
								: null
						}`}
					>
						<div onClick={() => viewHousing()}>Housing</div>
						{dropDownType?.val === "Housing" && (
							<div className={styles.dropContainer}>
								<DropDown
									pathname={"/housing-listings"}
									navigate={navigate}
									category={dropDownType.val}
									categories={subCategories.filter(
										(it) =>
											it.categoryid === dropDownType.id
									)}
								></DropDown>
							</div>
						)}
					</div>
					<div
						onMouseOver={() =>
							setDropdownType(
								categories.filter(
									(it) => it.val === "Travel"
								)[0]
							)
						}
						onMouseLeave={() => setDropdownType(null)}
						className={`${styles.rightItem} ${
							router.pathname === "/travel-listings"
								? styles.active
								: null
						}`}
					>
						<div onClick={() => viewTravel()}>Travel</div>
						{dropDownType?.val === "Travel" && (
							<div className={styles.dropContainer}>
								<DropDown
									pathname={"/travel-listings"}
									navigate={navigate}
									category={dropDownType.val}
									categories={subCategories.filter(
										(it) =>
											it.categoryid === dropDownType.id
									)}
								></DropDown>
							</div>
						)}
					</div>
					<div
						className={styles.rightItemAlt}
						onMouseOver={() => setHoverItem("Profile")}
						onMouseLeave={() => setHoverItem(null)}
					>
						{user && user.id ? (
							<>
								{user.picture !== "undefined" ? (
									<div>
										<img
											className={styles.profilePic}
											src={user.picture}
										/>
									</div>
								) : (
									<div className={styles.profilePicAlt}>
										<i className="bi bi-person-circle"></i>
									</div>
								)}
								{hoverItem === "Profile" && (
									<div
										className={`${styles.hoverOptionsContainer} border`}
									>
										<div>
											<BiUser />
											<span
												className={styles.profileItems}
											>
												Profile
											</span>
										</div>
										<div onClick={create}>
											<BsPlusSquare />
											<span
												className={styles.profileItems}
											>
												Create Listing
											</span>
										</div>
										<div onClick={signOut}>
											<IoExitOutline />
											<span
												className={styles.profileItems}
											>
												Sign Out
											</span>
										</div>
									</div>
								)}
							</>
						) : (
							<div onClick={() => setShowLogin(true)}>
								Sign in
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default Header;
