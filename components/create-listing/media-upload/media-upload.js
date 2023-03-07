import React, { useState, useRef, useEffect } from "react";
import ImageUploading from "react-images-uploading";
import styles from "./media-upload.module.css";

const MediaUpload = ({ setParentImages }) => {
	const [images, setImages] = useState([]);
	const [mainImg, setMainImg] = useState({});
	const [hoverMain, setHoverMain] = useState(false);
	const maxNumber = 69;

	const onChange = (imageList, addUpdateIndex) => {
		// data for submit
		setImages(imageList);
		setParentImages(imageList);
		setMain(imageList[addUpdateIndex]);
		console.log(addUpdateIndex, " Hello ");
	};

	const setMain = (img) => {
		console.log(img, images);
		setMainImg(img);
		console.log(mainImg, "Hello sorkd");
	};

	const onImageRemove = () => {
		setImages(
			images.filter(({ data_url }) => mainImg["data_url"] !== data_url)
		);
		setMainImg(images[0]);
	};

	return (
		<ImageUploading
			multiple
			value={images}
			onChange={onChange}
			maxNumber={maxNumber}
			dataURLKey="data_url"
		>
			{({
				imageList,
				onImageUpload,
				onImageRemoveAll,
				onImageUpdate,
				isDragging,
				dragProps,
			}) => (
				// write your building UI
				<div
					className={`upload__image-wrapper ${styles.outterContainer}`}
				>
					<div className={styles.uploadSection}>
						{images.length === 0 ? (
							<div className={styles.absoluteCenter}>
								<div className={styles.iconMe}>
									<i className={`bi bi-images`}></i>
								</div>
								<div>Drag up to 3 images or</div>
								<button
									className={styles.uploadBtn}
									style={
										isDragging
											? { color: "red" }
											: undefined
									}
									onClick={onImageUpload}
									{...dragProps}
								>
									select from your computer
								</button>
							</div>
						) : (
							<div>
								<div
									className={styles.mainImgContainer}
									onMouseLeave={() => setHoverMain(false)}
									onMouseEnter={() => setHoverMain(true)}
								>
									<img
										className={styles.mainImgItem}
										src={mainImg["data_url"]}
										alt=""
									/>
									{!!hoverMain && (
										<div
											className={styles.btnContainer}
											onMouseLeave={() =>
												setHoverMain(false)
											}
										>
											<div className={styles.buttons}>
												<button
													onClick={onImageRemove}
													className={"btn btn-light"}
												>
													Delete
												</button>
												<button
													className={
														"btn btn-primary"
													}
													onClick={onImageUpdate}
												>
													Edit Photo
												</button>
											</div>
										</div>
									)}
								</div>
								<div className={styles.flexImgOutContainer}>
									<div className={"d-flex"}>
										<div
											onClick={onImageUpload}
											className={styles.flexImgContainer}
										>
											<i className="bi bi-images"></i>
										</div>
										{imageList.map((image, index) => (
											<div
												className={
													styles.flexImgContainerAlt
												}
												key={index}
											>
												<img
													className={`
														${styles.flexImageItem}
														${mainImg["data_url"] === image["data_url"] ? styles.flexImgSelected : null}`}
													onClick={() =>
														setMain(image)
													}
													src={image["data_url"]}
													alt=""
												/>
											</div>
										))}
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			)}
		</ImageUploading>
	);
};

export default MediaUpload;
