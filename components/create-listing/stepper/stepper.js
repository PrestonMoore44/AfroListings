import React, { useState, useEffect } from "react";
import styles from "./stepper.module.css";

const Stepper = ({ view, setView }) => {
	return (
		<div className={styles.flexContainer}>
			<div className={styles.flexItem}>
				<div
					onClick={() => setView(1)}
					className={`${styles.flexItemBox} ${styles.floatL} ${
						view === 1 ? styles.selectedView : null
					} `}
				>
					<div>Listing Details</div>
					<i className="bi bi-circle"></i>
				</div>
				<div className={styles.divider}></div>
			</div>
			<div onClick={() => setView(2)} className={`${styles.flexItem}`}>
				<div className={styles.divider}></div>
				<div
					className={`${styles.flexItemBox} ${
						view === 2 ? styles.selectedView : null
					}`}
				>
					<div>Contact Info</div>
					<i className="bi bi-circle"></i>
				</div>
				<div className={styles.divider}></div>
			</div>
			<div onClick={() => setView(3)} className={`${styles.flexItem}`}>
				<div className={styles.divider}></div>
				<div
					className={`${styles.floatR} ${styles.flexItemBox} ${
						view === 3 ? styles.selectedView : null
					}`}
				>
					<div>Target Audience</div>
					<i className="bi bi-circle"></i>
				</div>
			</div>
		</div>
	);
};

export default Stepper;
