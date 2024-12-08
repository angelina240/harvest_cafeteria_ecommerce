import { Typography, IconButton, Badge } from "@mui/material";
import React, { useEffect, useState } from "react";
import headerStyles from "./header.module.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import HistoryIcon from "@mui/icons-material/History";
import { useNavigate } from "react-router-dom";
import { getUserDetails, logout } from "../../../services/auth";

function Header({ notifyLogout }) {
	const navigate = useNavigate();
	const [number, setNumber] = useState(0);
	const [isAdmin, setIsAdmin] = useState(false);
	useEffect(() => {
		const userDetails = getUserDetails();
		setIsAdmin(userDetails.isAdmin);
	}, []);

	useEffect(() => {
		const getUserCart = () => {
			const item = localStorage.getItem("number");
			if (item) {
				setNumber(parseInt(item));
			}
		};

		getUserCart();
		window.addEventListener("storage", getUserCart);
		return () => {
			window.removeEventListener("storage", getUserCart);
		};
	}, [number]);

	// Redirige a la página de historial de compras
	const goToPurchaseHistory = () => {
		navigate("/purchase-history");
	};

	// Cierra la sesión del usuario
	const closeSession = () => {
		notifyLogout();
		logout({ navigate });
		localStorage.clear();
	};

	return (
		<div className={headerStyles.header_container}>
			<a
				className={headerStyles.logo_container}
				href="/store"
			>
				<img
					src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXe4D2gn5i4fnOOCTxOCxvnOsvdIZZCQV_6w&s"
					alt="logo"
					height={60}
				/>
				<Typography
					variant="span"
					fontSize={40}
					color={"#e39968"}
					component="h2"
					marginLeft={1}
					fontWeight={600}
				>
					Harvest
				</Typography>
			</a>

			<nav className={headerStyles.actions}>
				{!isAdmin ? (
					<IconButton
						aria-label="cart"
						color="primary"
						href="/store/cart"
						size="large"
						style={{ color: "#1976d2" }}
					>
						<Badge
							badgeContent={number}
							color="primary"
						>
							<ShoppingCartIcon style={{ fontSize: "45px" }} />
						</Badge>
					</IconButton>
				) : null}

				{/* Botón de historial de compras */}
				{isAdmin && (
					<IconButton
						aria-label="purchase-history"
						color="primary"
						size="large"
						onClick={goToPurchaseHistory}
						style={{ color: "#f39c12" }} // Amarillo
					>
						<HistoryIcon style={{ fontSize: "45px" }} />
					</IconButton>
				)}

				<IconButton
					aria-label="logout"
					color="error"
					size="large"
					onClick={closeSession}
					style={{ fontSize: "45px", color: "#e74c3c" }} 
				>
					<LogoutIcon style={{ fontSize: "45px" }} />
				</IconButton>
			</nav>
		</div>
	);
}

export default Header;
