// front/src/components/Layout/Header.jsx
import { Link } from 'react-router-dom';
import { isAuthenticated, logout } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const isLoggedIn = isAuthenticated();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="main-header">
      <div className="header-container">
        <div className="header-left">
          <div className="college-info">
            <h1>Медицинский Колледж</h1>
            <span className="college-subtitle">Информационная система управления</span>
          </div>
        </div>

        <div className="header-right">
          <Link to="/about" className="header-link">О проекте</Link>
          
          {isLoggedIn ? (
            <button onClick={handleLogout} className="header-btn logout-btn">
               Выйти
            </button>
          ) : (
            <Link to="/login" className="header-btn login-btn">
               Войти
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}