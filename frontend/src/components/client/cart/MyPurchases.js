import { Typography } from "@mui/material";
import cartStyle from "./cart.module.css";
import PurchaseItem from "./PurchaseItem";
import { Modal } from "mui-react-modal";
import { useState } from "react";

export default function MyPurchases({ salesList }) {
	const [openPurchaseModal, setOpenPurchaseModal] = useState(false);
    const toggleOpenPurchaseModal = () => setOpenPurchaseModal(!openPurchaseModal);
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
			{salesList.map(sale => (
				<PurchaseItem sale={sale} setOpenPurchaseModal={setOpenPurchaseModal} />
			))}
			<Modal
                open={openPurchaseModal}
                title="Detalle de la compra"
                description={"Este es tu detalle de la compra."}
                close={toggleOpenPurchaseModal}
                actionPosition="right"
            />
		</div>
	);
}
