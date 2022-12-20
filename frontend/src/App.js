import React, { Component, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { ColorModeContext, useMode } from './theme'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { useAuthContext } from './hooks/useAuthContext'
import Topbar from './components/ui/global/Topbar'
import Dashboard from './components/ui/dashboard'
import Sidebar from './components/ui/global/Sidebar'
import AddUserForm from './components/forms/AddUser'
import AddClientForm from './components/forms/AddClient'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Clients from './pages/Clients'
import Users from './pages/Users'
import Jobs from './pages/Jobs'
import Reports from './pages/Reports'
import Kbase from './pages/KBase'
import Settings from './pages/Settings'

function App() {
  const { user } = useAuthContext()
  const [theme, colorMode] = useMode()
  //const [isSidebar, setIsSidebar] = useState(true)

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <main className="content">
            <Topbar />
            <Routes>
              <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
              <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
              <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
              <Route path="/clients" element={user ? <Clients /> : <Navigate to="/login" />} />
              <Route path="/users" element={user ? <Users /> : <Navigate to="/login" />} />
              <Route
                path="/users/create"
                element={user ? <AddUserForm /> : <Navigate to="/login" />}
              />
              <Route
                path="/clients/create"
                element={user ? <AddClientForm /> : <Navigate to="/login" />}
              />
              <Route path="/jobs" element={user ? <Jobs /> : <Navigate to="/login" />} />
              <Route path="/reports" element={user ? <Reports /> : <Navigate to="/login" />} />
              <Route path="/kbase" element={user ? <Kbase /> : <Navigate to="/login" />} />
              <Route path="/settings" element={user ? <Settings /> : <Navigate to="/login" />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App
