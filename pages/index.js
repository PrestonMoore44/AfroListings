import React, { useEffect, useState } from "react";
import Layout from "../components/layout/layout";
import Homepage from "../components/homepage/homepage";
import Testing from "../components/testing/testing";
import { useDispatch, useSelector } from "react-redux";

const Index = () => {
	useEffect(() => {}, []);
	return (
		<>
			<Layout></Layout>
			<Homepage></Homepage>
		</>
	);
};
export default Index;
