import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { setAuth } from '../utils/auth';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.user_name.trim() || !formData.password) {
      setError('Заполните все поля');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await api.post('/auth/login', {
        user_name: formData.user_name,
        password: formData.password
      });

      if (response.data.token && response.data.user) {
        setAuth(response.data.token, response.data.user);
        navigate('/dashboard');
      } else {
        setError('Неверный ответ сервера');
      }
    } catch (err) {
      if (err.response?.status === 401) {
        setError('Неверное имя пользователя или пароль');
      } else if (err.code === 'ERR_NETWORK') {
        setError('Сервис недоступен. Проверьте подключение.');
      } else {
        setError('Ошибка входа. Попробуйте позже.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="split-screen">
      {/* Левая часть - изображение и приветствие */}
      <div className="split-left">
        <div className="split-content">
          <div className="welcome-block">
            <h1>Добро пожаловать!</h1>
            <p>Войдите в систему для доступа к личному кабинету студента медицинского колледжа</p>
          </div>
        </div>
      </div>

      {/* Правая часть - форма входа */}
      <div className="split-right">
        <div className="auth-card">
          <div className="auth-header">
            <h2>Вход в систему</h2>
            <p>Введите ваши данные для доступа к системе</p>
          </div>

          {error && <div className="error-message">⚠️ {error}</div>}

          <form onSubmit={handleSubmit} className="auth-form" noValidate>
            <div className="form-group">
              <label htmlFor="user_name" className="form-label">
                Имя пользователя
                <span className="required">*</span>
              </label>
              <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Введите email"
            />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Пароль
                <span className="required">*</span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Введите пароль"
                className="form-input"
                disabled={loading}
                autoComplete="current-password"
              />
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" className="checkbox" />
                <span>Запомнить меня</span>
              </label>
            </div>

            <button 
              type="submit" 
              className="btn-submit"
              disabled={loading}
            >
              {loading ? (
                <span className="spinner"></span>
              ) : (
                'Войти'
              )}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Нет аккаунта?{' '}
              <Link to="/register" className="auth-link">
                Зарегистрироваться
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}