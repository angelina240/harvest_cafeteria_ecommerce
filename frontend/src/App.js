import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Client from "./components/client/client";
import Home from "./components/client/home";
import Detail from "./components/client/components/detail";
import Cart from "./components/client/cart";
import PurchaseHistory from "./components/client/purchase-history";
import { useEffect, useState } from "react";

const LOGIN_STATE = {
	LOGGED: 1,
	LOGOUT: 2,
	WAITING: 3,
};

function App() {
	const [loginState, setLoginState] = useState(LOGIN_STATE.WAITING);
	useEffect(() => {
		if (localStorage.hasOwnProperty("userDetails"))
			setLoginState(LOGIN_STATE.LOGGED);
		else setLoginState(LOGIN_STATE.LOGOUT);
	}, []);
	if (loginState === LOGIN_STATE.WAITING)
		return null;
	return (
		<Routes>
			{loginState === LOGIN_STATE.LOGGED ? (
				<>
					<Route
						path="store"
						element={
							<Client
								notifyLogout={() =>
									setLoginState(LOGIN_STATE.LOGOUT)
								}
							/>
						}
					>
						<Route
							path=""
							element={<Home />}
						/>
						<Route
							path="detail/:id/:category"
							element={<Detail />}
						/>
						<Route
							path="cart"
							element={<Cart />}
						/>
						<Route
							path="*"
							element={<Navigate to="/store" />}
						/>
					</Route>
					<Route
						path="purchase-history"
						element={<PurchaseHistory />}
					/>
					<Route
						path="*"
						element={<Navigate to="/store" />}
					/>
				</>
			) : (
				<>
					<Route
						path="/"
						element={
							<Login
								notifyLogin={() =>
									setLoginState(LOGIN_STATE.LOGGED)
								}
							/>
						}
					/>
					<Route
						path="register-user"
						element={<Register isAdmin={false} />}
					/>
					<Route
						path="register-admin"
						element={<Register isAdmin={true} />}
					/>
					<Route
						path="*"
						element={<Navigate to="/" />}
					/>
				</>
			)}
		</Routes>
	);
}

export default App;
