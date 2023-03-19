import React, { useState, useEffect, useRef } from "react";
import styles from "../create-listing.module.css";
import Button from "@material-ui/core/Button";
import { agePreferenceList } from "../../../public/utils/static-data";
import {
	FormControl,
	InputLabel,
	Checkbox,
	OutlinedInput,
	FormControlLabel,
	Box,
	Select,
	MenuItem,
} from "@mui/material";

const Audience = ({ sex_preference, handleChange, errors, previewListing }) => {
	return (
		<>
			<div className={"d-block"}>
				<div className={styles.header}>Audience</div>
				<Box sx={{ width: 120 }} className={styles.selectContainer}>
					<FormControl fullWidth className={"my-2 mt-3"}>
						<InputLabel id="sex_preference">Gender</InputLabel>
						<Select
							labelId="sex_preference"
							id="sex_preference"
							name="sex_preference"
							value={sex_preference}
							label="Gender"
							onChange={(e) => handleChange(e)}
						>
							<MenuItem
								className={styles.selectItem}
								value={"Men"}
							>
								Men
							</MenuItem>
							<MenuItem
								className={styles.selectItem}
								value={"Women"}
							>
								Women
							</MenuItem>
							<MenuItem
								className={styles.selectItem}
								value={"Any"}
							>
								Any
							</MenuItem>
						</Select>
					</FormControl>
				</Box>
				<div className={styles.customBox}>
					<label className={styles.customLabel}>Age Group</label>
					<FormControl className={`my-2`} fullWidth>
						{agePreferenceList.map((it) => (
							<FormControlLabel
								key={it}
								control={
									<Checkbox className={"mx-2"} size="small" />
								}
								label={it}
							/>
						))}
					</FormControl>
				</div>
			</div>
			<Button
				className={`mt-2 mb-3 w-100 ${styles.signInBtn}`}
				color="secondary"
				variant="contained"
				fullWidth
				onClick={previewListing}
				type="button"
			>
				Preview Listing
			</Button>
			<Button
				className={`mt-2 mb-3 w-100 ${styles.signInBtn}`}
				color="primary"
				variant="contained"
				fullWidth
				type="submit"
			>
				submit
			</Button>
		</>
	);
};

export default Audience;
