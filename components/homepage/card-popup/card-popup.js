import React, {
	useEffect,
	useState,
	useContext,
	useTransition,
	useRef,
} from "react";

import styles from "./card-popup.module.css";

export const CardPopup = () => {
	return (
		<div className={styles.cardOutContainer}>
			<div className={styles.cardContainer}>
				<div className={styles.cardItemBody}>
					<div className={styles.cardItem}>
						<i className="bi bi-star"></i>
						<div>Add to Favorites</div>
					</div>
				</div>
				<div className={styles.cardItemBody}>
					<div className={styles.cardItem}>
						<i className="bi bi-share"></i>
						<div>Share</div>
					</div>
				</div>
			</div>
		</div>
	);
};
