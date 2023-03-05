import React, { useState, useEffect } from "react";
import styles from "./dropdown.module.css";
import { Grid } from "@mui/material";
import { useRouter } from "next/router";

const DropDown = ({
	categories,
	category,
	navigate,
	pathname,
	type,
	options,
}) => {
	useEffect(() => {}, [console.log(type, options)]);
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
		<div
			className={`${styles.container} ${
				options ? styles.containerAlt : null
			} `}
		>
			<Grid container spacing={0}>
				{type !== "profile" ? (
					<>
						{categories.map(({ id, val }) => (
							<Grid
								onClick={() => navigate(val, pathname)}
								key={id}
								item
								xs={6}
								className={styles.gridItem}
							>
								{val}
							</Grid>
						))}
					</>
				) : (
					<>
						{Object.entries(options).map(([key, value], ind) => (
							<Grid
								onClick={() => navigate(value, key)}
								item
								key={ind}
								xs={12}
								className={styles.gridItem}
							>
								<span className={styles.gridItemIcon}>
									{value.icon}
								</span>
								<span>{key}</span>
							</Grid>
						))}
					</>
				)}
			</Grid>
		</div>
	);
};

export default DropDown;
