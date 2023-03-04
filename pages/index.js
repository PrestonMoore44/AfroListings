import React, { useEffect, useState } from "react";
import Layout from "../components/layout/layout";
import Homepage from "../components/homepage/homepage";
import { useDispatch, useSelector } from "react-redux";

const Index = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		if (sessionStorage.getItem("user")) {
			dispatch({
				type: "setUser",
				user: JSON.parse(sessionStorage.getItem("user")),
			});
		}
	}, []);
	return (
		<>
			<Layout></Layout>
			<Homepage></Homepage>
		</>
	);
};
export default Index;
