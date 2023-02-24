import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { useFormikContext, Formik, Form, Field } from "formik";
import Button from "@material-ui/core/Button";
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
								subtitle: "",
								phone: "",
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
								<Form>
									<TextField
										fullWidth
										id="title"
										name="title"
										required
										variant="outlined"
										label="Title"
										className={`my-2 ${styles.customBorders}`}
										value={values.title}
										onChange={handleChange}
										error={
											touched.title &&
											Boolean(errors.title)
										}
										helperText={
											touched.title && errors.title
										}
									/>
									<TextField
										className={`my-2 ${styles.customBorders}`}
										fullWidth
										id="subtitle"
										required
										variant="outlined"
										name="subtitle"
										label="Subtitle"
										value={values.subtitle}
										onChange={handleChange}
										error={
											touched.subtitle &&
											Boolean(errors.subtitle)
										}
										helperText={
											touched.subtitle && errors.subtitle
										}
									/>
									<TextField
										className={`my-2 ${styles.customBorders}`}
										fullWidth
										id="type"
										InputProps={{
											inputProps: {
												style: {
													bordercolor: "#008080",
													outlinecolor: "#008080",
												},
											},
										}}
										required
										variant="outlined"
										name="type"
										label="Type"
										value={values.type}
										onChange={handleChange}
										error={
											touched.type && Boolean(errors.type)
										}
										helperText={touched.type && errors.type}
									/>
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
