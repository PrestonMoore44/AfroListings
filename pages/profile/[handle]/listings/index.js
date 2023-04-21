import React, { useEffect, useState } from "react";
import Profile from "../../../../components/profile/profile";
import Layout from "../../../../components/layout/layout";
import Listings from "../../../../components/profile/listings";

const ListingsPage = () => (
	<>
		<div>
			<Layout></Layout>
			<Profile></Profile>
			<Listings></Listings>
		</div>
	</>
);
export default ListingsPage;
