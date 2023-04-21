import React, { useEffect, useState } from "react";
import Profile from "../../../../components/profile/profile";
import Layout from "../../../../components/layout/layout";
import Following from "../../../../components/profile/following";

const FollowingPage = () => (
	<>
		<div>
			<Layout></Layout>
			<Profile></Profile>
			<Following></Following>
		</div>
	</>
);
export default FollowingPage;
