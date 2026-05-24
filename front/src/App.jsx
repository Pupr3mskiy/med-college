import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import { isAuthenticated } from './utils/auth';

function App() {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header />
        
        <main className="main-body">
          <Routes>
            <Route path="/" element={<Home />} />
            
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
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
            
            {/* 404 - перенаправление на главную */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;