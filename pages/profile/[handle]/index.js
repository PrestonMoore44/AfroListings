import React, { useEffect, useState } from "react";
import Profile from "../../../components/profile/profile";
import Layout from "../../../components/layout/layout";
import Home from "../../../components/profile/home";

const Index = () => {
	useEffect(() => {
		console.log(" NO cup of cofee ");
	}, []);
	const [view, setView] = useState("Home");
	return (
		<>
			<div>WHAT'S HIS NAME</div>
		</>
	);
};
export default Index;
