import React, { useEffect, useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { saveListing as saveCurrentListing } from "../../lib/services/listings-service";
import { useRouter } from "next/router";
import { usePlacesWidget } from "react-google-autocomplete";
import { agePreferenceList } from "../../public/utils/static-data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import {
	getCategories,
	getSubCategories,
} from "../../lib/services/listings-service";
import { useDispatch, useSelector } from "react-redux";
import { useFormikContext, Formik, Form, Field } from "formik";
import Button from "@material-ui/core/Button";
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
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import styles from "./create-listing.module.css";

const CreateListing = ({ theme }) => {
	const { ref, autocompleteRef } = usePlacesWidget({
		apiKey: "AIzaSyAS_RztbgwNh7Wmp0lTr1SnsipmQnpPfxw",
		onPlaceSelected: (place) => {
			console.log(place);
			const { address_components } = place;
			const { setFieldValue } = formRef.current;
			address_components[0]?.long_name && address_components[1]?.long_name
				? setFieldValue(
						"address",
						`${address_components[0]?.long_name} ${address_components[1]?.long_name}`
				  )
				: null;
			address_components[2]?.long_name
				? setFieldValue("city", address_components[2]?.long_name)
				: null;
			address_components[4]?.long_name
				? setFieldValue("state", address_components[4]?.long_name)
				: null;
			address_components[6]?.long_name
				? setFieldValue("zip", address_components[6]?.long_name)
				: null;
		},
		options: {
			componentRestrictions: { country: "us" },
			fields: [
				"address_components",
				"adr_address",
				"geometry",
				"icon",
				"name",
			],
			types: ["address"],
			strictBounds: false,
		},
	});
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
		console.log(data, " THan editor Ref", editorRef);
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
				<Stepper view={view} setView={setView}></Stepper>
				<div className="d-flex">
					<div className={styles.formContainer}>
						<Formik
							innerRef={formRef}
							initialValues={{
								title: "",
								description: "",
								phone: "",
								category: "6",
								subcategory: "",
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
								touched,
								errors,
							}) => (
								<Form className={"d-block"}>
									{view === 2 && (
										<div className={"d-flex"}>
											<div className={"d-block"}>
												<div className={styles.header}>
													Listing Details
												</div>
												<FormControl
													fullWidth
													className={"my-2"}
												>
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
															Boolean(
																errors.title
															)
														}
													/>
												</FormControl>
												<FormControl
													fullWidth
													className={"my-2"}
												>
													<InputLabel htmlFor="description">
														Description
													</InputLabel>
													<OutlinedInput
														required
														placeholder="Tell viewers about your listing"
														id="description"
														label="Sub Title"
														value={
															values.description
														}
														onChange={handleChange}
														error={
															touched.description &&
															Boolean(
																errors.description
															)
														}
													/>
												</FormControl>
												{!!categories.length && (
													<Box
														sx={{ width: 120 }}
														className={
															styles.selectContainer
														}
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
																value={
																	values.category
																}
																label="Category"
																onChange={(
																	e
																) => {
																	console.log(
																		e
																	);
																	handleChange(
																		e
																	);
																}}
															>
																{categories.map(
																	({
																		id,
																		val,
																	}) => (
																		<MenuItem
																			key={
																				id
																			}
																			id="category_1"
																			value={
																				id
																			}
																			className={
																				styles.selectItem
																			}
																		>
																			{
																				val
																			}
																		</MenuItem>
																	)
																)}
															</Select>
														</FormControl>
													</Box>
												)}
												{!!subCategories.length && (
													<Box
														sx={{ width: 120 }}
														className={
															styles.selectContainer
														}
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
																value={
																	values.subcategory
																}
																label="Sub Category"
																onChange={
																	handleChange
																}
															>
																{subCategories
																	.filter(
																		(it) =>
																			it.categoryid ==
																			values.category
																	)
																	.map(
																		({
																			id,
																			val,
																		}) => (
																			<MenuItem
																				key={
																					id
																				}
																				id="category_4"
																				value={
																					id
																				}
																				className={
																					styles.selectItem
																				}
																			>
																				{
																					val
																				}
																			</MenuItem>
																		)
																	)}
															</Select>
														</FormControl>
													</Box>
												)}
												<div className={"my-2"}>
													<Editor
														apiKey="zq4kgku6qtfp8k5buue6qjr9g2i2vtxj7asuy7dlqn7oimic"
														onEditorChange={(e) =>
															setEditorHTML(e)
														}
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
									)}
									{view === 1 && (
										<div>
											<div className={styles.header}>
												Contact Info
											</div>
											<FormControl
												fullWidth
												className={"my-2 mt-3"}
											>
												<label className="pure-material-textfield-outlined">
													<input
														placeholder=" "
														ref={ref}
														id="address"
														value={values.address}
														onChange={handleChange}
													/>
													<span>Address</span>
												</label>
											</FormControl>
											<FormControl
												fullWidth
												className={"my-2"}
											>
												<InputLabel htmlFor="address_2">
													Address 2
												</InputLabel>
												<OutlinedInput
													required
													id="address_2"
													label="Address 2"
													placeholder=""
													value={values.address_2}
													onChange={handleChange}
													error={
														touched.title &&
														Boolean(errors.title)
													}
												/>
											</FormControl>
											<FormControl
												fullWidth
												className={"my-2"}
											>
												<InputLabel htmlFor="city">
													City
												</InputLabel>
												<OutlinedInput
													required
													id="city"
													label="City"
													placeholder=""
													value={values.city}
													onChange={handleChange}
													error={
														touched.title &&
														Boolean(errors.title)
													}
												/>
											</FormControl>
											<FormControl
												fullWidth
												className={"my-2"}
											>
												<InputLabel htmlFor="state">
													State
												</InputLabel>
												<OutlinedInput
													required
													id="state"
													label="State"
													placeholder="555-555-5555"
													value={values.state}
													onChange={handleChange}
													error={
														touched.title &&
														Boolean(errors.title)
													}
												/>
											</FormControl>
											<FormControl
												fullWidth
												className={"my-2"}
											>
												<InputLabel htmlFor="zip">
													Zip
												</InputLabel>
												<OutlinedInput
													required
													id="zip"
													label="Zip"
													placeholder=""
													value={values.zip}
													onChange={handleChange}
													error={
														touched.title &&
														Boolean(errors.title)
													}
												/>
											</FormControl>
											<FormControl
												fullWidth
												className={"my-2"}
											>
												<InputLabel htmlFor="phone">
													Phone
												</InputLabel>
												<OutlinedInput
													required
													id="phone"
													label="Phone"
													placeholder="555-555-5555"
													value={values.phone}
													onChange={handleChange}
													error={
														touched.title &&
														Boolean(errors.title)
													}
												/>
											</FormControl>
											<FormControl
												fullWidth
												className={"my-2"}
											>
												<InputLabel htmlFor="webiste">
													WebSite
												</InputLabel>
												<OutlinedInput
													required
													id="webiste"
													label="WebSite"
													placeholder="Website where viewers can get more info"
													value={values.webiste}
													onChange={handleChange}
													error={
														touched.title &&
														Boolean(errors.title)
													}
												/>
											</FormControl>
										</div>
									)}
									{view === 3 && (
										<>
											<div className={"d-block"}>
												<div className={styles.header}>
													Audience
												</div>
												<Box
													sx={{ width: 120 }}
													className={
														styles.selectContainer
													}
												>
													<FormControl
														fullWidth
														className={"my-2 mt-3"}
													>
														<InputLabel id="sex_preference">
															Gender
														</InputLabel>
														<Select
															labelId="sex_preference"
															id="sex_preference"
															name="sex_preference"
															value={
																values.sex_preference
															}
															label="Gender"
															onChange={(e) =>
																handleChange(e)
															}
														>
															<MenuItem
																className={
																	styles.selectItem
																}
																value={"Men"}
															>
																Men
															</MenuItem>
															<MenuItem
																className={
																	styles.selectItem
																}
																value={"Women"}
															>
																Women
															</MenuItem>
															<MenuItem
																className={
																	styles.selectItem
																}
																value={"Any"}
															>
																Any
															</MenuItem>
														</Select>
													</FormControl>
												</Box>
												<div
													className={styles.customBox}
												>
													<label
														className={
															styles.customLabel
														}
													>
														Age Group
													</label>
													<FormControl
														className={`my-2`}
														fullWidth
													>
														{agePreferenceList.map(
															(it) => (
																<FormControlLabel
																	key={it}
																	control={
																		<Checkbox
																			className={
																				"mx-2"
																			}
																			size="small"
																		/>
																	}
																	label={it}
																/>
															)
														)}
													</FormControl>
												</div>
											</div>
											<Button
												className={`mt-2 mb-3 w-100 ${styles.signInBtn}`}
												color="primary"
												variant="contained"
												fullWidth
												type="submit"
											>
												submit
											</Button>
										</>
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
