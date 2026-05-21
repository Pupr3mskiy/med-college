import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { setAuth } from '../utils/auth';

export default function Register() {
  const [formData, setFormData] = useState({
    user_name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    
    if (validationErrors[e.target.name]) {
      setValidationErrors({
        ...validationErrors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.user_name.trim()) {
      errors.user_name = 'Имя пользователя обязательно';
    } else if (formData.user_name.length < 3) {
      errors.user_name = 'Минимум 3 символа';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email обязателен';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Некорректный email';
    }

    if (!formData.password) {
      errors.password = 'Пароль обязателен';
    } else if (formData.password.length < 6) {
      errors.password = 'Минимум 6 символов';
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Пароли не совпадают';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await api.post('/auth/register', {
        user_name: formData.user_name,
        email: formData.email,
        password: formData.password
      });

      setSuccess(true);

      if (response.data.token) {
        setAuth(response.data.token, response.data.user);
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      } else {
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }

    } catch (err) {
      if (err.response?.status === 400) {
        setError(err.response.data.message || 'Ошибка валидации');
      } else if (err.response?.status === 500) {
        setError('Сервис временно недоступен. Попробуйте позже.');
      } else if (err.code === 'ERR_NETWORK') {
        setError('Нет соединения с сервером. Проверьте подключение.');
      } else {
        setError('Произошла неизвестная ошибка. Попробуйте снова.');
      }
      
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="split-screen">
        <div className="split-left">
          <div className="split-content">
            <div className="welcome-block">
              <h1>Регистрация успешна! 🎉</h1>
              <p>Добро пожаловать в медицинский колледж</p>
              <p className="redirect-text">Перенаправление...</p>
            </div>
          </div>
        </div>
        <div className="split-right">
          <div className="success-message">
            <div className="success-icon">✅</div>
            <h2>Аккаунт создан!</h2>
            <p>Теперь вы можете войти в систему</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="split-screen">
      {/* Левая часть - изображение и приветствие */}
      <div className="split-left">
        <div className="split-content">
          <div className="welcome-block">
            <h1>Присоединяйтесь к нам!</h1>
            <p>Создайте аккаунт для получения доступа ко всем возможностям системы медицинского колледжа</p>
          </div>
        </div>
      </div>

      {/* Правая часть - форма регистрации */}
      <div className="split-right">
        <div className="auth-card">
          <div className="auth-header">
            <h2>Регистрация</h2>
            <p>Заполните форму для создания аккаунта</p>
          </div>

          {error && <div className="error-message">⚠️ {error}</div>}

          <form onSubmit={handleSubmit} className="auth-form" noValidate>
            <div className="form-group">
              <label htmlFor="user_name" className="form-label">
                Имя пользователя
                <span className="required">*</span>
              </label>
              <input
                type="text"
                id="user_name"
                name="user_name"
                value={formData.user_name}
                onChange={handleChange}
                placeholder="Придумайте логин"
                className={`form-input ${validationErrors.user_name ? 'input-error' : ''}`}
                disabled={loading}
                autoComplete="username"
              />
              {validationErrors.user_name && (
                <span className="field-error">{validationErrors.user_name}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
                <span className="required">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@mail.com"
                className={`form-input ${validationErrors.email ? 'input-error' : ''}`}
                disabled={loading}
                autoComplete="email"
              />
              {validationErrors.email && (
                <span className="field-error">{validationErrors.email}</span>
              )}
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
                placeholder="Минимум 6 символов"
                className={`form-input ${validationErrors.password ? 'input-error' : ''}`}
                disabled={loading}
                autoComplete="new-password"
              />
              {validationErrors.password && (
                <span className="field-error">{validationErrors.password}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                Подтвердите пароль
                <span className="required">*</span>
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Повторите пароль"
                className={`form-input ${validationErrors.confirmPassword ? 'input-error' : ''}`}
                disabled={loading}
                autoComplete="new-password"
              />
              {validationErrors.confirmPassword && (
                <span className="field-error">{validationErrors.confirmPassword}</span>
              )}
            </div>

            <button 
              type="submit" 
              className="btn-submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Регистрация...
                </>
              ) : (
                'Зарегистрироваться'
              )}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Уже есть аккаунт?{' '}
              <Link to="/login" className="auth-link">
                Войти
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}