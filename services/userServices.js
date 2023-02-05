
import axios from "axios";

export const authenticate =  async ({username = '', pw = ''}) => {
  let resp = await axios.request({
    method: 'POST',
      url: '/authenticate',
      headers : {
        username,
        pw
      }
    })
  return resp.data;
}

export const updateFormService = async(obj) => {
  return await axios.request({
    method: 'POST',
      url: '/updateForm',
      headers : obj
    })
}

export const login = async({ email, password }) => {
  let resp = await axios.request({
    method: 'POST',
      url: '/login',
      headers : {
        email,
        password
      }
    })

  return resp.data;
}

export const saveNewUser = async(obj) => {
  let resp = await axios.request({
    method: 'POST',
      url: '/saveUser',
      headers : obj
    })
  return resp.data;
}

export const geoLocation = async() => {
  let resp = await axios.request({
    method: "GET",
    url: "https://geolocation-db.com/json/89eb4d70-4cbe-11ed-a0f2-51b843ebe8d7"
  })
  return resp.data;
}

export const getFormsService =  async () => {
  let resp = await axios.request({
    method: 'POST',
      url: '/forms',
      headers: {}
    })
  return resp.data;
}
