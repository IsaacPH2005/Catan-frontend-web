import axios from "axios";
import { Buffer } from "buffer";
export const urlBase = 'http://tabla_catan_backend.test/Catan-backend/public/api/';
export const urlBaseAsset = 'http://tabla_catan_backend.test/Catan-backend/public/';
/* export const urlBase = 'https://nxn3hst1-8000.brs.devtunnels.ms/api/';
export const urlBaseAsset = 'https://nxn3hst1-8000.brs.devtunnels.ms/';  */
export const http = () => {
	let token = "";
	if (localStorage.getItem("token") != null) {
		token = Buffer.from(localStorage.getItem("token"), "base64").toString(
			"ascii"
		);
	}

	const interceptor = axios.create({
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		timeout: 15000,
	});
	interceptor.interceptors.response.use(
		function (response) {
			return response;
		},
		function (error) {
			if (error.response && error.response.status) {
				if (error.response.status === 401) {
					localStorage.clear();
					window.location.href = "/login";
				}
			} else {
				console.error('Error al obtener la respuesta');
			}
			return Promise.reject(error);
		}
	);
	return interceptor;
};

export const httpAsset = () => {
	let token = "";
	if (localStorage.getItem("token") != null) {
		token = Buffer.from(localStorage.getItem("token"), "base64").toString(
			"ascii"
		);
	}
	const interceptor = axios.create({
		headers: {
			Accept: "application/json",
			"Content-Type": "multipart/form-data",
			Authorization: `Bearer ${token}`,
		},
		timeout: 15000,
	});
	interceptor.interceptors.response.use(
		function (response) {
			return response;
		},
		function (error) {
			if (error.response.status == 401) {
				localStorage.clear();
				window.location.href = "/login";
			}
			return Promise.reject(error);
		}
	);
	return interceptor;
};

export const httpNotToken = () => {
	const interceptor = axios.create({
		timeout: 15000,
	});
	interceptor.interceptors.response.use(
		function (response) {
			return response;
		},

	);
	return interceptor;
};