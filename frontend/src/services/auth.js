import { getApiUrl } from "./apiConfig";
import axios from "axios";

export const submitLogin = async props => {
	const { loginData, setWrongCredentials, setOpen, setLoading } =
		props;
	const loginUrl = getApiUrl("auth/login");
	setLoading(true);
	try {
		await axios.post(loginUrl, loginData, { withCredentials: true });
		setLoading(false);
		return true;
	} catch (error) {
		setWrongCredentials({
			wrongData: true,
			infoText: error.response.data.infoMessage,
		});
		setOpen(true);
		setLoading(false);
		return false;
	}
};
export const submitRegister = async registerData => {
	try {
		const response = await axios.post(
			getApiUrl("auth/register"),
			registerData
		);
		return {
			message: response.data.infoMessage,
			success: true,
		};
	} catch (error) {
		return {
			message: error.response.data.infoMessage,
			success: false,
		};
	}
};

export const fillCartItemCount = async userId => {
	const cartItemCountUrl = getApiUrl(`shoppingList/count/${userId}`);
	const responseCartCount = await axios.get(cartItemCountUrl, {
		withCredentials: true,
	});
	localStorage.setItem("number", responseCartCount.data.toString());
	window.dispatchEvent(new Event("storage"));
};
export const fillUserDetails = async () => {
	const userDetailsUrl = getApiUrl("auth/details");
	const response = await axios.get(userDetailsUrl, { withCredentials: true });
	localStorage.setItem("userDetails", JSON.stringify(response.data));
};
export const getUserDetails = () => {
	try {
		return JSON.parse(localStorage.getItem("userDetails"));
	} catch (err) {
		return {
			id: "",
			isAdmin: false,
		};
	}
};

export const logout = ({ navigate }) => {
	const logoutUrl = getApiUrl("auth/logout");
	axios.get(logoutUrl, { withCredentials: true }).then(() => {
		navigate("/", { replace: true });
	});
};
