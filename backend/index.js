const express = require('express');
const cors = require('cors');
const authMiddleware = require('./middlewares/isAuth');
const attachCurrentUser = require('./middlewares/attachCurrentUser');

const app = express();

// DATABASE
const pool = require('./database/db');

// проверка подключения
pool.query('SELECT NOW()', (err, res) => {

    if (err) {
        console.log(err);

    } else {
        console.log('PostgreSQL connected');
    }

});

// middleware
app.use(cors({
    origin: 'http://localhost:5173'
}));

app.use(express.json());

// routes
const usersRoutes = require('./routes/users.routes');
const authRoutes = require('./routes/auth.routes');
const analyticsRoutes = require('./routes/analytics.routes');

// api
app.use('/api/users', usersRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/analytics', analyticsRoutes);
// start
app.listen(3000, () => {
    console.log('Сервер запущен на http://localhost:3000');
});