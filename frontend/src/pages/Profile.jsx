import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { getCurrentUser, setAuth, logout } from '../utils/auth';

export default function Profile() {
  const { username } = useParams();
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Запрос к API за данными профиля
        const res = await api.get(`/users/${username}`);
        setProfile(res.data);
      } catch (err) {
        console.warn('API недоступен, используются демо-данные профиля', err);
        // 🔴 РЕЗЕРВНЫЕ ДАННЫЕ
        setProfile({
          id: 1,
          user_name: username || currentUser?.user_name || 'student',
          email: 'student@med-college.ru',
          role: 'Студент',
          group: 'ЛД-2026-1',
          created_at: '01.09.2024',
          last_login: 'Сегодня, 14:30'
        });
        setError('Отображаются демо-данные (сервер недоступен)');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username, currentUser]);

  const handleRefreshToken = async () => {
    setRefreshing(true);
    setError('');
    setSuccess('');

    try {
      // Запрос на обновление токена
      const res = await api.post('/auth/refresh');
      if (res.data.token) {
        setAuth(res.data.token, profile || currentUser);
        setSuccess('Токен успешно обновлён!');
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err) {
      console.error('Ошибка обновления токена', err);
      setError('Не удалось обновить токен. Попробуйте войти снова.');
    } finally {
      setRefreshing(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return <div className="loading"> Загрузка профиля...</div>;
  }

  return (
    <div className="profile-page">
      <div className="profile-header-section">
        <h1> Личный кабинет</h1>
        {error && <div className="alert alert-warning">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
      </div>

      <div className="profile-grid">
        {/* Карточка с информацией */}
        <div className="profile-card main-info">
          <div className="profile-avatar">
            {profile?.user_name?.charAt(0).toUpperCase()}
          </div>
          <div className="profile-details">
            <h2>{profile?.user_name}</h2>
            <p className="profile-role">{profile?.role}</p>
            
            <div className="info-list">
              <div className="info-item">
                <span className="info-label">Email:</span>
                <span className="info-value">{profile?.email}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Группа:</span>
                <span className="info-value">{profile?.group}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Дата регистрации:</span>
                <span className="info-value">{profile?.created_at}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Последний вход:</span>
                <span className="info-value">{profile?.last_login}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Карточка с действиями */}
        <div className="profile-card actions">
          <h3> Управление</h3>
          
          <div className="action-buttons">
            <button 
              onClick={handleRefreshToken} 
              className="btn btn-primary btn-block"
              disabled={refreshing}
            >
              {refreshing ? (
                <>
                  <span className="spinner-small"></span>
                  Обновление...
                </>
              ) : (
                'Обновить сессию'
              )}
            </button>

            <button 
              onClick={handleLogout} 
              className="btn btn-danger btn-block"
            >
               Выйти из системы
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}