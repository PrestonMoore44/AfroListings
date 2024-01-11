import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Profile from "../../../../components/profile/profile";
import Layout from "../../../../components/layout/layout";
import Followers from "../../../../components/profile/followers";
import Following from "../../../../components/profile/following";
import Listings from "../../../../components/profile/listings";
import {
	getProfile,
	followUser,
} from "../../../../lib/services/listings-service";

const HandleViewPage = () => {
	const router = useRouter();
	const dynamicComponent = {
		followers: Followers,
		following: Following,
		listings: Listings,
	};
	const [user, setUser] = useState({});
	const [profile, setProfile] = useState({});
	const getBasicProfile = async () => {
		const userr = await getProfile(router?.query?.handle);
		console.log(userr);
		setProfile(userr);
	};
	useEffect(() => {
		if (router.isReady) {
			getBasicProfile();
		}
	}, [router]);
	const DynamicComponent = dynamicComponent[router?.query?.view];

	return (
		<>
			<div>
				<Layout />
				<Profile profile={profile} />
				{DynamicComponent && (
					<DynamicComponent profile={profile}></DynamicComponent>
				)}
			</div>
		</>
	);
};
export default HandleViewPage;
