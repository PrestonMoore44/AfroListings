import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import styles from "./login.module.css";
import { GrFormClose } from "react-icons/gr";
import jwt_decode from "jwt-decode";
import { useFormikContext, Formik, Form, Field } from "formik";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import ReCAPTCHA from "react-google-recaptcha";
import { saveNewUser, login } from "../../../services/userServices";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

const Login = ({ setShowLogin }) => {
	const { setFieldValue, values, submitForm } = useFormikContext() ?? {};
	const router = useRouter();
	const dispatch = useDispatch();
	const [loginErr, setLoginErr] = useState(false);
	const [signUpErr, setSignUpErr] = useState(false);
	const user = useSelector((state) => state.user);
	const [showCapErr, setShowCapErr] = useState(false);
	const captchaRef = useRef(null);
	const emailRef = useRef(null);
	const [hoverItem, setHoverItem] = useState(null);
	const [step, setStep] = useState(1);
	const [effect, setEffect] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setEffect(true);
		});
		console.log("OK");
	}, []);
	const SignupSchema = Yup.object().shape({
		password: Yup.string()
			.min(3, "Password must be at least 4 characters")
			.max(25, "Password must be less than 26 characters")
			.required("Required"),
		email: Yup.string().email("Invalid email").required("Required"),
	});

	const SigninSchema = Yup.object().shape({
		password: Yup.string().required("Required"),
		email: Yup.string().email("Invalid email").required("Required"),
	});

	useEffect(() => {}, []);

	const inheritData = async (data, updateMethod) => {
		var dataObj = jwt_decode(data.credential);
		console.log(dataObj, " OK SIR", updateMethod);
		// Attempt login with data returned
		if (dataObj.email) {
			const user = await login(dataObj);
			if (user.id) {
				dispatch({
					type: "setUser",
					user,
				});
				setShowLogin(false);
			} else {
				setLoginErr(true);
			}
			console.log(user);
		} else {
			// No data found
		}
		// updateMethod("email", dataObj.email);
		// updateMethod("userName", dataObj.name);
		// updateMethod("picture", dataObj.picture);
		// setStep(2);
	};

	const resetLogin = () => {
		setLoginErr(false);
		setStep(1);
	};

	const saveUser = async (
		{ firstName, lastName, userName, email, password, picture },
		setFieldValue
	) => {
		let user = await saveNewUser({
			firstName,
			lastName,
			userName,
			email,
			password,
			picture,
		});
		console.log(user, " Hello ");
		if (user.id) {
			// Saved successfully
			dispatch({
				type: "setUser",
				user,
			});
			setShowLogin(false);
		} else {
			// User already exist with that email!
			setFieldValue("password", "");
			setFieldValue("email", "");
			emailRef.current.focus();
			setSignUpErr(true);
		}
	};

	return (
		<div
			className={`${styles.loginContainer} ${
				!!effect ? styles.showEffect : null
			}`}
		>
			<div className={`${styles.loginBody}`}>
				<div className={styles.closeContainer}>
					<GrFormClose onClick={() => setShowLogin(false)} />
				</div>
				{step === 1 ? (
					<>
						<h2 className={`mb-1`}>Sign in</h2>
						<div className={`${styles.needAccount} mb-4`}>
							Need an account?
							<a onClick={() => setStep(2)}>
								{" "}
								Join Afro Listings
							</a>
						</div>
					</>
				) : (
					<>
						<h2 className={`mb-1`}>Sign up</h2>
						<div className={`${styles.needAccount} mb-4`}>
							Already a memeber?
							<a onClick={() => resetLogin()}> Sign in</a>
						</div>
					</>
				)}

				<div className={styles.bottomContainer}>
					{step === 1 && (
						<Formik
							initialValues={{
								email: "",
								password: "",
								picture: "",
							}}
							validationSchema={SigninSchema}
							onSubmit={async (values) => {
								console.log(values);
								const user = await login(values);
								// User found, dispatch setUser and continue
								if (user.id) {
									dispatch({
										type: "setUser",
										user,
									});
									setShowLogin(false);
								} else {
									// User not found, show login err
									setLoginErr(true);
								}
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
									<div className={`${styles.container}`}>
										{loginErr && (
											<div
												className={
													styles.loginErrContainer
												}
											>
												<div
													className={styles.errHeader}
												>
													Error
												</div>
												<div>
													The email address and/or
													password you entered do not
													match any accounts on
													record. Need help?
												</div>
												<div className={styles.reset}>
													Reset your password
												</div>
											</div>
										)}
										<div className={`mb-4`}>
											<GoogleLogin
												onSuccess={(resp) =>
													inheritData(
														resp,
														setFieldValue
													)
												}
												width="300"
												text="continue_with"
												shape="square"
												onError={() => {
													console.log("Login Failed");
												}}
											/>
										</div>
										<TextField
											className={`my-2`}
											fullWidth
											id="email"
											required
											name="email"
											label="Email"
											value={values.email}
											onChange={handleChange}
											error={
												touched.email &&
												Boolean(errors.email)
											}
											helperText={
												touched.email && errors.email
											}
										/>
										<TextField
											className={`my-2`}
											fullWidth
											id="password"
											required
											name="password"
											label="Password"
											type="password"
											value={values.password}
											onChange={handleChange}
											error={
												touched.password &&
												Boolean(errors.password)
											}
											helperText={
												touched.password &&
												errors.password
											}
										/>
										<div className={styles.privacy}>
											By signing in you agree to Afro's
											Terms and Privacy
										</div>
										<Button
											className={`mt-5 ${styles.signInBtn}`}
											color="primary"
											variant="contained"
											fullWidth
											type="submit"
										>
											Sign In
										</Button>
									</div>
								</Form>
							)}
						</Formik>
					)}
					{step === 2 && (
						<Formik
							initialValues={{
								userName: "",
								email: "",
								password: "",
							}}
							validationSchema={SignupSchema}
							onSubmit={async (values, { setFieldValue }) => {
								// Verify captcha value then save new user
								const token = captchaRef.current.getValue();
								if (!token) {
									setShowCapErr(true);
								} else {
									saveUser(values, setFieldValue);
								}
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
									{!!signUpErr && (
										<div
											className={styles.loginErrContainer}
										>
											<div className={styles.errHeader}>
												Error
											</div>
											<div>
												The email address is already
												registered with another account.
												Try again.
											</div>
										</div>
									)}
									<TextField
										fullWidth
										id="userName"
										name="userName"
										required
										label="Display name"
										className={`my-2`}
										value={values.userName}
										onChange={handleChange}
										error={
											touched.userName &&
											Boolean(errors.userName)
										}
										helperText={
											touched.userName && errors.userName
										}
									/>
									<TextField
										className={`my-2`}
										fullWidth
										id="email"
										required
										name="email"
										label="Email"
										inputRef={emailRef}
										value={values.email}
										onChange={handleChange}
										error={
											touched.email &&
											Boolean(errors.email)
										}
										helperText={
											touched.email && errors.email
										}
									/>
									<TextField
										className={`my-2`}
										fullWidth
										id="password"
										required
										name="password"
										label="Password"
										type="password"
										value={values.password}
										onChange={handleChange}
										error={
											touched.password &&
											Boolean(errors.password)
										}
										helperText={
											touched.password && errors.password
										}
									/>
									<ReCAPTCHA
										className={`mt-3`}
										onChange={(val) => setShowCapErr(!val)}
										sitekey="6LdKXJEkAAAAAI3au3h6Lu1OSlhK_pVt-eVI_xEE"
										ref={captchaRef}
									/>
									{showCapErr && (
										<small>
											CAPTCHA response required.
										</small>
									)}
									<Button
										className={`mt-5 ${styles.signInBtn}`}
										color="primary"
										variant="contained"
										fullWidth
										type="submit"
									>
										Sign Up
									</Button>
								</Form>
							)}
						</Formik>
					)}
				</div>
			</div>
		</div>
	);
};

export default Login;
