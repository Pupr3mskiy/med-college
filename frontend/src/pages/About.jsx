import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="about-page">
      {/* Header */}
      <div className="about-header">
        <h1> О колледже</h1>
        <p>Информация о нашем учебном заведении</p>
      </div>

      {/* Main Info */}
      <section className="about-section">
        <div className="about-card">
          <h2> Общая информация</h2>
          <p>
            Медицинский колледж — это современное образовательное учреждение, 
            готовящее квалифицированных специалистов в области здравоохранения. 
            Мы предлагаем качественное образование, соответствующее современным 
            стандартам и требованиям рынка труда.
          </p>
        </div>
      </section>

      {/* Specialties */}
      <section className="about-section">
        <h2 className="section-title">Направления подготовки</h2>
        <div className="specialties-grid">
          <div className="specialty-card">
            <div className="specialty-icon">‍️</div>
            <h3>Лечебное дело</h3>
            <p>Подготовка медицинских сестёр и фельдшеров</p>
            <ul>
              <li>Срок обучения: 3 года 10 месяцев</li>
              <li>Базовое образование: 9 классов</li>
            </ul>
          </div>

          <div className="specialty-card">
            <div className="specialty-icon"></div>
            <h3>Фармация</h3>
            <p>Подготовка провизоров и фармацевтов</p>
            <ul>
              <li>Срок обучения: 2 года 10 месяцев</li>
              <li>Базовое образование: 11 классов</li>
            </ul>
          </div>

          <div className="specialty-card">
            <div className="specialty-icon"></div>
            <h3>Лабораторная диагностика</h3>
            <p>Подготовка специалистов лабораторной диагностики</p>
            <ul>
              <li>Срок обучения: 2 года 10 месяцев</li>
              <li>Базовое образование: 11 классов</li>
            </ul>
          </div>

          <div className="specialty-card">
            <div className="specialty-icon"></div>
            <h3>Сестринское дело</h3>
            <p>Подготовка медицинских сестёр широкого профиля</p>
            <ul>
              <li>Срок обучения: 2 года 10 месяцев</li>
              <li>Базовое образование: 11 классов</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="about-section">
        <h2 className="section-title">Наши достижения</h2>
        <div className="stats-grid">
          <div className="stat-box">
            <h3>280+</h3>
            <p>Студентов</p>
          </div>
          <div className="stat-box">
            <h3>45</h3>
            <p>Преподавателей</p>
          </div>
          <div className="stat-box">
            <h3>12</h3>
            <p>Учебных групп</p>
          </div>
          <div className="stat-box">
            <h3>98%</h3>
            <p>Трудоустройство выпускников</p>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="about-section">
        <div className="about-card">
          <h2> Контакты</h2>
          <div className="contact-info">
            <p><strong>Адрес:</strong> г. Москва, ул. Варшавская, 28</p>
            <p><strong>Телефон:</strong> +7 (923) 531-34-22</p>
            <p><strong>Email:</strong> info@med-college.ru</p>
            <p><strong>Режим работы:</strong> Пн-Пт: 8:00 - 17:00</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <h2>Хотите стать частью нашей команды?</h2>
        <p>Присоединяйтесь к нам и получите качественное медицинское образование!</p>
        <Link to="/register" className="btn-cta">
          Подать заявку на поступление
        </Link>
      </section>
    </div>
  );
}