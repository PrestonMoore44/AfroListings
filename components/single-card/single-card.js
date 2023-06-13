import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./single-card.module.css";
import { CardPopup } from "../homepage/card-popup/card-popup";

const SingleCard = ({ item, ind, alt }) => {
	const router = useRouter();
	const [showItem, setShowItem] = useState([false, false, false, false]);

	const [businessCtrl, setBusinessCtrl] = useState([
		false,
		false,
		false,
		false,
	]);
	useEffect(() => {
		console.log(alt);
	}, []);
	const goToListing = (lid) => {
		console.log(lid);
		router.push(`/listing/${lid}`);
	};

	const { url: src, username, title, description, id } = item;
	return (
		<div
			onMouseEnter={() =>
				setBusinessCtrl(businessCtrl.map((iti, nd) => ind === nd))
			}
			onMouseLeave={() =>
				setBusinessCtrl(businessCtrl.map((iti, nd) => false))
			}
			className={` ${styles.containerImgHold} border ${
				alt && styles.altContainerImgHold
			}`}
		>
			<div className={styles.imgContainer}>
				<img
					onClick={() => goToListing(id)}
					className={`${styles.containerImg} ${
						alt && styles.altContainerImg
					}`}
					key={ind}
					src={src}
				/>
			</div>
			<div className={styles.containerBodyLow}>
				<div className={styles.smallMe}>
					<small>
						<Link
							href={{
								pathname: "/profile/[handle]/listings",
								query: { handle: username },
							}}
						>
							<a>{username}</a>
						</Link>
					</small>
				</div>
				<div className={styles.titleContainer}>
					<div
						onClick={() => goToListing(id)}
						className={styles.titleContainerTitle}
					>
						{title}
					</div>
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
				<small>{description}</small>
			</div>
		</div>
	);
};

export default SingleCard;
