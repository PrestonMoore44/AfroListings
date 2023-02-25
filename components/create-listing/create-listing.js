import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { useFormikContext, Formik, Form, Field } from "formik";
import Button from "@material-ui/core/Button";
import {
	FormControl,
	FilledInput,
	FormHelperText,
	Input,
	InputLabel,
	OutlinedInput,
	Box,
	MenuItem,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import styles from "./create-listing.module.css";

const CreateListing = ({ theme }) => {
	const router = useRouter();
	const dispatch = useDispatch();
	const user = useSelector((store) => store.user);
	useEffect(() => {
		console.log(user, " User from store  from C ", theme);
	}, [user]);

	return (
		<div className={styles.homepageContainerMain}>
			<div className={styles.containerHeader}>
				<div className={styles.header}>Listing Details</div>
				<div className="d-flex">
					<div className={styles.formContainer}>
						<Formik
							initialValues={{
								title: "",
								description: "",
								phone: "",
								category: "",
								subcategory: "",
								message: "",
							}}
						>
							{({
								setFieldValue,
								values,
								handleChange,
								touched,
								errors,
							}) => (
								<Form className={"d-block"}>
									<FormControl fullWidth className={"my-2"}>
										<InputLabel htmlFor="title">
											Title
										</InputLabel>
										<OutlinedInput
											required
											id="title"
											label="Title"
											placeholder="Add a title that describes your listing"
											value={values.title}
											onChange={handleChange}
											error={
												touched.title &&
												Boolean(errors.title)
											}
										/>
									</FormControl>
									<FormControl fullWidth className={"my-2"}>
										<InputLabel htmlFor="description">
											Description
										</InputLabel>
										<OutlinedInput
											required
											placeholder="Tell viewers about your listing"
											id="description"
											label="Sub Title"
											value={values.description}
											onChange={handleChange}
											error={
												touched.description &&
												Boolean(errors.description)
											}
										/>
									</FormControl>
									<Box
										sx={{ width: 120 }}
										className={styles.selectContainer}
									>
										<FormControl
											className={`my-2`}
											fullWidth
										>
											<InputLabel id="demo-simple">
												Category
											</InputLabel>
											<Select
												labelId="demo-simple"
												id="category"
												name="category"
												value={values.category}
												label="Category"
												onChange={(e) => {
													console.log(e);
													handleChange(e);
												}}
											>
												<MenuItem
													id="category_1"
													value={"10"}
													className={
														styles.selectItem
													}
												>
													Ten
												</MenuItem>
												<MenuItem
													value={"20"}
													className={
														styles.selectItem
													}
												>
													Twenty
												</MenuItem>
												<MenuItem
													value={"30"}
													className={
														styles.selectItem
													}
												>
													Thirty
												</MenuItem>
											</Select>
										</FormControl>
									</Box>
									<Box
										sx={{ width: 120 }}
										className={styles.selectContainer}
									>
										<FormControl
											fullWidth
											className={`my-2`}
										>
											<InputLabel id="demo-simple-select-label">
												Sub Category
											</InputLabel>
											<Select
												labelId="demo-simple-select-label"
												id="demo-simple-select"
												id="subcategory"
												name="subcategory"
												value={values.subcategory}
												label="Sub Category"
												onChange={handleChange}
											>
												<MenuItem
													value={"10"}
													className={
														styles.selectItem
													}
												>
													Ten
												</MenuItem>
												<MenuItem
													value={"20"}
													className={
														styles.selectItem
													}
												>
													Twenty
												</MenuItem>
												<MenuItem
													value={"30"}
													className={
														styles.selectItem
													}
												>
													Thirty
												</MenuItem>
											</Select>
										</FormControl>
									</Box>
									<TextareaAutosize
										className={`my-2 ${styles.textareaCustom} ${styles.customBorders}`}
										minRows={5}
										id="message"
										required
										variant="outlined"
										name="message"
										label="message"
										placeholder="Message"
										value={values.message}
										onChange={handleChange}
										error={
											touched.message &&
											Boolean(errors.message)
										}
									/>
									<Button
										className={`mt-2 mb-3 w-100 ${styles.signInBtn}`}
										color="primary"
										variant="contained"
										fullWidth
										type="submit"
									>
										submit
									</Button>
								</Form>
							)}
						</Formik>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreateListing;
