import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import './App.css';
import Listpage from "./Listpage";
import data from './CustList.json'; 
import ListCustomer from "./ListCustomer";


function App() {
  return (
    <div>
     <Routes>
        <Route path="/" element={<Listpage />} /> 
        <Route path="/:tid" element={<Listpage />} />
        <Route path="/get/api/customers/" element={<ListCustomer />} />
      </Routes>
    </div>
  );
}

export default App;
