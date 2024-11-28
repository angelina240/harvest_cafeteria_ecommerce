import { useEffect, useState } from "react";
import Modal from "react-modal";
import { getSaleFullDetail } from "../../../services/cart";
import styles from "./PurchaseDetail.module.css";

const modalBaseStyles = {
	content: {
		top: "50%",
		left: "50%",
		padding: 0,
		transform: "translate(-50%, -50%)",
		border: 0,
		height: "max-content",
		width: "max-content"
	},
};

const HEADERS = ["Producto", "Cantidad", "Precio Unitario", "Subtotal"];
export default function PurchaseDetailModal({ open, onClose, saleId }) {
	const [prevSaleId, setPrevSaleId] = useState("");
	const [details, setDetails] = useState({
		items: [],
		total: 0,
	});
	useEffect(() => {
		if (open && prevSaleId !== saleId) fillDetails();
	}, [open]);
	async function fillDetails() {
		const saleFullDetail = await getSaleFullDetail(saleId);
		saleFullDetail.items = [
			...saleFullDetail.items,	
			...saleFullDetail.items,	
			...saleFullDetail.items,	
		];
		setDetails(saleFullDetail);
		setPrevSaleId(saleId);
	}
	return (
		<Modal
			isOpen={open}
			onRequestClose={onClose}
			ariaHideApp={false}
			style={modalBaseStyles}
		>
			<div className={styles.modal}>
				<h1 className={styles.title}>Detalle de la compra</h1>
				<table class="table">
					<thead>
						<tr>
							{HEADERS.map((header, index) => (
								<th key={index}>{header}</th>
							))}
						</tr>
					</thead>
					<tbody>
						{details.items.map(
							(
								{ product, quantity, unitPrice, subtotal },
								index
							) => (
								<tr key={index}>
									<td>{product}</td>
									<td>{quantity}</td>
									<td>S/.{unitPrice}</td>
									<td>S/.{subtotal}</td>
								</tr>
							)
						)}
					</tbody>
				</table>
				<h4 className={styles.subtotal}>Total: S/.{details.total}</h4>
			</div>
		</Modal>
	);
}
