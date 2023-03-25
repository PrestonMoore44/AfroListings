import React, { useEffect, useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import {
	saveListing as saveCurrentListing,
	getAWSUploadURL,
} from "../../lib/services/listings-service";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PreviewListing from "./preview-listing/preview-listing";
import ContactInfo from "./form-section/contact-info";
import Audience from "./form-section/audience";
import ListingDetails from "./form-section/listing-details";
import {
	getCategories,
	getSubCategories,
} from "../../lib/services/listings-service";
import { useDispatch, useSelector } from "react-redux";
import { useFormikContext, Formik, Form, Field } from "formik";
import Stepper from "./stepper/stepper";
import MediaUpload from "./media-upload/media-upload";
import {
	FormHelperText,
	OutlinedInput,
	FormControl,
	FilledInput,
	InputLabel,
	MenuItem,
	Select,
	Input,
	Box,
} from "@mui/material";
import * as Yup from "yup";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import styles from "./create-listing.module.css";

const CreateListing = ({ theme }) => {
	const router = useRouter();
	const formRef = useRef();
	const editorRef = useRef(null);
	const [view, setView] = useState(1);
	const dispatch = useDispatch();
	const [images, setImages] = useState([]);
	const [showPreview, setShowPreview] = useState(false);
	const [editorHTML, setEditorHTML] = useState("");
	const [categories, setCategories] = useState([]);
	const [subCategories, setSubCategories] = useState([]);
	const user = useSelector((store) => store.user);
	useEffect(() => {
		fetchCategories();
		setTimeout(() => {
			// if (view === 1) document.getElementById("title").focus();
		}, 500);
	}, [user]);
	const ListingSchema = Yup.object().shape({
		title: Yup.string().required("Required"),

		description: Yup.string().required("Required"),

		subcategory: Yup.string().required("Required"),
	});

	const previewListing = () => {
		setShowPreview(true);
	};

	// setup step validators, will be called before proceeding to the next step
	function step2Validator() {
		// return a boolean
		const { title, description, category, subcategory } =
			formRef?.current?.values;
		if (!title || !description || !category || !subcategory) {
			// Set applicible errors
			if (!title) {
				formRef.current.setTouched(
					Object.assign(formRef?.current?.touched, { title: true })
				);
				formRef.current.setErrors(
					Object.assign(formRef?.current?.errors, {
						title: "Required",
					})
				);
			}
			if (!description) {
				formRef.current.setTouched(
					Object.assign(formRef?.current?.touched, {
						description: true,
					})
				);
				formRef.current.setErrors(
					Object.assign(formRef?.current?.errors, {
						description: "Required",
					})
				);
			}
			if (!category) {
				formRef.current.setTouched(
					Object.assign(formRef?.current?.touched, {
						category: true,
					})
				);
				formRef.current.setErrors(
					Object.assign(formRef?.current?.errors, {
						category: "Required",
					})
				);
			}
			if (!subcategory) {
				formRef.current.setTouched(
					Object.assign(formRef?.current?.touched, {
						subcategory: true,
					})
				);
				formRef.current.setErrors(
					Object.assign(formRef?.current?.errors, {
						subcategory: "Required",
					})
				);
			}
			return false;
		} else {
			// Clear errors and return true
			formRef.current.setErrors({});
			return true;
		}
	}

	const initRef = (editor) => {
		if (editorRef) {
			editorRef.current = editor;
		}
	};

	const handleChangeCustom = (e) => {
		// Set fields and then clear errors if needed
		formRef?.current?.setFieldValue(e.target.id, e.target.value);
		if (
			(e.target.id === "title" || e.target.id === "description") &&
			e.target.value
		) {
			formRef?.current?.setFieldTouched(e.target.id, false, false);
		}
	};

	const fetchCategories = async () => {
		let data = await getCategories();
		let subs = await getSubCategories();
		setSubCategories(subs);
		setCategories(data);
	};

	const saveMedia = async (images) => {
		const arr = [];
		for await (const image of images) {
			let awsUploadURL = await getAWSUploadURL();
			let response = await fetch(awsUploadURL, {
				method: "PUT",
				headers: {
					"Content-Type": "multipart/form-data",
				},
				body: image?.file,
			});
			arr.push(awsUploadURL.split("?")[0]); // Push s3 url to array
		}
		return arr;
	};

	const saveListing = async (data, something) => {
		// Save entire listing
		let mediaItems = [];
		console.log(data, " THan editor Ref", editorRef, formRef.values);
		// const blobCache = editorRef.current.editorUpload.blobCache;
		// const uploadCache = editorRef.current.editorUpload.uploadCache;
		console.log(editorHTML, " VALUE then images", images);
		if (images.length) {
			mediaItems = await saveMedia(images);
			console.log(mediaItems, " Array of values? ");
		}
		const savedListing = await saveCurrentListing({
			...data,
			body: editorHTML,
			media: mediaItems,
		});
	};

	const log = () => {
		if (editorRef.current) {
			console.log(editorRef.current.getContent());
		}
	};

	return (
		<>
			{showPreview && (
				<PreviewListing
					setShowPreview={setShowPreview}
					images={images}
					editorHTML={editorHTML}
					formValues={formRef.current.values}
				/>
			)}
			<div className={styles.homepageContainerMain}>
				<div className={styles.containerHeader}>
					<Stepper
						step2Validator={step2Validator}
						view={view}
						setView={setView}
						formRef={formRef}
					></Stepper>
					<div className="d-flex">
						<div className={styles.formContainer}>
							<Formik
								validationSchema={ListingSchema}
								innerRef={formRef}
								initialValues={{
									title: "",
									description: "",
									phone: "",
									category: "6",
									subcategory: "23",
									message: "",
									website: "",
									phone: "",
									address: "",
									address_2: "",
									city: "",
									state: "",
									zip: "",
									agePrefrence: "Any",
									distance_preference: "",
									sex_preference: "Any",
								}}
								onSubmit={async (values, { setFieldValue }) => {
									saveListing(values, setFieldValue);
								}}
							>
								{({
									setFieldValue,
									values,
									handleChange,
									handleBlur,
									touched,

									errors,
								}) => (
									<Form className={"d-block"}>
										{view === 1 && (
											<ListingDetails
												handleBlur={handleBlur}
												categories={categories}
												touched={touched}
												title={values.title}
												description={values.description}
												category={values.category}
												subcategory={values.subcategory}
												subCategories={subCategories}
												editorHTML={editorHTML}
												setEditorHTML={setEditorHTML}
												handleChange={
													handleChangeCustom
												}
												errors={errors}
											/>
										)}
										{view === 2 && (
											<ContactInfo
												formRef={formRef}
												phone={values.phone}
												address={values.address}
												address_2={values.address_2}
												city={values.city}
												state={values.state}
												zip={values.zip}
												website={values.website}
												handleChange={handleChange}
												touched={touched}
												errors={errors}
											/>
										)}
										{view === 3 && (
											<Audience
												previewListing={previewListing}
												sex_preference={
													values.sex_preference
												}
												errors={errors}
												handleChange={handleChange}
											/>
										)}
									</Form>
								)}
							</Formik>
						</div>
						<div className={styles.mediaContainer}>
							<MediaUpload
								setParentImages={setImages}
							></MediaUpload>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default CreateListing;
