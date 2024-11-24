/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { getSaleFullDetail } from "../../../services/cart"; 

const modalBaseStyles = {
	overlay: {
		zIndex: 2,
	},
	content: {
		top: "50%",
		left: "50%",
		translate: "-50% -50%",
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
			<h1>Detalle de la compra</h1>
			<table>
				<thead>
					<tr>
						{HEADERS.map((header, index) => (
							<th key={index}>{header}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{details.items.map(
						({ product, quantity, unitPrice, subtotal }, index) => (
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
			<h4>Total: S/.{details.total}</h4>
		</Modal>
	);
}
