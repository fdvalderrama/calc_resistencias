import { useNavigate } from "react-router-dom";
import svg from "../assets/react.svg";
import { useState } from "react";
import bazar from "../assets/bazar_online.png";

const Home = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    navigate(`/items?search=${encodeURIComponent(search)}`);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen text-center p-5">
      <div>
        <img src={bazar} alt="Icon" className="w-72 h-72 mx-auto" />
      </div>
      <h1 className="text-3xl font-bold my-4">Bazar Online</h1>
      <div className="mt-5">
        <input
          type="text"
          value={search}
          placeholder="Buscar..."
          className=" p-2 my-2 border rounded"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="mt-2">
        <button
          onClick={handleSearch}
          className="p-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Buscar
        </button>
      </div>
    </div>
  );
};

export default Home;
