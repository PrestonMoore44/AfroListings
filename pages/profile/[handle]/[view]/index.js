import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Profile from "../../../../components/profile/profile";
import Layout from "../../../../components/layout/layout";
import Followers from "../../../../components/profile/followers";
import Following from "../../../../components/profile/following";
import Listings from "../../../../components/profile/listings";

const HandleViewPage = () => {
	const router = useRouter();
	const dynamicComponent = {
		followers: Followers,
		following: Following,
		listings: Listings,
	};

	const DynamicComponent = dynamicComponent[router?.query?.view];

	return (
		<>
			<div>
				<Layout></Layout>
				<Profile></Profile>
				{DynamicComponent && <DynamicComponent></DynamicComponent>}
			</div>
		</>
	);
};
export default HandleViewPage;
