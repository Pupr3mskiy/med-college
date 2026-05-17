import { useEffect, useState } from 'react';
import api from '../services/api';
import { getCurrentUser } from '../utils/auth';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const user = getCurrentUser();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await api.get('/analytics/dashboard');
        setStats(res.data);
      } catch (err) {
        console.warn('API недоступен, используются демо-данные', err);
        setStats({
          totalStudents: 280,
          totalTeachers: 45,
          totalGroups: 12,
          departments: ['Лечебное дело', 'Сестринское дело', 'Фармация', 'Лабораторная диагностика']
        });
        setError('Используются демо-данные (API недоступен)');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="loading">⏳ Загрузка...</div>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>📊 Аналитическая панель</h1>
        <p className="welcome-text">Добро пожаловать, <strong>{user?.user_name || 'Пользователь'}</strong>!</p>
        {error && <span className="warning-badge">⚠️ {error}</span>}
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👨‍</div>
          <div className="stat-value">{stats?.totalStudents}</div>
          <div className="stat-label">Студентов</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">👨‍</div>
          <div className="stat-value">{stats?.totalTeachers}</div>
          <div className="stat-label">Преподавателей</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-value">{stats?.totalGroups}</div>
          <div className="stat-label">Групп</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🏥</div>
          <div className="stat-value">{stats?.departments?.length}</div>
          <div className="stat-label">Отделений</div>
        </div>
      </div>

      <div className="departments-section">
        <h2>📚 Специальности</h2>
        <ul className="departments-list">
          {stats?.departments?.map((dept, index) => (
            <li key={index} className="department-item">
              <span className="department-icon">✓</span>
              {dept}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}