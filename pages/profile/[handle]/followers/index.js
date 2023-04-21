import React, { useEffect, useState } from "react";
import Profile from "../../../../components/profile/profile";
import Layout from "../../../../components/layout/layout";
import Followers from "../../../../components/profile/followers";

const FollowersPage = () => (
	<>
		<div>
			<Layout></Layout>
			<Profile></Profile>
			<Followers></Followers>
		</div>
	</>
);
export default FollowersPage;
