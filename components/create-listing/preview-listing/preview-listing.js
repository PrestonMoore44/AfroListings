import React, { useEffect, useState } from "react";
import styles from "./preview-listing.module.css";

const PreviewListing = ({ setShowPreview }) => {
	return (
		<div className={styles.container}>
			<div className={styles.entireBody}>
				<i
					onClick={() => setShowPreview(false)}
					className="bi bi-x"
				></i>
			</div>
		</div>
	);
};

export default PreviewListing;
