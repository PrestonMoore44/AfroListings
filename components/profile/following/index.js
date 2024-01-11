import styles from "../profile.module.css";
import React, { useState, useEffect } from "react";

const Following = () => {
	const [followers, setFollowers] = useState([]);
	return (
		<div className={styles.bodyMain}>
			{followers.length === 0 && <div>You Are Following 0 Users</div>}
		</div>
	);
};

export default Following;
