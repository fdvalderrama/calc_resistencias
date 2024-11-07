import { useEffect, useState } from "react";
import { getAllPurchases } from "../firebase/purchaseService";

const Sales = () => {
  const [sales, setSales] = useState([]);

  // Obtener todas las ventas al montar el componente
  useEffect(() => {
    const fetchSales = async () => {
      try {
        const salesData = await getAllPurchases();
        setSales(salesData);
      } catch (error) {
        console.error("Error al obtener ventas: ", error);
      }
    };
    fetchSales();
  }, []);

  return (
    <div>
      <h2>Ventas</h2>
      <ul>
        {sales.map((sale) => (
          <li key={sale.id}>
            Producto: {sale.title}, Cantidad: {sale.quantity}, Precio: $
            {sale.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sales;
