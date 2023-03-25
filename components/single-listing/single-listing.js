import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./single-listing.module.css";
import { categories } from "../../services/static-data";
import Cover from "../cover/cover";
import SingleCard from "../single-card/single-card";
import SingleListing from "../../components/single-listing/single-listing";
import { getListing } from "../../lib/services/listings-service";
import StarRatings from "react-star-ratings";
import Comments from "./comments/comments";
import decodeHTMLEntities from "decode-html";
import { htmlEncode } from "htmlencode";
import ReactHtmlParser from "react-html-parser";
import { useFormikContext, Formik, Form, Field } from "formik";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import ReCAPTCHA from "react-google-recaptcha";
import { Adsense } from "@ctrl/react-adsense";
import { useDispatch, useSelector } from "react-redux";
import {
	FacebookIcon,
	FacebookMessengerIcon,
	InstapaperIcon,
	LinkedinIcon,
	RedditIcon,
	TwitterIcon,
	WhatsappIcon,
} from "react-share";
/*
	<div className={styles.reviewContainer}>
		<div className={styles.reviewContainerDiv}>4.5</div>
		<StarRatings
			rating={4.5}
			numberOfStars={5}
			starRatedColor="#ec7211"
			starDimension="20px"
			starSpacing="2px"
			starEmptyColor="#DADCE0"
		/>
		<div className={styles.reviewContainerDivAlt}>
			71 Afro Listings Reviews
		</div>
	</div>
*/

