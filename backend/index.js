const express = require('express');
const cors = require('cors');

const app = express();

// middleware
app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(express.json());

// routes
const usersRoutes = require('./routes/users');
const authRoutes = require('./routes/auth.routes');


app.use('/api/users', usersRoutes);
app.use('/api/auth', authRoutes);

// test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend работает!' });
});

// start server
app.listen(3000, () => {
  console.log('Сервер запущен на http://localhost:3000');
});