import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  return (
    <div className="p-4">
      <h2 className="text-center text-3xl font-extrabold mb-6 text-blue-600">
        🛍️ Ventas
      </h2>

      <div>
        {sales.map((sale, index) => (
          <div
            key={sale.productId || index}
            className="flex items-center mb-4 p-4 border border-gray-300 rounded-lg"
          >
            <img
              src={sale.product?.thumbnail || "default-image.jpg"}
              alt={sale.product?.title || "Producto sin título"}
              className="w-24 h-24 mr-4"
            />
            <div className="flex-1 text-center">
              <h3 className="text-lg font-semibold">
                {sale.product?.title || "Producto sin título"}
              </h3>
              <p className="text-gray-700">Cantidad: {sale.quantity || 1}</p>
              <p>
                <strong>Precio:</strong> $
                {sale.product?.price || "No disponible"}
              </p>
              <p>
                <strong>Total:</strong> $
                {sale.product?.price * sale.quantity || 0}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-6">
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full font-semibold text-lg shadow-lg transform hover:scale-105 transition-transform duration-200"
        >
          Salir
        </button>
      </div>
    </div>
  );
};

export default Sales;
