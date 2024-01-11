import React from "react";
import Header from "../header/header";
import styles from "./layout.module.css";

const Layout = ({ theme }) => {
	return (
		<div className={styles.continer}>
			<Header theme={theme}></Header>
		</div>
	);
};

export default Layout;
