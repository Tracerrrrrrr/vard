import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import "./Spinner.css"

// Import your lazy-loaded components
const HistoryPage = lazy(() => import('./History'));
const HomePage = lazy(() => import('./HomePage'));

const Routing = () => {
  return (
    <Suspense fallback={  <div className="spinner-container">
    <div className="spinner-border text-danger" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/history" element={<HistoryPage />} />
          {/* Set a default homepage */}
          <Route index element={<HomePage/>} />
        </Routes>
      </Router>
    </Suspense>
  );
};

export default Routing;
