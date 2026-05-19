import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import About from './pages/About';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import { isAuthenticated } from './utils/auth';
import { useEffect } from 'react';

function App() {

  useEffect(() => {
    fetch('http://localhost:3000/test')
      .then(res => res.json())
      .then(data => console.log(data));
  }, []);

  return (
    <BrowserRouter>
      <div className="app-wrapper">

        <Header />

        <main className="main-body">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/about" element={<About />} />

            <Route path="/dashboard" element={
              <ProtectedRoute>
                <div className="page-layout">
                  <Sidebar />
                  <div className="content-area">
                    <Dashboard />
                  </div>
                </div>
              </ProtectedRoute>
            } />

            <Route path="/:username" element={
              <ProtectedRoute>
                <div className="page-layout">
                  <Sidebar />
                  <div className="content-area">
                    <Profile />
                  </div>
                </div>
              </ProtectedRoute>
            } />

            <Route path="/" element={
              isAuthenticated()
                ? <Navigate to="/dashboard" />
                : <Navigate to="/login" />
            } />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

      </div>
    </BrowserRouter>
  );
}

export default App;