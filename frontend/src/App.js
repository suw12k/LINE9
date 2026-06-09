import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Devis from "./pages/Devis";
import Configs from "./pages/Configs";
import PcSurMesure from "./pages/PcSurMesure";
import { Toaster } from "./components/ui/toaster";
import CookieBanner from "./components/CookieBanner";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/configs" element={<Configs />} />
          <Route path="/pc-sur-mesure" element={<PcSurMesure />} />
          <Route path="/devis" element={<Devis />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
      <CookieBanner />
    </div>
  );
}

export default App;
