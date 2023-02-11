import React, { useState } from "react";
import styles from "./single-card.module.css";
import { CardPopup } from "../homepage/card-popup/card-popup";
/*
		src: "/creditOption.jpeg",
		user: "Credit Master Sean",
		title: "Have an 800 Credit Score Yet",
		desc: "We can get you there! 5 star credit repair at Valley Wide Credit Repair",

			onMouseEnter={() =>
				setfoodCtrl(foodCtrl.map((iti, nd) => ind === nd))
			}
			onMouseLeave={() => setfoodCtrl(foodCtrl.map((iti, nd) => false))}
*/

const SingleCard = ({ item, ind }) => {
	const [showItem, setShowItem] = useState([false, false, false, false]);

	const [businessCtrl, setBusinessCtrl] = useState([
		false,
		false,
		false,
		false,
	]);

	const { src, user, title, desc, type } = item;
	console.log(src, user, title, desc, type, item);
	return (
		<div
			onMouseEnter={() =>
				setBusinessCtrl(businessCtrl.map((iti, nd) => ind === nd))
			}
			onMouseLeave={() =>
				setBusinessCtrl(businessCtrl.map((iti, nd) => false))
			}
			className={styles.containerImgHold}
		>
			<img className={styles.containerImg} key={ind} src={src} />
			<div className={styles.containerBodyLow}>
				<div className={styles.smallMe}>
					<small>{user}</small>
				</div>
				<div className={styles.titleContainer}>
					<div className={styles.titleContainerTitle}>{title}</div>
					{!!showItem[ind] && <CardPopup />}
					{!!false && <CardPopup />}
					<div className={styles.titleContainerOption}>
						{(!!businessCtrl[ind] || !!showItem[ind]) && (
							<i
								onClick={() =>
									setShowItem(
										showItem.map((item, index) =>
											index === ind ? !item : false
										)
									)
								}
								className="bi bi-three-dots-vertical"
							></i>
						)}
					</div>
				</div>
				<small>{desc}</small>
			</div>
		</div>
	);
};

export default SingleCard;
