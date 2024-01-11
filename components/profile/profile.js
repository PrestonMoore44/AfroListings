import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./profile.module.css";
import Home from "./home";
import {
	getProfile,
	followUser,
	unfollowUser,
} from "../../lib/services/listings-service";
import DropDown from "../header/dropdown/dropdown";

const Profile = ({ profile: passedIn }) => {
	const [showDropDown, setShowDropDown] = useState(false);
	const [user, setUser] = useState({});
	const [profile, setProfile] = useState({});
	const [isFollowing, setIsFollowing] = useState(false);
	const router = useRouter();

	const follow = async () => {
		const data = await followUser(user?.id, profile?.id);
		console.log(data, " Well again.. ");
	};
	useEffect(() => {
		setUser(JSON.parse(localStorage.getItem("user")));
	}, []);

	useEffect(() => {
		setProfile(passedIn);
	}, [passedIn]);

	useEffect(() => {
		setIsFollowing(profile?.followers?.includes(user?.id));
	}, [user, profile]);

	const unfollow = async () => {
		console.log(profile, user);
		const data = await unfollowUser(user?.id, profile?.id);
		console.log(data);
	};

	// useEffect(() => {
	// 	if (router.isReady && !profile.username) {
	// 	}
	// }, [router.isReady]);

	const [hovImg, setHovImg] = useState(false);
	return (
		<div className={styles.bodyMain}>
			<div className={styles.topHalf}>
				<div
					onMouseEnter={() => setHovImg(true)}
					onMouseLeave={() => setHovImg(false)}
					className={"position-relative"}
				>
					<img className={styles.topHalfImg} src={profile?.picture} />
					{hovImg && (
						<div className={styles.changePhoto}>
							<i className="bi bi-image"></i>
						</div>
					)}
				</div>
				<div>
					<div className={styles.headerName}>
						{profile?.fn} {profile?.ln}
					</div>
					<div className={styles.headerUsername}>
						@{profile?.username}
					</div>
				</div>
				<div className={styles.btnContainer}>
					<div className={styles.btnContainerInner}>
						{router.query?.handle === user?.username && (
							<>
								<button className={`btn btn-primary`}>
									Edit Profile
								</button>
								<button className={`btn btn-primary`}>
									Manage Listings
								</button>
							</>
						)}
						{user?.email &&
							router.query.handle !== user?.username && (
								<>
									{!!isFollowing ? (
										<div
											className={
												styles.btnDropdownContainer
											}
										>
											<button
												onClick={() =>
													setShowDropDown(
														showDropDown
															? false
															: true
													)
												}
												className={`btn btn-light d-flex`}
											>
												<div
													style={{
														paddingRight: 10,
														paddingLeft: 4,
													}}
												>
													Following
												</div>
												<i className="bi bi-chevron-down"></i>
											</button>
											{!!showDropDown && (
												<div
													className={
														styles.dropdownContainer
													}
												>
													<div
														onClick={() =>
															unfollow()
														}
													>
														<i className="bi bi-person-dash-fill"></i>
														<span>Unfollow</span>
													</div>
												</div>
											)}
										</div>
									) : (
										<button
											onClick={() => follow()}
											className={`btn btn-primary`}
										>
											Follow
										</button>
									)}
								</>
							)}
					</div>
				</div>
			</div>
			<div className={styles.topHalfAlt}>
				<div
					className={`${styles.linkButton} ${
						router?.query?.view === "listings" &&
						styles.linkButtonActive
					}`}
				>
					<Link
						href={`/profile/${router?.query?.handle}/listings`}
						shallow={true}
					>
						<a>LISTINGS</a>
					</Link>
				</div>
				<div
					className={`${styles.linkButton} ${
						router?.query?.view === "followers" &&
						styles.linkButtonActive
					}`}
				>
					<Link
						href={`/profile/${router?.query?.handle}/followers`}
						shallow={true}
					>
						<a>FOLLOWERS</a>
					</Link>
				</div>
				{!!(user.id === passedIn.id) && (
					<div
						className={`${styles.linkButton} ${
							router?.query?.view === "following" &&
							styles.linkButtonActive
						}`}
					>
						<Link
							href={`/profile/${router?.query?.handle}/following`}
							shallow={true}
						>
							<a>FOLLOWING</a>
						</Link>
					</div>
				)}
			</div>
			<div className={styles.bottomHalf}></div>
		</div>
	);
};

export default Profile;
