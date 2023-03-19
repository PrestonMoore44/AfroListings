import React, { useEffect, useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { saveListing as saveCurrentListing } from "../../lib/services/listings-service";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
		title: Yup.string()
			.min(2, "Too Short!")
			.max(50, "Too Long!")
			.required("Required"),

		description: Yup.string()
			.min(2, "Too Short!")
			.max(50, "Too Long!")
			.required("Required"),

		subcategory: Yup.string()
			.min(2, "Too Short!")
			.max(50, "Too Long!")
			.required("Required"),
	});

	const initRef = (editor) => {
		if (editorRef) {
			editorRef.current = editor;
		}
	};

	const fetchCategories = async () => {
		let data = await getCategories();
		let subs = await getSubCategories();
		setSubCategories(subs);
		setCategories(data);
	};

	const saveListing = async (data, something) => {
		// Save entire listing
		console.log(data, " THan editor Ref", editorRef, formRef);
		// const blobCache = editorRef.current.editorUpload.blobCache;
		// const uploadCache = editorRef.current.editorUpload.uploadCache;
		console.log(editorHTML, " VALUE then images", images);
		const savedListing = await saveCurrentListing({
			...data,
			body: editorHTML,
		});
		console.log(savedListing, " After save.... ");
	};

	const log = () => {
		if (editorRef.current) {
			console.log(editorRef.current.getContent());
		}
	};

	return (
		<div className={styles.homepageContainerMain}>
			<div className={styles.containerHeader}>
				<Stepper
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
											handleChange={handleChange}
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
											webiste={values.webiste}
											handleChange={handleChange}
											touched={touched}
											errors={errors}
										/>
									)}
									{view === 3 && (
										<Audience
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
						<MediaUpload setParentImages={setImages}></MediaUpload>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreateListing;
