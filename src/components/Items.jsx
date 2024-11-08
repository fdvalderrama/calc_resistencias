import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const API_URL = "https://backend-repository-chi.vercel.app/api";

function Items() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const searchParam = params.get("search") || "";

  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`${API_URL}/items?q=${searchParam}`);

        if (!response.ok) {
          throw new Error("Error al obtener los productos");
        }

        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    if (searchParam) {
      fetchItems();
    }
  }, [searchParam]);

  const renderStars = (rating) => {
    const roundedRating = Math.round(rating);
    return "⭐️".repeat(roundedRating);
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
          defaultValue={searchParam}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              navigate(`/items?search=${e.target.value}`);
            }
          }}
        />
      </nav>

      <div className="p-4">
        <p className="text-center">
          Resultados de la búsqueda de "{searchParam}": {items.length}
        </p>

        <div>
          {items.map((item) => (
            <div
              key={item.id}
              className="flex mb-4 p-4 border border-gray-300 rounded-lg cursor-pointer"
              onClick={() => navigate(`/item/${item.id}`)}
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-24 h-24 mr-4"
              />
              <div className="flex flex-col justify-center flex-1 text-center">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-gray-700">{item.description}</p>
                <p>
                  <strong>Precio:</strong> ${item.price}
                </p>
                <p>
                  <strong>Categoría:</strong> {item.category}
                </p>
                <p>
                  <strong>Rating:</strong> {renderStars(item.rating)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Items;
