import { useEffect, useState } from "react";

const Sales = () => {
  const [sales, setSales] = useState([]);

  // Obtener todas las ventas al montar el componente

  const API_URL = import.meta.env.VITE_APP_FIREBASE_API_URL;
  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await fetch(`${API_URL}/sales`);

        if (!response.ok) {
          throw new Error("Error al obtener ventas");
        }

        const salesData = await response.json();
        setSales(salesData);
      } catch (error) {
        console.error("Error al obtener ventas:", error);
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
