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
        {/* Левая часть: Логотип + Название */}
        <div className="header-left">
          <div className="logo-placeholder"></div>
          <div className="college-info">
            <h1>Медицинский Колледж</h1>
          </div>
        </div>

        {/* Правая часть: Подзаголовок + Навигация */}
        <div className="header-right">
          <div className="header-top">
            <span className="college-subtitle">Информационная система управления</span>
          </div>
          <div className="header-nav">
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
      </div>
    </header>
  );
}