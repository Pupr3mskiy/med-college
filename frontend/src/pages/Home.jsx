import { Link } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

export default function Home() {
  const isLoggedIn = isAuthenticated();

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1>Медицинский Колледж</h1>
          <p className="hero-subtitle">
            Современное образование для будущего медицины
          </p>
          
          <div className="hero-buttons">
            {!isLoggedIn ? (
              <>
                <Link to="/login" className="btn-hero primary">
                   Войти
                </Link>
                <Link to="/register" className="btn-hero secondary">
                   Регистрация
                </Link>
              </>
            ) : (
              <Link to="/dashboard" className="btn-hero primary">
                 Перейти в панель управления
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="quick-links">
        <h2 className="section-title">Основные разделы</h2>
        <div className="links-grid">
          <Link to="/dashboard" className="link-card">
            <div className="link-icon">📊</div>
            <h3>Панель управления</h3>
            <p>Аналитика и статистика колледжа</p>
          </Link>

          <Link to="/about" className="link-card">
            <div className="link-icon">ℹ️</div>
            <h3>О колледже</h3>
            <p>Информация о нашем учебном заведении</p>
          </Link>

          {isLoggedIn && (
            <>
              <div className="link-card">
                <div className="link-icon">📚</div>
                <h3>Учебные материалы</h3>
                <p>Доступ к учебным ресурсам</p>
              </div>

              <div className="link-card">
                <div className="link-icon">📅</div>
                <h3>Расписание</h3>
                <p>Расписание занятий и экзаменов</p>
              </div>
            </>
          )}
        </div>
      </section>

    
      <section className="features-preview">
        <h2 className="section-title">Возможности системы</h2>
        <div className="features-grid">
          <div className="feature-item">
            <span className="feature-number">01</span>
            <h3>Электронный журнал</h3>
            <p>Отслеживание успеваемости в реальном времени</p>
          </div>
          <div className="feature-item">
            <span className="feature-number">02</span>
            <h3>Онлайн расписание</h3>
            <p>Актуальное расписание занятий и аудиторий</p>
          </div>
          <div className="feature-item">
            <span className="feature-number">03</span>
            <h3>Аналитика</h3>
            <p>Статистика и отчёты по всем направлениям</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <p>© 2026 Медицинский Колледж. Все права защищены.</p>
        <p className="footer-subtitle">Информационная система управления</p>
      </footer>
    </div>
  );
}