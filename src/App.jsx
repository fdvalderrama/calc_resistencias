import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Items from "./components/Items";
import Item from "./components/Item";
import Sales from "./components/Sales";
import { Toaster } from "sonner";

function App() {
  return (
    <div>
      <Toaster position="bottom-right" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/items" element={<Items />} />
          <Route path="/item/:id" element={<Item />} />
          <Route path="sales" element={<Sales />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
