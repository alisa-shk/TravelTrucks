import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Catalog from "./pages/Catalog/Catalog.jsx";
import Camper from "./pages/Camper/Camper.jsx";
import AppBar from "./components/AppBar/AppBar.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import Features from "./components/Features/Features.jsx";
import Reviews from "./components/Reviews/Reviews.jsx";

function App() {
  return (
    <>
      <AppBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/catalog/:id" element={<Camper />}>
          <Route path="features" element={<Features />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
};

export default App;
