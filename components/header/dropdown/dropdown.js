import React, { useState, useEffect } from "react";
import styles from "./dropdown.module.css";
import { Grid } from "@mui/material";

const DropDown = ({ categories }) => {
	useEffect(() => {
		console.log(categories, Grid);
	}, []);
	return (
		<div className={`${styles.container}`}>
			<Grid container spacing={0}>
				{categories.map(({ id, val }) => (
					<Grid key={id} item xs={6} className={styles.gridItem}>
						{val}
					</Grid>
				))}
			</Grid>
		</div>
	);
};

export default DropDown;
