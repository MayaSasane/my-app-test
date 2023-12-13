// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CatList from './components/CatList';
import BreedDetail from './components/BreedDetail';

const App = () => {
  return (
    <div>
      <h1>Cat Breed Explorer</h1>
      <Routes>
        <Route path="/" element={<CatList />} />
        <Route path="/breed/:id" element={<BreedDetail />} />
      </Routes>
    </div>
  );
};

export default App;
