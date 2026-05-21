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
          departments: ['Лечебное дело', 'Сестринское дело', 'Фармация', 'Лабораторная диагностика'],
          recentActivity: [
            { action: 'Новый студент', time: '2 часа назад' },
            { action: 'Обновление расписания', time: '5 часов назад' },
            { action: 'Добавлена группа', time: 'Вчера' }
          ]
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
        <div>
          <h1>📊 Панель управления</h1>
          <p className="welcome-text">
            Рады видеть вас, <strong>{user?.user_name || 'Пользователь'}</strong>!
          </p>
        </div>
        {error && <span className="warning-badge">⚠️ {error}</span>}
      </div>

      {/* Основная статистика */}
      <div className="stats-grid">
        <div className="stat-card primary">
          <div className="stat-content">
            <span className="stat-number">{stats?.totalStudents}</span>
            <span className="stat-label">Всего студентов</span>
          </div>
          <div className="stat-icon">👨‍🎓</div>
        </div>

        <div className="stat-card secondary">
          <div className="stat-content">
            <span className="stat-number">{stats?.totalTeachers}</span>
            <span className="stat-label">Преподавателей</span>
          </div>
          <div className="stat-icon">👨‍🏫</div>
        </div>

        <div className="stat-card accent">
          <div className="stat-content">
            <span className="stat-number">{stats?.totalGroups}</span>
            <span className="stat-label">Учебных групп</span>
          </div>
          <div className="stat-icon">👥</div>
        </div>

        <div className="stat-card info">
          <div className="stat-content">
            <span className="stat-number">{stats?.departments?.length}</span>
            <span className="stat-label">Отделений</span>
          </div>
          <div className="stat-icon">🏥</div>
        </div>
      </div>

      {/* Две колонки: специальности и активность */}
      <div className="dashboard-columns">
        <div className="dashboard-section">
          <h2 className="section-title">📚 Направления подготовки</h2>
          <div className="departments-grid">
            {stats?.departments?.map((dept, index) => (
              <div key={index} className="department-card">
                <span className="department-number">{String(index + 1).padStart(2, '0')}</span>
                <span className="department-name">{dept}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-section">
          <h2 className="section-title">🕐 Последняя активность</h2>
          <div className="activity-list">
            {stats?.recentActivity?.map((item, index) => (
              <div key={index} className="activity-item">
                <div className="activity-dot"></div>
                <div className="activity-content">
                  <span className="activity-text">{item.action}</span>
                  <span className="activity-time">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}