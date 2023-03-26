import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../header/header";
import Footer from "../footer/footer";
import HomePage from "../homepage/homepage";
import styles from "./layout.module.css";
import { useDispatch } from "react-redux";

const Layout = ({ theme }) => {
	return (
		<div className={styles.continer}>
			<Header theme={theme}></Header>
		</div>
	);
};

export default Layout;
