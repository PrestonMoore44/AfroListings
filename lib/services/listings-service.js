import useSWR, { mutate } from "swr";
import axios from "axios";

export const useProfile = (handle) => {
  const { data, error } = useSWR(handle ? `/accounts/handles/${handle}` : null);
  if (data && data.data) {
    return data.data;
  }
  return null;
};

export const getListings = async (email) => {
  let resp = await axios.request({
    method: "POST",
    url: "/listings",
    headers: {},
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
