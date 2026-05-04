import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../utils/auth';

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside style={{ width: '200px', background: '#f4f4f4', padding: '1rem', minHeight: '100vh' }}>
      <nav>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li><Link to="/dashboard">📊 Дашборд</Link></li>
          <li><Link to="/about">ℹ️ О проекте</Link></li>
          <li><button onClick={handleLogout}>🚪 Выйти</button></li>
        </ul>
      </nav>
    </aside>
  );
}