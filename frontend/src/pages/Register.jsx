import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { setAuth } from '../utils/auth';

export default function Register() {

  const [formData, setFormData] = useState({
    user_name: '',
    full_name: '',
    email: '',

    role: 'student',

    group_name: 'МК-1',
    subject: 'биология',

    password: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState('');

  const [success, setSuccess] = useState(false);

  const [validationErrors, setValidationErrors] = useState({});

  const navigate = useNavigate();

  // =========================
  // GROUPS
  // =========================
  const groups = [
    'МК-1',
    'МК-2',
    'МК-3',
    'МК-4',
    'МК-5',
    'МК-6',
    'МК-7'
  ];

  // =========================
  // SUBJECTS
  // =========================
  const subjects = [
    'биология',
    'патология',
    'фармакология',
    'основы латинского языка',
    'анатомия',
    'практика',
    'врачевание'
  ];

  // =========================
  // HANDLE CHANGE
  // =========================
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

  // =========================
  // VALIDATION
  // =========================
  const validateForm = () => {

    const errors = {};

    // USERNAME
    if (!formData.user_name.trim()) {

      errors.user_name =
        'Имя пользователя обязательно';

    } else if (formData.user_name.length < 3) {

      errors.user_name =
        'Минимум 3 символа';

    }

    // FULL NAME
    if (!formData.full_name.trim()) {

      errors.full_name =
        'Введите полное имя';

    }

    // EMAIL
    if (!formData.email.trim()) {

      errors.email =
        'Email обязателен';

    } else if (
      !/\S+@\S+\.\S+/.test(formData.email)
    ) {

      errors.email =
        'Некорректный email';

    }

    // PASSWORD
    if (!formData.password) {

      errors.password =
        'Пароль обязателен';

    } else if (
      formData.password.length < 6
    ) {

      errors.password =
        'Минимум 6 символов';

    }

    // CONFIRM PASSWORD
    if (
      formData.password !==
      formData.confirmPassword
    ) {

      errors.confirmPassword =
        'Пароли не совпадают';

    }

    setValidationErrors(errors);

    return Object.keys(errors).length === 0;

  };

  // =========================
  // SUBMIT
  // =========================
  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    setError('');

    try {

      const response = await api.post(
        '/auth/register',
        {
          user_name: formData.user_name,

          full_name: formData.full_name,

          email: formData.email,

          role: formData.role,

          group_name:
            formData.role === 'student'
              ? formData.group_name
              : null,

          subject:
            formData.role === 'teacher'
              ? formData.subject
              : null,

          password: formData.password
        }
      );

      setSuccess(true);

      if (response.data.token) {

        setAuth(
          response.data.token,
          response.data.user
        );

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

        setError(
          err.response.data.message ||
          'Ошибка валидации'
        );

      } else if (
        err.response?.status === 500
      ) {

        setError(
          'Сервис временно недоступен. Попробуйте позже.'
        );

      } else if (
        err.code === 'ERR_NETWORK'
      ) {

        setError(
          'Нет соединения с сервером.'
        );

      } else {

        setError(
          'Произошла неизвестная ошибка.'
        );

      }

      console.error(
        'Registration error:',
        err
      );

    } finally {

      setLoading(false);

    }

  };

  // =========================
  // SUCCESS
  // =========================
  if (success) {

    return (
      <div className="split-screen">

        <div className="split-left">
          <div className="split-content">

            <div className="welcome-block">

              <h1>
                Регистрация успешна! 🎉
              </h1>

              <p>
                Добро пожаловать
              </p>

            </div>

          </div>
        </div>

        <div className="split-right">

          <div className="success-message">

            <div className="success-icon">
              ✅
            </div>

            <h2>
              Аккаунт создан!
            </h2>

          </div>

        </div>

      </div>
    );

  }

  // =========================
  // UI
  // =========================
  return (

    <div className="split-screen">

      {/* LEFT */}
      <div className="split-left">

        <div className="split-content">

          <div className="welcome-block">

            <h1>
              Присоединяйтесь к нам!
            </h1>

            <p>
              Создайте аккаунт
            </p>

          </div>

        </div>

      </div>

      {/* RIGHT */}
      <div className="split-right">

        <div className="auth-card">

          <div className="auth-header">

            <h2>
              Регистрация
            </h2>

          </div>

          {error && (
            <div className="error-message">
              ⚠️ {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="auth-form"
          >

            {/* USERNAME */}
            <div className="form-group">

              <label className="form-label">
                Имя пользователя
              </label>

              <input
                type="text"
                name="user_name"
                value={formData.user_name}
                onChange={handleChange}
                className={`form-input ${
                  validationErrors.user_name
                    ? 'input-error'
                    : ''
                }`}
              />

              {validationErrors.user_name && (
                <span className="field-error">
                  {validationErrors.user_name}
                </span>
              )}

            </div>

            {/* FULL NAME */}
            <div className="form-group">

              <label className="form-label">
                Полное имя
              </label>

              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                placeholder="Иванов Иван Иванович"
                className={`form-input ${
                  validationErrors.full_name
                    ? 'input-error'
                    : ''
                }`}
              />

              {validationErrors.full_name && (
                <span className="field-error">
                  {validationErrors.full_name}
                </span>
              )}

            </div>

            {/* EMAIL */}
            <div className="form-group">

              <label className="form-label">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`form-input ${
                  validationErrors.email
                    ? 'input-error'
                    : ''
                }`}
              />

              {validationErrors.email && (
                <span className="field-error">
                  {validationErrors.email}
                </span>
              )}

            </div>

            {/* ROLE */}
            <div className="form-group">

              <label className="form-label">
                Роль
              </label>

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="form-input"
              >

                <option value="student">
                  Студент
                </option>

                <option value="teacher">
                  Преподаватель
                </option>

                

              </select>

            </div>

            {/* GROUP */}
            {formData.role === 'student' && (

              <div className="form-group">

                <label className="form-label">
                  Группа
                </label>

                <select
                  name="group_name"
                  value={formData.group_name}
                  onChange={handleChange}
                  className="form-input"
                >

                  {groups.map(group => (

                    <option
                      key={group}
                      value={group}
                    >
                      {group}
                    </option>

                  ))}

                </select>

              </div>

            )}

            {/* SUBJECT */}
            {formData.role === 'teacher' && (

              <div className="form-group">

                <label className="form-label">
                  Предмет
                </label>

                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="form-input"
                >

                  {subjects.map(subject => (

                    <option
                      key={subject}
                      value={subject}
                    >
                      {subject}
                    </option>

                  ))}

                </select>

              </div>

            )}

            {/* PASSWORD */}
            <div className="form-group">

              <label className="form-label">
                Пароль
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`form-input ${
                  validationErrors.password
                    ? 'input-error'
                    : ''
                }`}
              />

              {validationErrors.password && (
                <span className="field-error">
                  {validationErrors.password}
                </span>
              )}

            </div>

            {/* CONFIRM */}
            <div className="form-group">

              <label className="form-label">
                Подтвердите пароль
              </label>

              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`form-input ${
                  validationErrors.confirmPassword
                    ? 'input-error'
                    : ''
                }`}
              />

              {validationErrors.confirmPassword && (
                <span className="field-error">
                  {
                    validationErrors.confirmPassword
                  }
                </span>
              )}

            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="btn-submit"
              disabled={loading}
            >

              {loading
                ? 'Регистрация...'
                : 'Зарегистрироваться'}

            </button>

          </form>

          <div className="auth-footer">

            <p>

              Уже есть аккаунт?{' '}

              <Link
                to="/login"
                className="auth-link"
              >
                Войти
              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>

  );

}