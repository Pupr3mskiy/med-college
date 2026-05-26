const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: 'http://localhost:5173'
}));

app.use(express.json());

// DATABASE
const pool = require('./database/db');

pool.query('SELECT NOW()', (err) => {

    if (err) {
        console.log(err);

    } else {
        console.log('PostgreSQL connected');
    }

});

// ROUTES
const authRoutes = require('./routes/auth.routes');
const usersRoutes = require('./routes/users.routes');

// API
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);

// SUPPORT ROUTES
app.use('/api/analytics', require('./routes/analytics.routes'));


// START
app.listen(3000, () => {
    console.log('Сервер запущен на http://localhost:3000');
});