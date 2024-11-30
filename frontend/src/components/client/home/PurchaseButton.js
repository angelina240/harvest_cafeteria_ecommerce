import { IconButton } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import homeStyle from "./home.module.css";

const PurchaseButton = ({ addProduct, productItem }) => {
	return (
		<IconButton
			color="primary"
			onClick={() => {
				addProduct(productItem, 1);
			}}
			className={homeStyle.add__button}
		>
			<AddShoppingCartIcon />
		</IconButton>
	);
};

export default PurchaseButton;
