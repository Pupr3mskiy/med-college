const express = require('express');
const app = express();

app.use(express.json());

const usersRoutes = require('./routes/users');
const authRoutes = require('./routes/auth.routes');

app.use('/users', usersRoutes);
app.use('/auth', authRoutes);

app.listen(3000, () => {
    console.log('Сервер запущен');
});