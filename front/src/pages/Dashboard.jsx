import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';
import api from '../services/api';
import { getCurrentUser } from '../utils/auth';

// Регистрируем компоненты Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const user = getCurrentUser();

  // Состояния для админ-панели
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

  useEffect(() => {
    fetchDashboardData();
    fetchUsers();
  }, []);

  // Загрузка аналитики
  const fetchDashboardData = async () => {
    try {
      const res = await api.get('/analytics/dashboard');
      setStats(res.data);
    } catch (err) {
      console.warn('API недоступен, используются демо-данные');
      setStats({
        studentsByDept: {
          categories: ['Лечебное дело', 'Сестринское дело', 'Фармация', 'Лабораторная диагностика'],
          data: [120, 85, 45, 30]
        },
        enrollmentTrend: {
          months: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн'],
          data: [15, 22, 18, 30, 25, 35]
        },
        staffDistribution: [
          { name: 'Преподаватели', value: 45 },
          { name: 'Лаборанты', value: 12 },
          { name: 'Администрация', value: 8 },
          { name: 'Техперсонал', value: 15 }
        ]
      });
      setError('Используются демо-данные (API недоступен)');
    } finally {
      setLoading(false);
    }
  };

  // Загрузка пользователей
  const fetchUsers = async () => {
    try {
      const res = await api.get('/users');
      setUsers(res.data);
      setFilteredUsers(res.data);
    } catch (err) {
      // Демо-данные для пользователей
      const demoUsers = Array.from({ length: 25 }, (_, i) => ({
        id: i + 1,
        user_name: `User ${i + 1}`,
        email: `user${i + 1}@college.ru`,
        role: i % 3 === 0 ? 'admin' : i % 2 === 0 ? 'teacher' : 'student',
        group: 'ЛД-2026-1'
      }));
      setUsers(demoUsers);
      setFilteredUsers(demoUsers);
    }
  };

  // Логика поиска
  useEffect(() => {
    let result = users;
    if (searchTerm) {
      result = result.filter(u => 
        u.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredUsers(result);
    setCurrentPage(1);
  }, [searchTerm, users]);

  // Логика сортировки
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (!sortConfig.key) return 0;
    if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  // Пагинация
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(sortedUsers.length / usersPerPage);

  if (loading) return <div className="loading"> Загрузка...</div>;

  // --- Данные для графиков ---
  const barData = {
    labels: stats?.studentsByDept?.categories || [],
    datasets: [{
      label: 'Студенты',
      data: stats?.studentsByDept?.data || [],
      backgroundColor: ['rgba(52, 152, 219, 0.8)', 'rgba(46, 204, 113, 0.8)', 'rgba(155, 89, 182, 0.8)', 'rgba(241, 196, 15, 0.8)'],
      borderRadius: 8
    }]
  };

  const lineData = {
    labels: stats?.enrollmentTrend?.months || [],
    datasets: [{
      label: 'Поступления',
      data: stats?.enrollmentTrend?.data || [],
      borderColor: 'rgba(46, 204, 113, 1)',
      backgroundColor: 'rgba(46, 204, 113, 0.2)',
      fill: true,
      tension: 0.4
    }]
  };

  const pieData = {
    labels: stats?.staffDistribution?.map(item => item.name) || [],
    datasets: [{
      data: stats?.staffDistribution?.map(item => item.value) || [],
      backgroundColor: ['rgba(52, 152, 219, 0.8)', 'rgba(46, 204, 113, 0.8)', 'rgba(231, 76, 60, 0.8)', 'rgba(241, 196, 15, 0.8)']
    }]
  };

  const commonOptions = { responsive: true, maintainAspectRatio: false };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>📊 Панель управления</h1>
        <p>Привет, <strong>{user?.user_name || 'Администратор'}</strong>!</p>
        {error && <div className="warning-badge">{error}</div>}
      </div>

      {/* ГРАФИКИ */}
      <div className="charts-grid">
        <div className="chart-card"><Bar data={barData} options={commonOptions} /></div>
        <div className="chart-card"><Line data={lineData} options={commonOptions} /></div>
        <div className="chart-card"><Pie data={pieData} options={commonOptions} /></div>
      </div>

      {/* АДМИН ПАНЕЛЬ */}
      <div className="admin-section">
        <h2>👥 Управление пользователями</h2>
        
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="🔍 Поиск..." 
            value={searchTerm} 
            onChange={e => setSearchTerm(e.target.value)} 
          />
        </div>

        <table className="users-table">
          <thead>
            <tr>
              <th onClick={() => requestSort('id')}>ID</th>
              <th onClick={() => requestSort('user_name')}>Имя</th>
              <th onClick={() => requestSort('email')}>Email</th>
              <th onClick={() => requestSort('role')}>Роль</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.user_name}</td>
                <td>{u.email}</td>
                <td><span className={`role-badge role-${u.role}`}>{u.role}</span></td>
                <td>
                  <button className="btn-edit" onClick={() => alert('Редактирование')}>✏️</button>
                  <button className="btn-delete" onClick={() => alert('Удаление')}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Пагинация */}
        <div className="pagination">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>← Назад</button>
          <span>Страница {currentPage} из {totalPages}</span>
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>Вперёд →</button>
        </div>
      </div>
    </div>
  );
}