const SingleListings = ({ formValues, images, editorHTML }) => {
	const { user } = useSelector((store) => store);

	useEffect(() => {
		console.log(
			formValues,
			images,
			sessionStorage.getItem("user", JSON.stringify(user))
		);
	}, []);
	const captchaRef = useRef(null);
	const longSTRING = htmlEncode(`<div>
		<p >
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, <a href="https://www.youtube.com/@TheAngryman" target="_blank">sed do eiusmod tempor</a> incididunt ut labore et dolore magna aliqua. Nec ullamcorper sit amet risus nullam eget felis. Sociis natoque penatibus et magnis. Elit ut aliquam purus sit amet. Nibh tellus molestie nunc non blandit massa enim nec. Ut tortor pretium viverra suspendisse potenti nullam ac.
		</p>
		<p>Urna condimentum mattis pellentesque id. Mauris pellentesque pulvinar pellentesque habitant. Eu volutpat odio facilisis mauris sit amet massa. Rutrum quisque non tellus orci ac auctor augue. Ipsum dolor sit amet consectetur. </p>
		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nec ullamcorper sit amet risus nullam eget felis. Sociis natoque penatibus et magnis. Elit ut aliquam purus sit amet. Nibh tellus molestie nunc non blandit massa enim nec. Ut tortor pretium viverra suspendisse potenti nullam ac.</p>
		<p>Nec ullamcorper sit amet risus nullam eget felis. Sociis natoque penatibus et magnis. Elit ut aliquam purus sit amet. Ut tortor pretium viverra suspendisse potenti nullam ac.</p>
	</div>`);
	const [listings, setListings] = useState([]);
	const [arr, setArr] = useState([1, 2, 3, 4, 5, 6]);
	const router = useRouter();
	const { lid } = router.query;
	const [listing, setListing] = useState({});
	const [article, setArticle] = useState(null);
	const [showCapErr, setShowCapErr] = useState(false);

	useEffect(() => {
		console.log(user, " I had to get it... ");
		if (formValues) {
			setListing(formValues);
			setArticle(decodeHTMLEntities(htmlEncode(editorHTML)));
			return;
		} else if (!lid) {
			return;
		}
		setArticle(decodeHTMLEntities(longSTRING));
		fetchListing(lid);
	}, [lid]);

	const fetchListing = async (lid) => {
		let data = await getListing(lid);
		console.log(data, " Listing info");
		setListing(data);
	};

	return (
		<>
			<div className={styles.postOutterContainer}>
				<div className={styles.topBody}>
					<div className={styles.title}>{listing.title}</div>
					<div className={styles.subTitle}>{listing.description}</div>
					<div className={styles.byAndDate}>
						<span className={styles.greyMe}>By</span>{" "}
						{!!formValues ? (
							<span className=" user-select-all pe-auto">
								<a type="button">{user?.username}</a>
							</span>
						) : (
							<span className=" user-select-all pe-auto">
								<a type="button">{listing.username}</a>
							</span>
						)}
						<span className="text-decoration-underline user-select-all pe-auto">
							{listing.username}
						</span>
						<span className={styles.greyMe}>
							{" "}
							|{" "}
							{new Date(
								listing.creationdate || new Date()
							).toDateString()}
						</span>
					</div>
					<div className={styles.actionsContainer}>
						<div className={styles.saveContainer}>
							<i className="bi bi-bookmark"></i>
							<span>Save</span>
						</div>
						<div className={styles.saveContainer}>
							<i className="bi bi-chat"></i>
							<span>Comment</span>
						</div>
						<div>
							<FacebookIcon size={32} round={true} />
						</div>
						<div>
							<TwitterIcon size={32} round={true} />
						</div>
						<div>
							<LinkedinIcon size={32} round={true} />
						</div>
						<div>
							<RedditIcon size={32} round={true} />
						</div>
					</div>
				</div>
				<div className={styles.postBody}>
					<div className={styles.imgContainer}>
						{!!formValues && (
							<img
								src={images[0]?.data_url}
								className={styles.imgMain}
							/>
						)}
						{!formValues && (
							<img src={listing.url} className={styles.imgMain} />
						)}
						<div></div>
					</div>
					<div className={styles.flexMe}>
						<div className={styles.postBodyLeft}>
							<div className={styles.innerBodyContainer}>
								<div>{ReactHtmlParser(article)}</div>
							</div>
							<div>
								<Comments />
							</div>
						</div>
						<div className={styles.postBodyRight}>
							<div className={styles.postBodyRightContainer}>
								Contact {listing.username}
							</div>
							<div className={styles.postBodyRightContainerBody}>
								<div>
									<i className="bi bi-telephone"></i>
									<span>{listing.phone}</span>
								</div>
								<div>
									<i className="bi bi-globe"></i>
									<span>
										<a
											href="https://www.youtube.com/@TheAngryman"
											target="_blank"
										>
											{listing.website}
										</a>
									</span>
								</div>
								<div></div>
							</div>

							<div
								className={`${styles.postBodyRightContainer} mt-5`}
							>
								Send Inquiry
							</div>
							<div className={styles.postBodyRightContainerBody}>
								<Formik
									initialValues={{
										name: "",
										email: "",
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
												id="name"
												name="name"
												required
												variant="outlined"
												label="Name"
												className={`my-2 ${styles.customBorders}`}
												value={values.name}
												onChange={handleChange}
												error={
													touched.name &&
													Boolean(errors.name)
												}
												helperText={
													touched.name && errors.name
												}
											/>
											<TextField
												className={`my-2 ${styles.customBorders}`}
												fullWidth
												id="email"
												required
												variant="outlined"
												name="email"
												label="Email"
												value={values.email}
												onChange={handleChange}
												error={
													touched.email &&
													Boolean(errors.email)
												}
												helperText={
													touched.email &&
													errors.email
												}
											/>
											<TextField
												className={`my-2 ${styles.customBorders}`}
												fullWidth
												id="phone"
												InputProps={{
													inputProps: {
														style: {
															bordercolor:
																"#008080",
															outlinecolor:
																"#008080",
														},
													},
												}}
												required
												variant="outlined"
												name="Phone"
												label="Phone"
												value={values.phone}
												onChange={handleChange}
												error={
													touched.phone &&
													Boolean(errors.phone)
												}
												helperText={
													touched.phone &&
													errors.phone
												}
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
											<ReCAPTCHA
												className={`mt-3`}
												onChange={(val) =>
													setShowCapErr(!val)
												}
												sitekey="6LdKXJEkAAAAAI3au3h6Lu1OSlhK_pVt-eVI_xEE"
												ref={captchaRef}
											/>
											{showCapErr && (
												<small>
													CAPTCHA response required.
												</small>
											)}
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
			</div>
		</>
	);
};

export default SingleListings;
