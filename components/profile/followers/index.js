import styles from "../profile.module.css";
import React, { useState, useEffect } from "react";
import { getProfiles } from "../../../lib/services/listings-service";
import Link from "next/link";

const Followers = ({ profile }) => {
	const [followers, setFollowers] = useState([]);
	const getUserFollowers = async (followers = []) => {
		const data = await getProfiles(followers);
		setFollowers(data);
	};
	useEffect(() => {
		getUserFollowers(profile.followers);
	}, [profile]);
	return (
		<div className={styles.bodyMain}>
			{!!followers.length &&
				followers.map((user, ind) => (
					<div key={ind} className={styles.followContainer}>
						<div>
							<img
								className={styles.topHalfImg}
								src={user.picture}
							/>
						</div>
						<div className={styles.followContainerInner}>
							<div>
								{" "}
								<Link
									href={`/profile/${user.username}/listings`}
								>
									<a>@{user.username}</a>
								</Link>
							</div>
							<div>Following Since July 23</div>
						</div>
					</div>
				))}
			{followers.length === 0 && <div>No followers</div>}
		</div>
	);
};

export default Followers;
