import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import PageA from './pages/page-a';
import PageB from './pages/page-b';
import Home from './pages/home';
import './styles.css';

export default function App() {
  return (
    <div className="app">
      <h2>This the root view in  MFE</h2>
      <nav className="horizontal-nav">
        <Link to="page-a">Mfe/Page A</Link>
        <Link to="page-b">Mfe/Page B</Link>
      </nav>
      <Routes>
        <Route index element={<Home />} />
        <Route path="page-a" element={<PageA />} />
        <Route path="page-b" element={<PageB />} />
      </Routes>
    </div>
  );
}
