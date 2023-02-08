import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../homepage/homepage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const News = () => {
	useEffect(() => {}, []);

	const profile = () => {
		console.log(" Profile view ");
	};

	const halp = () => {
		console.log(" Help and Support ");
	};

	return (
		<div className={`my-5`}>
			<div className={`d-inline-flex p-5 mx-3 position-relative`}>
				<div className={styles.gridContainer}>
					<div className={styles.item1}>
						<img className={styles.img} src={"/tutor1.jpg"} />
						<div className={styles.mainContainer}>
							<h3>
								<a href="/hello" target="_blank">
									How one tutor has changed the lives of her
									students
								</a>
							</h3>
							<div className={styles.mainSmText}>
								Teachers often go above and beyond to make their
								students feel comfortable. One teacher matched a
								student's hairstyle when she saw she was
								uncomfortable. Another donated a kidney to her
								student.
							</div>
						</div>
					</div>
					<div className={`${styles.item2} ${styles.smallContainer}`}>
						<img src={"/img2.jpg"} />
						<div className={styles.smallContainerDiv}>
							How Gabby Goodwin's double-face double-snap
							barrettes shifted the culture
						</div>
					</div>
					<div className={`${styles.item3} ${styles.smallContainer}`}>
						<img src={"/img3.jpg"} />
						<div className={styles.smallContainerDiv}>
							Beau2Go Meal Prep – serving people throughout
							Philadelphia
						</div>
					</div>
					<div className={`${styles.item4} ${styles.smallContainer}`}>
						<img src={"/img4.jpg"} />
						<div className={styles.smallContainerDiv}>
							Everyone has potential and everyone needs a coach
							pushing them to achieve their greatness
						</div>
					</div>
					<div className={`${styles.item5} ${styles.smallContainer}`}>
						<img src={"/img5.jpg"} />
						<div className={styles.smallContainerDiv}>
							Small black businesses hit harder by inflation,
							here's why
						</div>
					</div>
					<div className={`${styles.item6} ${styles.smallContainer}`}>
						<img src={"/img6.jpg"} />
						<div className={styles.smallContainerDiv}>
							The importance of advancing black home ownership
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default News;
