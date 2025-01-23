import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashBoard from "../../Pages/DashBoard";
import Inventory from "../../Pages/Inventory";
import Orders from "../../Pages/Orders";
import Customers from "../../Pages/Customers";

function AppRoutes(){
  return (
    
      <Routes>
          <Route path="/" element={<DashBoard />}></Route>
          <Route path="/inventory" element={<Inventory/>}></Route>
          <Route path="/orders" element={<Orders/>}></Route>
          <Route path="/customers" element={<Customers/>}></Route>

      </Routes>
 
  )
}
export default AppRoutes;