import { Typography } from "@mui/material";
import cartStyle from './cart.module.css'

export default function PurchaseItem({ sale, onOpenPurchaseDetailModal, setSaleIdForDetails }) {
	const getDate = date => {
        return new Date(date).toLocaleDateString()
    }
	const viewDetails = () => {
		setSaleIdForDetails(sale.id);
		onOpenPurchaseDetailModal();
	}
	return (
		<div key={sale.total} className={cartStyle.prev_sales} onClick={viewDetails}>
			<Typography variant="span" fontSize={20} component="h2" fontWeight={500}>
				Fecha: {getDate(sale.date)}
			</Typography>
			<Typography mt={2} variant="span" fontSize={25} component="h2" fontWeight={600}>
				S/.{sale.total.toFixed(2)}
			</Typography>
		</div>
	);
}