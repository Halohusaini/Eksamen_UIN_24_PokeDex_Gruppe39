import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Teams from "./components/Teams";
import Type from "./components/Type";
import SearchResult from "./components/SearchResult";
import './styles/main.scss';
import Pokemon from "./components/Pokemon";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="teams" element={<Teams />} />
        <Route path="teams/:teamSlug" element={<Teams/>}  />
        <Route path="type/:type" element={<Type />} />
        <Route path="pokemon/:name" element={<Pokemon />} />
        <Route path="search/:pokemon" element={<SearchResult />} />
      </Routes>
    </BrowserRouter>
  );
}
