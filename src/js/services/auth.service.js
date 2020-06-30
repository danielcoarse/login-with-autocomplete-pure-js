import axios from "../plugins/axios";

/**
 * Function Login. Make login request to API
 * @param {String} email
 * @param {String} password
 */
export async function login(email, password) {
  try {
    const response = await axios.post(
      `/auth/login`,
      JSON.stringify({ email, password })
    );
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
}

export async function signup(obj) {
  try {
    const response = await axios.post(`/auth/signup`, JSON.stringify(obj));
    console.log(response);
    return response.message;
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
}

export async function getCountries() {
  try {
    const response = await axios.get(`/location/get-countries`);
    return response;
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
}

export async function getCitiesByCountryCode(code) {
  try {
    const response = await axios.get(`/location/get-cities/${code}`);
    return response;
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
}