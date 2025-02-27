import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import FavoritesPage from './pages/favorites/FavoritesPage';
import HomePage from './pages/home/HomePage';

const App: React.FC = () => {
  const [homeKey, setHomeKey] = useState(Date.now());

  const handleHomeClick = () => {
    setHomeKey(Date.now());
  };

  return (
    <Router>
      <Header />
      <nav className="main-nav">
        <Link to="/Pokemon/" onClick={handleHomeClick}>Home</Link> | <Link to="/favorites">Favorites</Link>
      </nav>
      <Routes>
        <Route path="/Pokemon/" element={<HomePage key={homeKey} />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </Router>
  );
};

export default App;
