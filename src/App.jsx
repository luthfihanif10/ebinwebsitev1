import React from 'react';
import Dashboard from './pages/Dashboard';
import Details from './pages/Details';
import Transaction from './pages/Transaction';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../node_modules/leaflet/dist/leaflet.js'
import '../node_modules/leaflet/dist/leaflet.css'
import '../node_modules/leaflet/dist/images/marker-icon.png'
import '../node_modules/leaflet/dist/images/marker-shadow.png'
import '../node_modules/leaflet/dist/images/layers-2x.png'
import '../node_modules/leaflet/dist/images/layers.png'
import '../node_modules/leaflet/dist/images/marker-icon-2x.png'

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Dashboard />} />

          <Route path={'/details/:id'} element={<Details />} />

          <Route path='/details/:id/transaction' element={<Transaction />} />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
