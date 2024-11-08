import { useEffect, useState } from "react";

const Sales = () => {
  const [sales, setSales] = useState([]);

  // URL de la API
  const API_URL = "https://backend-repository-chi.vercel.app/api";

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
        {sales.map((sale, index) => (
          <li key={sale.productId || index}>
            Producto: {sale.product?.title || "Sin título"}, Cantidad:{" "}
            {sale.quantity || 1}, Precio: $
            {sale.product?.price || "No disponible"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sales;
