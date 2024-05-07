import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Teams from "./components/Teams";
import Type from "./components/Type";
import './styles/main.scss';
import Pokemon from "./components/Pokemon";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="teams" element={<Teams />} />
        <Route path="type/:type" element={<Type />} />
        <Route path="pokemon/:name" element={<Pokemon />} />
      </Routes>
    </BrowserRouter>
  );
}
