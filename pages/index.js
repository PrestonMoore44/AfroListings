import React, { useEffect, useState } from "react";
import Layout from "../components/layout/layout";
import Homepage from "../components/homepage/homepage";
import { useDispatch, useSelector } from "react-redux";

const Index = () => {
	console.log("Hmmmm myess irr");
	return (
		<>
			<Layout></Layout>
			<Homepage></Homepage>
		</>
	);
};
export default Index;
