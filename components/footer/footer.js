import React, { useState } from "react";
import styles from "./footer.module.css";

const Footer = () => {
	return (
		<div className={styles.footer}>
			<div className={styles.itemsContainer}>
				<div>info@afrolistings.com</div>
				<div>linkedin.com/company/afrolistings</div>
				<div>
					2023 @AfroListings Inc. All rights reserved Privacy & Legal
					Policies
				</div>
			</div>
		</div>
	);
};

export default Footer;
