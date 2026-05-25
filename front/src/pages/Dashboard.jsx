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

  useEffect(() => {
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

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="loading">⏳ Загрузка аналитики...</div>;
  }

  // Данные для столбчатой диаграммы
  const barData = {
    labels: stats?.studentsByDept?.categories || [],
    datasets: [
      {
        label: 'Студенты',
        data: stats?.studentsByDept?.data || [],
        backgroundColor: [
          'rgba(52, 152, 219, 0.8)',
          'rgba(46, 204, 113, 0.8)',
          'rgba(155, 89, 182, 0.8)',
          'rgba(241, 196, 15, 0.8)'
        ],
        borderColor: [
          'rgba(52, 152, 219, 1)',
          'rgba(46, 204, 113, 1)',
          'rgba(155, 89, 182, 1)',
          'rgba(241, 196, 15, 1)'
        ],
        borderWidth: 2,
        borderRadius: 8
      }
    ]
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top'
      },
      title: {
        display: true,
        text: 'Студенты по специальностям',
        font: { size: 16, weight: 'bold' }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Количество студентов'
        }
      }
    }
  };

  // Данные для линейного графика
  const lineData = {
    labels: stats?.enrollmentTrend?.months || [],
    datasets: [
      {
        label: 'Поступления',
        data: stats?.enrollmentTrend?.data || [],
        fill: true,
        backgroundColor: 'rgba(46, 204, 113, 0.2)',
        borderColor: 'rgba(46, 204, 113, 1)',
        borderWidth: 3,
        tension: 0.4,
        pointBackgroundColor: 'rgba(46, 204, 113, 1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7
      }
    ]
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top'
      },
      title: {
        display: true,
        text: 'Динамика поступления студентов',
        font: { size: 16, weight: 'bold' }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Новые студенты'
        }
      }
    }
  };

  // Данные для круговой диаграммы
  const pieData = {
    labels: stats?.staffDistribution?.map(item => item.name) || [],
    datasets: [
      {
        data: stats?.staffDistribution?.map(item => item.value) || [],
        backgroundColor: [
          'rgba(52, 152, 219, 0.8)',
          'rgba(46, 204, 113, 0.8)',
          'rgba(231, 76, 60, 0.8)',
          'rgba(241, 196, 15, 0.8)'
        ],
        borderColor: [
          'rgba(52, 152, 219, 1)',
          'rgba(46, 204, 113, 1)',
          'rgba(231, 76, 60, 1)',
          'rgba(241, 196, 15, 1)'
        ],
        borderWidth: 2
      }
    ]
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right'
      },
      title: {
        display: true,
        text: 'Распределение персонала колледжа',
        font: { size: 16, weight: 'bold' }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      }
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>📊 Аналитическая панель</h1>
        <p className="welcome-text">
          Добро пожаловать, <strong>{user?.user_name || 'Пользователь'}</strong>!
        </p>
        {error && <span className="warning-badge">⚠️ {error}</span>}
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <Bar data={barData} options={barOptions} />
        </div>
        <div className="chart-card">
          <Line data={lineData} options={lineOptions} />
        </div>
        <div className="chart-card">
          <Pie data={pieData} options={pieOptions} />
        </div>
      </div>
    </div>
  );
}