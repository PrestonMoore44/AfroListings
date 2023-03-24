import React, { useEffect, useState } from "react";
import styles from "./preview-listing.module.css";
import SingleListing from "../../single-listing/single-listing";

const PreviewListing = ({ setShowPreview, formValues, images, editorHTML }) => {
	return (
		<div className={styles.container}>
			<div className={styles.entireBody}>
				<i
					onClick={() => setShowPreview(false)}
					className="bi bi-x"
				></i>
				<SingleListing
					editorHTML={editorHTML}
					images={images}
					formValues={formValues}
				></SingleListing>
			</div>
		</div>
	);
};

export default PreviewListing;
