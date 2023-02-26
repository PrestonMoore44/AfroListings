import React, { useState, useRef, useEffect } from "react";
import ImageUploading from "react-images-uploading";
import styles from "./media-upload.module.css";

const MediaUpload = () => {
	const [images, setImages] = useState([]);
	const maxNumber = 69;

	const onChange = (imageList, addUpdateIndex) => {
		// data for submit
		console.log(imageList, addUpdateIndex);
		setImages(imageList);
		console.log(images);
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
				onImageRemove,
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
								{imageList.map((image, index) => (
									<div key={index} className="image-item">
										<img
											src={image["data_url"]}
											alt=""
											width="100"
										/>
										<div className="image-item__btn-wrapper">
											<button
												onClick={() =>
													onImageUpdate(index)
												}
											>
												Update
											</button>
											<button
												onClick={() =>
													onImageRemove(index)
												}
											>
												Remove
											</button>
										</div>
									</div>
								))}
							</div>
						)}
					</div>
					<button onClick={onImageRemoveAll}>
						Remove all images
					</button>
				</div>
			)}
		</ImageUploading>
	);
};

export default MediaUpload;
