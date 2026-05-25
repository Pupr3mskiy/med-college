import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../utils/auth';

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <ul>
          <li>
            <Link to="/dashboard" className="sidebar-link">
              <span className="link-icon"></span>
              <span>Дашборд</span>
            </Link>
          </li>
          <li>
            <Link to="/about" className="sidebar-link">
              <span className="link-icon"></span>
              <span>О проекте</span>
            </Link>
          </li>
          <li>
            <button onClick={handleLogout} className="sidebar-link logout-btn">
              <span className="link-icon"></span>
              <span>Выйти</span>
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}