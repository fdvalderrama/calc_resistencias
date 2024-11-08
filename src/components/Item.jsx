import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const API_URL = "https://backend-repository-chi.vercel.app/api";

function Item() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_URL}/items/${id}`);

        if (!response.ok) {
          throw new Error("Producto no encontrado");
        }

        const data = await response.json();
        setProduct(data);
        setError(null); // Reinicia el error si se obtiene el producto
      } catch (error) {
        console.error("Error al obtener el producto:", error);
        setError("Producto no encontrado");
      } finally {
        setLoading(false); // Detiene la carga al finalizar la petición
      }
    };

    fetchProduct();
  }, [id]);

  // Mostrar un mensaje de carga mientras se obtiene el producto
  if (loading) return <p>Cargando...</p>;

  // Mostrar un mensaje de error si no se encuentra el producto
  if (error) return <p>{error}</p>;

  // Verificación adicional de `product`
  if (!product) return <p>Producto no encontrado.</p>;

  const renderStars = (rating) => {
    const roundedRating = Math.round(rating);
    return "⭐️".repeat(roundedRating);
  };

  const handlePurchase = async () => {
    const purchaseData = {
      productId: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await fetch(`${API_URL}/addSale`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(purchaseData),
      });

      if (!response.ok) {
        throw new Error("Error en la respuesta del servidor");
      }

      toast.success("Compra registrada con éxito.");
    } catch (error) {
      console.error("Error al registrar la compra:", error);
      toast.error("Error al registrar la compra.");
    }
  };

  return (
    <div>
      <nav className="flex items-center p-4 bg-gray-200">
        <span
          role="img"
          aria-label="sales-icon"
          className="text-2xl cursor-pointer"
          onClick={() => navigate("/sales")}
        >
          💸
        </span>
        <input
          type="text"
          placeholder="Buscar..."
          className="ml-4 flex-1 p-2 border border-gray-300 rounded"
          defaultValue=""
        />
      </nav>

      {/* Detalle del producto */}
      <div className="p-4 flex flex-col items-center">
        <div className="text-center mt-4">
          <h2 className="text-2xl font-bold">{product.title}</h2>
          <p className="text-gray-700 mt-2">{product.description}</p>
          <p className="mt-2">
            <strong>Precio:</strong> ${product.price}
          </p>
          <p className="mt-2">
            <strong>Categoría:</strong> {product.category}
          </p>
          <p className="mt-2">
            <strong>Rating:</strong> {renderStars(product.rating)}
          </p>
          <p className="mt-2">
            <strong>Marca:</strong> {product.brand}
          </p>
        </div>

        <button
          onClick={handlePurchase}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Comprar
        </button>
      </div>
    </div>
  );
}

export default Item;
