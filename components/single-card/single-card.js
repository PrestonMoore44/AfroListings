import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./single-card.module.css";
import { CardPopup } from "../homepage/card-popup/card-popup";
import Image from "next/image";

const SingleCard = ({ item, ind, alt }) => {
	const router = useRouter();
	const [imgLoaded, setImgLoaded] = useState(false);
	const [showItem, setShowItem] = useState([false, false, false, false]);

	const [businessCtrl, setBusinessCtrl] = useState([
		false,
		false,
		false,
		false,
	]);
	useEffect(() => {}, []);
	const goToListing = (lid) => {
		router.push(`/listing/${lid}`);
	};

	const shouldHover = () => {};

	const { url: src, username, title, description, id } = item;
	return (
		<div
			onMouseEnter={() =>
				imgLoaded &&
				setBusinessCtrl(businessCtrl.map((iti, nd) => ind === nd))
			}
			onMouseLeave={() =>
				imgLoaded &&
				setBusinessCtrl(businessCtrl.map((iti, nd) => false))
			}
			className={` ${styles.containerImgHold} ${
				alt && styles.altContainerImgHold
			}`}
		>
			<div className={styles.imgContainer}>
				<Image
					onLoadingComplete={() => setImgLoaded(true)}
					onClick={() => goToListing(id)}
					className={`${styles.containerImg} ${
						alt && styles.altContainerImg
					}`}
					placeholder="blur"
					blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO8dAYAAnYBoH+KtRgAAAAASUVORK5CYII="
					width={350}
					height={209}
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
