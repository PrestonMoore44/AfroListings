import React from "react";
import { useRouter } from "next/router";
import CreateListing from "../../components/create-listing/create-listing";
import { getListing } from "../../lib/services/listings-service";
import Layout from "../../components/layout/layout";

const ListingCreate = () => {
	return (
		<>
			<Layout theme={"dark"}></Layout>
			<CreateListing></CreateListing>
		</>
	);
};

export default ListingCreate;
