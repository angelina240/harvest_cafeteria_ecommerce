import styles from "./PurchaseHistory.module.css"
import { useState, useEffect } from "react";
import { getAllPurchases } from "../../../services/sale";

const HEADERS = ["Correo", "Precio", "Fecha de compra"];

function PurchaseHistory() {
    const [purchases, setPurchases] = useState([]);
    useEffect(() => {
        fillPurchases();
    }, []);
    async function fillPurchases() {
        const data = await getAllPurchases();
        setPurchases(data);
	}
    return (
        <section className={styles.section}>
            <h1 className={styles.title}>
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXe4D2gn5i4fnOOCTxOCxvnOsvdIZZCQV_6w&s' alt='logo' height={100} />
                HISTORIAL DE COMPRAS 
            </h1>
            <table className="table">
                <thead>
                    <tr>
                        {HEADERS.map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {purchases.map(({ customerEmail, subtotal, date }, index) => (
                        <tr key={index}>
                            <td>{customerEmail}</td>
                            <td>S/.{subtotal.toFixed(2)}</td>
                            <td>{new Date(date).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}

export default PurchaseHistory;
