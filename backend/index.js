const express = require('express');
const cors = require('cors');

const app = express();

// middleware
app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(express.json());

// routes
const usersRoutes = require('./routes/users.routes');
const authRoutes = require('./routes/auth.routes');

// api
app.use('/api/users', usersRoutes);
app.use('/api/auth', authRoutes);



// старт
app.listen(3000, () => {
  console.log('Сервер запущен на http://localhost:3000');
});