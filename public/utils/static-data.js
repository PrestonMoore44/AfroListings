import { GoTriangleUp } from "react-icons/go";
import { BsPlusSquare } from "react-icons/bs";
import { BiUser } from "react-icons/bi";
import { IoExitOutline } from "react-icons/io5";

export const pageTitles = {
	"/": {
		title: "Afro Business, Afro Education, Afro Community",
		subTitle: "Largest Black Owned Businesses Directory Worldwide",
	},
	"/business-listings": {
		title: "Work For The Success You Dream Of",
	},
	"/housing-listings": {
		title: "Home Is Where The Heart Is",
	},
	"/education-listings": {
		title: "Education Is The Key To Changing The World",
	},
	"/travel-listings": {
		title: "Travel is Our Therapy",
	},
	"/influencer-listings": {
		title: "Influce is King",
	},
	"/listings": {
		title: "",
	},
};

export const userDropDownOptions = {
	Profile: {
		icon: <BiUser />,
		link: "/profile",
	},
	"Create Listing": {
		icon: <BsPlusSquare />,
		link: "/listing/create",
	},
	"Sign Out": {
		icon: <IoExitOutline />,
		link: "/",
	},
};

export const agePreferenceList = [
	"13 to 17",
	"18 to 24",
	"25 to 40",
	"41 to 65",
	"65+",
];

export const convertToUrl = {
	Housing: "/housing-listings",
	Business: "/business-listings",
	Fitness: "/business-listings",
	Dining: "/business-listings",
	Travel: "/travel-listings",
	"Media Influencers": "/influencer-listings",
};
export const businessArr = [
	{
		src: "/tutor.jpeg",
		user: "Nancy Cooks",
		title: "Private tutoring with Nancy",
		desc: "Give a child a headstart with tutoring. I'm a teacher with 5 years teaching experience",
	},
	{
		src: "/creditOption.jpeg",
		user: "Credit Master Sean",
		title: "Have an 800 Credit Score Yet",
		desc: "We can get you there! 5 star credit repair at Valley Wide Credit Repair",
	},
	{
		src: "/stylist.jpg",
		user: "Kesha Kay",
		title: "Is Your Hair Ready For The Big Event",
		desc: "Licensed stylist specializing in braids, and dreadlocks",
	},
	{
		src: "/business_4.jpg",
		user: "Don McStashinbuggle",
		title: "Guaranteed Issue Whole Life Policy Up To 1 Million",
		desc: "Licensed insurance agent to secure generational wealth for your family",
	},
];
export const restArr = [
	{
		src: "/rest_1.jpg",
		user: "Honey Tea LLC",
		title: "Have You Heard of Just Add Honey Tea Company",
		desc: "Blended tea's for everyone! Sweetened and served just for you",
	},
	{
		src: "/rest_2.jpg",
		user: "Hammin's All Star BBQ",
		title: "Lip Smackin Hammin's BBQ Will Leave You Speachless",
		desc: "Award winning BBQ for the entire family. Pull up and see what everyone's talking about",
	},
	{
		src: "/rest_3.jpg",
		user: "Wendy's Kitchen",
		title: "Wendy's Southern Kitchen Is The Best in the Midwest",
		desc: "Traditional Souther Cousine with a midwest twist",
	},
	{
		src: "/rest_4.jpg",
		user: "Carl Kitchens",
		title: "Have You Tasted What The Hype is About At Cartel's Kitchen",
		desc: "Our signature fried wings and thigs are quickly becoming legendary",
	},
];
export const housingArr = [
	{
		src: "https://newbucketpj.s3.us-west-1.amazonaws.com/housing_1.jpg",
		user: "Paramount Properties LLC",
		title: "Modern 1 Bedroom Studio in Heart of Downtown",
		desc: "In the heart of the much desired downtown district",
	},
	{
		src: "/housing_2.jpg",
		user: "Yannique Golden",
		title: "3 Bedroom 2 Bath Home For Rent in Central Fresno",
		desc: "Spacious home recently remodeled in Central Unified school district",
	},
	{
		src: "/housing_3.jpg",
		user: "AJ For The Win",
		title: "2 Bedroom 1.5 Bath Apartment For Rent in Anticoch",
		desc: "Two story apartment with spacious patio and attached garage",
	},
	{
		src: "/housing_4.jpg",
		user: "New Beginnings Properties LLC",
		title: "4 Bedroom 2 Bath Home for Sale in Clovis",
		desc: "Over 2500 square feet of modern living with a hint of country charm",
	},
];

export const politicsArr = [
	{
		src: "/politics_1.jpg",
		user: "Johnny the Activist",
		title: "Gun Rights Activist Says Black Guns Matter",
		desc: "Private tutoring with Nancy",
	},
	{
		src: "/politics_2.jpg",
		user: "Highlife Movements",
		title: "Why Reparations 2023 May Be Reality For Californian's",
		desc: "5 star credit repair at Valley Wide Credit Repair",
	},
	{
		src: "/politics_3.jpg",
		user: "Tremale Jacobs",
		title: "Why Mattlock Belives He Has The Winning Ticket",
		desc: "We belive in results and let our actions do the talking",
	},
	{
		src: "/politics_4.jpg",
		user: "Black Insider",
		title: "Why These Two California Politians Are Causing a Stir This Election Season",
		desc: "Looking for solutions in 2023? Look no further than these two local activist running for office",
	},
];
