import React, { useState, useEffect } from "react";
import styles from "./stepper.module.css";
import StepProgressBar from "custom-react-stepper";
// import the stylesheet
import "custom-react-stepper/dist/index.css";

const Stepper = ({ view, setView }) => {
	// setup the step content
	const [nextStep, setNextStep] = useState(null);
	const [prevStep, setPrevStep] = useState(null);
	console.log(view, setView);
	setTimeout(() => {
		Array.from(document.getElementsByClassName("_2pGos")).forEach((el) => {
			// console.log(el, " Btn");
		});
		Array.from(document.getElementsByClassName("_2Jtxm")).forEach(
			(el, ind) => {
				// Do stuff here
				el.onclick = function () {
					setView(ind + 1);
					setNextStep(ind + 1);
				};
			}
		);
	}, 250);

	const step1Content = <h1>Step 1 Content</h1>;
	const step2Content = <h1>Step 2 Content</h1>;
	const step3Content = <h1>Step 3 Content</h1>;

	// setup step validators, will be called before proceeding to the next step
	function step2Validator() {
		// return a boolean
	}

	function step3Validator() {
		// return a boolean
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
				},
				{
					label: "Contact Info",
					name: "Contact Info",
					validator: step2Validator,
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
