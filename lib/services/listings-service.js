import useSWR, { mutate } from "swr";
import axios from "axios";

export const useProfile = (handle) => {
  const { data, error } = useSWR(handle ? `/accounts/handles/${handle}` : null);
  if (data && data.data) {
    return data.data;
  }
  return null;
};

export const getProfile = async (handle) => {
  let resp = await axios.request({
    method: "POST",
    url: "/getProfile",
    headers: {
      handle,
    },
  });
  return resp.data;
};

export const followUser = async (follower, following) => {
  let resp = await axios.request({
    method: "POST",
    url: "/followUser",
    headers: {
      follower,
      following,
    },
  });
  return resp.data;
};
export const getTestRequest = async (handle) => {
  let resp = await axios.request({
    method: "GET",
    url: "/getTestRequest",
    headers: {},
  });
  return resp.data;
};

export const getProfiles = async (followers) => {
  let resp = await axios.request({
    method: "GET",
    url: "/getProfiles",
    headers: { followers: JSON.stringify(followers) },
  });
  return resp.data;
};
export const getListings = async (email) => {
  let resp = await axios.request({
    method: "POST",
    url: "/listings",
    headers: {},
  });
  return resp.data;
};

export const getUserListings = async (handle) => {
  console.log(handle, " Haller");
  let resp = await axios.request({
    method: "POST",
    url: "/userlistings",
    headers: {
      handle,
    },
  });
  return resp.data;
};

export const getAWSUploadURL = async () => {
  let resp = await axios.request({
    method: "POST",
    url: "/awsUploadURL",
    headers: {},
  });
  return resp.data;
};

export const listingsByParams = async (location, string) => {
  let resp = await axios.request({
    method: "POST",
    url: "/listingsByParams",
    headers: {
      location,
      string,
    },
  });
  return resp.data;
};

export const listingsSearch = async (location, string) => {
  let resp = await axios.request({
    method: "POST",
    url: "/listingsSearch",
    headers: {
      location,
      string,
    },
  });
  return resp.data;
};

export const getCategories = async () => {
  let resp = await axios.request({
    method: "POST",
    url: "/getCategories",
  });
  return resp.data;
};

export const saveListing = async (listing_data = {}) => {
  console.log(listing_data);
  let resp = await axios.request({
    method: "POST",
    url: "/saveListing",
    headers: {
      listing_data: JSON.stringify(listing_data),
    },
  });
  return resp.data;
};

export const getSubCategories = async () => {
  let resp = await axios.request({
    method: "POST",
    url: "/getSubCategories",
    headers: {},
  });
  return resp.data;
};

export const getListing = async (lid) => {
  let resp = await axios.request({
    method: "POST",
    url: "/listing",
    headers: {
      lid: lid ? lid : 0,
    },
  });
  return resp.data;
};

export const useListing = (lid) => {
  return useSWR(() => (pid ? `/listing/${pid}` : null));
};

export const useAccountPosts = (accountId) => {
  const { data, error } = useSWR(
    accountId ? `/timeline?accountId=${accountId}&type=article` : null
  );
  if (data && data.data) {
    return data.data;
  }
  return [];
};

export const routeMap = {
  housing: "/housing-listings",
  travel: "/travel-listings",
  "media influencers": "/influencer-listings",
  education: "/education-listings",
  dining: "/education-listings",
  business: "/business-listings",
  fitness: "/business-listings",
  // Sub Categories
  // Business
  "business services": "/business-listings?type=Business+Services",
  "financial services": "/business-listings?type=Financial+Services",
  "brand management": "/business-listings?type=Brand+Management",
  "credit services": "/business-listings?type=Credit+Services",
  "legal services": "/business-listings?type=Legal+Services",
  banking: "/business-listings?type=Banking",
  // Social Media
  "social media influencers":
    "/influencer-listings?type=Social+Media+Influencers",
  "brand ambassadors": "/influencer-listings?type=Brand+Ambassadors",
  podcast: "/influencer-listings?type=Podcast",
  // Education
  tutors: "/education-listings?type=Tutors",
  "home-school teachers": "/education-listings?type=Home-School+Teachers",
  finance: "/education-listings?type=Finance",
  "1 on 1 coaching": "/education-listings?type=1+on+1+Coaching",
  "vocational schools": "/education-listings?type=Vocational+Schools",
  "charter schools": "/education-listings?type=Charter+Schools",
  // Housing
  "properties for rent": "/housing-listings?type=Properties+for+Rent",
  "commercial real estate": "/housing-listings?type=Commercial+Real+Estate",
  "properties for sale": "/housing-listings?type=Properties+for+Sale",
  "private rooms": "/housing-listings?type=Private+Rooms",
  "winter vacations": "/travel-listings?type=Winter+Vacations",
  "summer vacations": "/travel-listings?type=Summer+Vacations",
  "summer camps": "/travel-listings?type=Summer+Camps",
  cruises: "/travel-listings?type=Cruises",
};
