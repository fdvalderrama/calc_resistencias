import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import productsData from "../data/products.json"; // Asegúrate de importar correctamente los datos
import { addPurchase } from "../firebase/purchaseService";
import { toast } from "sonner";

function Item() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = productsData.products.find((p) => p.id === parseInt(id));
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!product) {
    return <p>Producto no encontrado.</p>;
  }

  const handleNextImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % product.images.length
    );
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + product.images.length) % product.images.length
    );
  };

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
      timestamp: new Date(),
    };

    try {
      await addPurchase(purchaseData);
      toast.success("Compra registrada con éxito.");
    } catch {
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

      {/* Imagen del producto con navegación */}
      <div className="p-4 flex flex-col items-center">
        <div className="flex items-center">
          <button onClick={handlePreviousImage} className="text-2xl px-2">
            ⬅️
          </button>
          <img
            src={product.images[currentImageIndex]}
            alt={product.title}
            className="w-64 h-64 mx-4"
          />
          <button onClick={handleNextImage} className="text-2xl px-2">
            ➡️
          </button>
        </div>

        {/* Detalle del producto */}
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
