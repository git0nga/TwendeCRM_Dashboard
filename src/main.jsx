import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import './index.css'

import Dashboard from "./pages/Dashboard";
import Contacts from "./pages/Contacts";
import Campaigns from "./pages/Campaigns";
import Schedule from "./pages/Schedule";
import Jobs from "./pages/Jobs";
import Reports from "./pages/Reports";
import Logs from "./pages/Logs";

function App(){
  const nav = "px-3 py-2 rounded hover:bg-gray-100";
  const active = ({isActive}) => isActive ? nav+" bg-gray-100" : nav;
  return (
    <BrowserRouter>
      <div className="max-w-6xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Twende Dashboard</h1>
        <nav className="flex flex-wrap gap-2 mb-6 text-sm">
          <NavLink to="/" className={active}>Overview</NavLink>
          <NavLink to="/contacts" className={active}>Contacts</NavLink>
          <NavLink to="/campaigns" className={active}>Campaigns</NavLink>
          <NavLink to="/schedule" className={active}>Schedule</NavLink>
          <NavLink to="/jobs" className={active}>Jobs</NavLink>
          <NavLink to="/reports" className={active}>Reports</NavLink>
          <NavLink to="/logs" className={active}>Logs</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/contacts" element={<Contacts/>} />
          <Route path="/campaigns" element={<Campaigns/>} />
          <Route path="/schedule" element={<Schedule/>} />
          <Route path="/jobs" element={<Jobs/>} />
          <Route path="/reports" element={<Reports/>} />
          <Route path="/logs" element={<Logs/>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(<App />)