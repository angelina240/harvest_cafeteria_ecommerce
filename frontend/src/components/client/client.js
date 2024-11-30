import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/header";

function Client({ notifyLogout }) {
	return (
		<>
			<Header notifyLogout={notifyLogout} />
			<Outlet />
		</>
	);
}

export default Client;
