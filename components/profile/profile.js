import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./profile.module.css";
import Home from "./home";
import { getProfile } from "../../lib/services/listings-service";

const Profile = () => {
	const [user, setUser] = useState({});
	const [profile, setProfile] = useState({});
	const router = useRouter();
	const getBasicProfile = async () => {
		const user = await getProfile(router?.query?.handle);
		console.log(user);
		setProfile(user);
	};
	useEffect(() => {
		setUser(JSON.parse(sessionStorage.getItem("user")));
		console.log(" Running ");
	}, []);

	useEffect(() => {
		if (router.isReady && !profile.username) {
			getBasicProfile();
		}
	}, [router.isReady]);

	const [hovImg, setHovImg] = useState(false);
	return (
		<div className={styles.bodyMain}>
			<div className={styles.topHalf}>
				<div
					onMouseEnter={() => setHovImg(true)}
					onMouseLeave={() => setHovImg(false)}
					className={"position-relative"}
				>
					<img src={profile?.picture} />
					{hovImg && (
						<div className={styles.changePhoto}>
							<i className="bi bi-image"></i>
						</div>
					)}
				</div>
				<div>
					<div className={styles.headerName}>
						{profile.fn} {profile.ln}
					</div>
					<div>@{profile.username}</div>
				</div>
				<div className={styles.btnContainer}>
					{router.query.handle === user.username ? (
						<>
							<button className={`btn btn-primary`}>
								Edit Profile
							</button>
							<button className={`btn btn-primary`}>
								Manage Listings
							</button>
						</>
					) : (
						<button className={`btn btn-primary`}>Follow</button>
					)}
				</div>
			</div>
			<div className={styles.topHalfAlt}>
				<div
					className={`${styles.linkButton} ${
						router.route === "/profile/[handle]/listings" &&
						styles.linkButtonActive
					}`}
				>
					<Link
						href={`/profile/${router.query.handle}/listings`}
						shallow={true}
					>
						<a>LISTINGS</a>
					</Link>
				</div>
				<div
					className={`${styles.linkButton} ${
						router.route === "/profile/[handle]/followers" &&
						styles.linkButtonActive
					}`}
				>
					<Link
						href={`/profile/${router.query.handle}/followers`}
						shallow={true}
					>
						<a>FOLLOWERS</a>
					</Link>
				</div>
				<div
					className={`${styles.linkButton} ${
						router.route === "/profile/[handle]/following" &&
						styles.linkButtonActive
					}`}
				>
					<Link
						href={`/profile/${router.query.handle}/following`}
						shallow={true}
					>
						<a>FOLLOWING</a>
					</Link>
				</div>
			</div>
			<div className={styles.bottomHalf}></div>
		</div>
	);
};

export default Profile;
