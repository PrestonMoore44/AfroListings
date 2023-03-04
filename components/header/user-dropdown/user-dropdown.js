import React, { useState, useEffect } from "react";
import styles from "./user-dropdown.module.css";
import { Grid } from "@mui/material";
import { useRouter } from "next/router";

const UserDropDown = ({ categories, category, navigate, pathname }) => {
	useEffect(() => {
		// console.log(categories, " categories");
	}, []);
	const router = useRouter();
	const iconFinder = {
		Housing: <i class="bi bi-briefcase"></i>,
		Travel: <i class="bi bi-briefcase"></i>,
		"Media Influencers": <i class="bi bi-camera2"></i>,
		Education: <i class="bi bi-briefcase"></i>,
		Dining: <i class="bi bi-briefcase"></i>,
		Business: <i class="bi bi-briefcase"></i>,
		Fitness: <i class="bi bi-briefcase"></i>,
	};

	return (
		<div className={`${styles.container}`}>
			<Grid container spacing={0}>
				{categories.map((item, ind) => (
					<Grid key={ind} item xs={6} className={styles.gridItem}>
						{val}
					</Grid>
				))}
			</Grid>
		</div>
	);
};

export default UserDropDown;
