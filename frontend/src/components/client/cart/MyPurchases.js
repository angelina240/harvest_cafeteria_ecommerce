import { Typography } from "@mui/material";
import cartStyle from "./cart.module.css";
import PurchaseItem from "./PurchaseItem";
import PurchaseDetailModal from "./PurchaseDetailModal";
import { useState } from "react";

export default function MyPurchases({ salesList }) {
	const [saleIdForDetails, setSaleIdForDetails] = useState("");
	const [openPurchaseDetailModal, setOpenPurchaseDetailModal] = useState(false);
	return (
		<div className={cartStyle.prev_container}>
			<Typography
				variant="span"
				color={"#1976d2"}
				fontSize={30}
				component="h2"
				fontWeight={500}
			>
				Mis Compras
			</Typography>
			{salesList.map((sale, index) => (
				<PurchaseItem
					key={index}
					sale={sale}
					setSaleIdForDetails={setSaleIdForDetails}
					onOpenPurchaseDetailModal={() => setOpenPurchaseDetailModal(true)}
				/>
			))}
			<PurchaseDetailModal
				open={openPurchaseDetailModal}
				onClose={() => setOpenPurchaseDetailModal(false)}
				saleId={saleIdForDetails}
			/>
		</div>
	);
}
