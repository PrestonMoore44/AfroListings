import React, { useState, useEffect, useRef } from "react";
import styles from "../create-listing.module.css";
import { usePlacesWidget } from "react-google-autocomplete";
import { FormControl, InputLabel, OutlinedInput } from "@mui/material";

const ContactInfo = ({
	formRef,
	address,
	address_2,
	city,
	state,
	zip,
	phone,
	website,
	handleChange,
	touched,
	errors,
}) => {
	useEffect(() => {
		setTimeout(() => {
			ref.current.focus();
		}, [250]);
	}, []);
	const { ref, autocompleteRef } = usePlacesWidget({
		apiKey: "AIzaSyAS_RztbgwNh7Wmp0lTr1SnsipmQnpPfxw",
		onPlaceSelected: (place) => {
			const { address_components } = place;
			const { setFieldValue } = formRef.current;
			address_components[0]?.long_name && address_components[1]?.long_name
				? setFieldValue(
						"address",
						`${address_components[0]?.long_name} ${address_components[1]?.long_name}`
				  )
				: null;
			address_components[2]?.long_name
				? setFieldValue(
						"city",
						address_components.filter((it) =>
							it.types.includes("locality")
						)[0]?.long_name
				  )
				: null;
			address_components[4]?.long_name
				? setFieldValue(
						"state",
						address_components.filter((it) =>
							it.types.includes("administrative_area_level_1")
						)[0]?.long_name
				  )
				: null;
			address_components[6]?.long_name
				? setFieldValue(
						"zip",
						address_components.filter((it) =>
							it.types.includes("postal_code")
						)[0]?.long_name
				  )
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
	return (
		<div>
			<div className={styles.header}>Contact Info</div>
			<FormControl fullWidth className={"my-2 mt-3"}>
				<label className="pure-material-textfield-outlined">
					<input
						placeholder=" "
						ref={ref}
						id="address"
						value={address}
						onChange={handleChange}
					/>
					<span>Address</span>
				</label>
			</FormControl>
			<FormControl fullWidth className={"my-2"}>
				<InputLabel htmlFor="address_2">Address 2</InputLabel>
				<OutlinedInput
					id="address_2"
					label="Address 2"
					placeholder=""
					value={address_2}
					onChange={handleChange}
				/>
			</FormControl>
			<FormControl fullWidth className={"my-2"}>
				<InputLabel htmlFor="city">City</InputLabel>
				<OutlinedInput
					id="city"
					label="City"
					placeholder=""
					value={city}
					onChange={handleChange}
				/>
			</FormControl>
			<FormControl fullWidth className={"my-2"}>
				<InputLabel htmlFor="state">State</InputLabel>
				<OutlinedInput
					id="state"
					label="State"
					placeholder="555-555-5555"
					value={state}
					onChange={handleChange}
				/>
			</FormControl>
			<FormControl fullWidth className={"my-2"}>
				<InputLabel htmlFor="zip">Zip</InputLabel>
				<OutlinedInput
					id="zip"
					label="Zip"
					placeholder=""
					value={zip}
					onChange={handleChange}
				/>
			</FormControl>
			<FormControl fullWidth className={"my-2"}>
				<InputLabel htmlFor="phone">Phone</InputLabel>
				<OutlinedInput
					required
					id="phone"
					label="Phone"
					placeholder="555-555-5555"
					value={phone}
					onChange={handleChange}
				/>
			</FormControl>
			<FormControl fullWidth className={"my-2"}>
				<InputLabel htmlFor="webiste">WebSite</InputLabel>
				<OutlinedInput
					required
					id="website"
					label="WebSite"
					placeholder="Website where viewers can get more info"
					value={website}
					onChange={handleChange}
				/>
			</FormControl>
		</div>
	);
};

export default ContactInfo;
