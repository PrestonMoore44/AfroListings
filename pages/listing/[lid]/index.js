import React from "react";
import { useRouter } from "next/router";
import SingleListing from "../../../components/single-listing/single-listing";
import { getListing } from "../../../lib/services/listings-service";
import Layout from "../../../components/layout/layout";

const ListingPage = () => {
	return (
		<>
			<Layout></Layout>
			<SingleListing></SingleListing>
		</>
	);
};

export default ListingPage;
