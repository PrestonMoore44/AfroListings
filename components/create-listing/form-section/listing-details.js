import React, { useState, useEffect, useRef } from "react";
import styles from "../create-listing.module.css";
import { Editor } from "@tinymce/tinymce-react";
import Select from "@mui/material/Select";
import {
	FormControl,
	InputLabel,
	OutlinedInput,
	Box,
	MenuItem,
} from "@mui/material";
const ListingDetails = ({
	title,
	touched,
	description,
	categories,
	category,
	subcategory,
	subCategories,
	editorHTML,
	setEditorHTML,
	handleChange,
}) => {
	return (
		<div className={"d-flex"}>
			<div className={"d-block"}>
				<div className={styles.header}>Listing Details</div>
				<FormControl fullWidth className={"my-2"}>
					<InputLabel htmlFor="title">Title</InputLabel>
					<OutlinedInput
						required
						id="title"
						label="Title"
						placeholder="Add a title that describes your listing"
						value={title}
						onChange={handleChange}
						error={touched.title && Boolean(errors.title)}
					/>
				</FormControl>
				<FormControl fullWidth className={"my-2"}>
					<InputLabel htmlFor="description">Description</InputLabel>
					<OutlinedInput
						required
						placeholder="Tell viewers about your listing"
						id="description"
						label="Sub Title"
						value={description}
						onChange={handleChange}
						error={
							touched.description && Boolean(errors.description)
						}
					/>
				</FormControl>
				{!!categories.length && (
					<Box sx={{ width: 120 }} className={styles.selectContainer}>
						<FormControl className={`my-2`} fullWidth>
							<InputLabel id="demo-simple">Category</InputLabel>
							<Select
								labelId="demo-simple"
								id="category"
								name="category"
								value={category}
								label="Category"
								onChange={(e) => {
									console.log(e);
									handleChange(e);
								}}
							>
								{categories.map(({ id, val }) => (
									<MenuItem
										key={id}
										id="category_1"
										value={id}
										className={styles.selectItem}
									>
										{val}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Box>
				)}
				{!!subCategories.length && (
					<Box sx={{ width: 120 }} className={styles.selectContainer}>
						<FormControl fullWidth className={`my-2`}>
							<InputLabel id="demo-simple-select-label">
								Sub Category
							</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								id="subcategory"
								name="subcategory"
								value={subcategory}
								label="Sub Category"
								onChange={handleChange}
							>
								{subCategories
									.filter((it) => it.categoryid == category)
									.map(({ id, val }) => (
										<MenuItem
											key={id}
											id="category_4"
											value={id}
											className={styles.selectItem}
										>
											{val}
										</MenuItem>
									))}
							</Select>
						</FormControl>
					</Box>
				)}
				<div className={"my-2"}>
					<Editor
						apiKey="zq4kgku6qtfp8k5buue6qjr9g2i2vtxj7asuy7dlqn7oimic"
						onEditorChange={(e) => setEditorHTML(e)}
						id="listing_id"
						initialValue=""
						init={{
							height: 500,
							menubar: false,
							plugins: [
								"advlist autolink lists link image charmap print preview anchor",
								"searchreplace visualblocks code fullscreen",
								"insertdatetime media table paste code help wordcount",
							],
							toolbar:
								"undo redo | formatselect | " +
								"bold italic backcolor | alignleft aligncenter " +
								"alignright alignjustify | bullist numlist outdent indent | " +
								"removeformat | help",
							content_style:
								"body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
						}}
						value={editorHTML}
					/>
				</div>
			</div>
		</div>
	);
};

export default ListingDetails;
