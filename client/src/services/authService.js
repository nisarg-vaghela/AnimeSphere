import http from "./http";
import jwtDecode from "jwt-decode";

const apiUrl = "/api/auth";
const tokenKey = "token";

setTimeout(() => {
  http.setJWT(getJWT());
}, 1000);

export async function login(email, password) {
  const res = await http.post(apiUrl, { email, password });
  const token = res.headers["x-auth-token"];

  localStorage.setItem(tokenKey, token);
}

export function loginWithJWT(token) {
  localStorage.setItem(tokenKey, token);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export async function getCurrentUser() {
  try {
    const token = localStorage.getItem(tokenKey);
    const user = jwtDecode(token);
    return await http.get(`/api/users/${user.id}`);
  } catch (error) {
    return { data: null };
  }
}

export async function getUserReviews(userid) {
  try {
    return await http.get(`/api/reviews/${userid}`);
  } catch (error) {
    return { data: null };
  }
}

export function getJWT() {
  return localStorage.getItem(tokenKey);
}

const exportVar = {
  login,
  loginWithJWT,
  logout,
  getCurrentUser,
  getJWT,
};

export default exportVar;
