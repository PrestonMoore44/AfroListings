import React, { useState, useEffect } from "react";
import styles from "./stepper.module.css";
import StepProgressBar from "custom-react-stepper";
// import the stylesheet
import "custom-react-stepper/dist/index.css";

const Stepper = ({ view, setView, formRef, step2Validator }) => {
	// setup the step content
	const [nextStep, setNextStep] = useState(null);
	const [prevStep, setPrevStep] = useState(null);
	useEffect(() => {
		// console.log(
		// 	view,
		// 	setView,
		// 	" formRef ",
		// 	formRef.current.errors,
		// 	" Ref "
		// );
	}, []);
	setTimeout(() => {
		Array.from(document?.getElementsByClassName("_2pGos")).forEach((el) => {
			// console.log(el, " Btn");
		});
		Array.from(document?.getElementsByClassName("_2Jtxm")).forEach(
			(el, ind) => {
				// Do stuff here
				el.onclick = function () {
					setView(ind + 1);
					setNextStep(ind);
				};
			}
		);
	}, 250);

	function step3Validator() {
		// return a boolean
		return true;
	}

	function onFormSubmit() {
		// handle the submit logic here
		// This function will be executed at the last step
		// when the submit button (next button in the previous steps) is pressed
	}
	const handleNext = () => {
		console.log("IDK");
	};

	return (
		<StepProgressBar
			wrapperClass="fixedMe"
			labelClass="smallText"
			handleNext={handleNext}
			nextStep={nextStep}
			prevStep={prevStep}
			startingStep={view - 1}
			buttonWrapperClass="hide"
			progressClass="stepClass"
			onSubmit={onFormSubmit}
			steps={[
				{
					label: "Listing Details",
					name: "Listing Details",
					validator: step2Validator,
				},
				{
					label: "Contact Info",
					name: "Contact Info",
				},
				{
					label: "Audience",
					name: "Audience",
					validator: step3Validator,
				},
			]}
		/>
	);
};

export default Stepper;
