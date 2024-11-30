import {
	Alert,
	Button,
	Divider,
	Grid,
	Snackbar,
	Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import homeStyle from "./home.module.css";
import ProductCard from "../components/productCard";
import { fillCartItemCount, getUserDetails } from "../../../services/auth";
import ProductForm from "../components/productForm";
import { getAllProducts, getBestProducts } from "../../../services/product";
import { addToCart } from "../../../services/shoppingCart";
import PurchaseButton from "./PurchaseButton";

function Home() {
	const [isAdmin, setIsAdmin] = useState(false);
	const [productList, setProductList] = useState([]);
	const [bestProductList, setBestProductList] = useState([]);
	const [product, setProduct] = useState({
		name: "",
		price: 0,
		description: "",
		category: "",
		image: "",
	});
	const [refresh, setRefresh] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const [showProductFeedback, setProductFeedback] = React.useState({
		show: false,
		status: false,
		infoText: "",
	});

	useEffect(() => {
		const userDetails = getUserDetails();
		setIsAdmin(userDetails.isAdmin);
		fillCartItemCount(userDetails.id);
		getAllProducts({ setProductList });
		getBestProducts({ setBestProductList });
	}, [refresh]);

	const handleOpenModal = () => setOpenModal(true);
	const closeProductFeedback = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setProductFeedback({ show: false, status: showProductFeedback.status });
	};
	const addProduct = (productToAdd, amountToAdd) => {
		setProductFeedback({
			show: true,
			status: true,
			infoText: "Añandiendo producto...",
		});
		addToCart({ amountToAdd, productToAdd });
	};

	return (
		<div className={homeStyle.container}>
			<div className={homeStyle.title_container}>
				<div>
					{isAdmin ? (
						<Button
							variant="text"
							color="success"
							id="button"
							onClick={handleOpenModal}
						>
							Añadir nuevo producto
						</Button>
					) : null}
				</div>
				<Typography
					variant="span"
					fontSize={35}
					component="h2"
					ml={1}
					fontWeight={600}
				>
					Destacados
				</Typography>
				<Typography
					variant="p"
					fontSize={20}
					component="h2"
					ml={1}
					fontWeight={400}
				>
					Productos a mejor precio
				</Typography>
			</div>
			<Grid
				container
				spacing={3}
				className={homeStyle.grid}
				mb={2}
			>
				{bestProductList.map(productItem => (
					<Grid
						item
						xs={12}
						md={3}
						style={{ position: "relative" }}
						key={productItem.id}
					>
						{!isAdmin && (
							<PurchaseButton
								addProduct={addProduct}
								productItem={productItem}
							/>
						)}
						<ProductCard product={productItem} />
					</Grid>
				))}
			</Grid>
			<Divider></Divider>
			<div className={homeStyle.title_container}>
				<Typography
					variant="span"
					fontSize={30}
					component="h2"
					ml={1}
					fontWeight={600}
				>
					Todos los productos
				</Typography>
			</div>
			<Grid
				container
				spacing={3}
				className={homeStyle.grid}
			>
				{productList.map(productItem => (
					<Grid
						item
						xs={12}
						md={3}
						style={{ position: "relative" }}
						key={productItem.id}
					>
						{!isAdmin && (
							<PurchaseButton
								addProduct={addProduct}
								productItem={productItem}
							/>
						)}
						<ProductCard product={productItem} />
					</Grid>
				))}
			</Grid>
			<Snackbar
				open={showProductFeedback.show}
				autoHideDuration={2000}
				onClose={closeProductFeedback}
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
			>
				<Alert
					onClose={closeProductFeedback}
					severity={showProductFeedback.status ? "success" : "error"}
					sx={{ width: "100%" }}
				>
					{showProductFeedback.infoText}
				</Alert>
			</Snackbar>
			<ProductForm
				setRefresh={setRefresh}
				openModal={openModal}
				setOpenModal={setOpenModal}
				setProductFeedback={setProductFeedback}
				edit={false}
				setProduct={setProduct}
				product={product}
			/>
		</div>
	);
}

export default Home;
