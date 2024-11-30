import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Catalog from "./pages/Catalog/Catalog.jsx";
import Camper from "./pages/Camper/Camper.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/catalog/:id" element={<Camper />} />
      </Routes>
    </>
  )
};

export default App;
