import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Devis from "./pages/Devis";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/devis" element={<Devis />} />
          <Route path="/shop" element={<Home />} />
          <Route path="/custom" element={<Devis />} />
          <Route path="/services" element={<Home />} />
          <Route path="/magazine" element={<Home />} />
          <Route path="/setup" element={<Home />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
