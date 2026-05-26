const express = require('express');

const router = express.Router();

router.get('/dashboard', async (req, res) => {
  try {
    res.json({
      studentsByDept: {
        categories: [
          'Лечебное дело',
          'Сестринское дело',
          'Фармация',
          'Лабораторная диагностика'
        ],
        data: [120, 85, 45, 30]
      },

      enrollmentTrend: {
        months: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн'],
        data: [15, 22, 18, 30, 25, 35]
      },

      staffDistribution: [
        { name: 'Преподаватели', value: 45 },
        { name: 'Лаборанты', value: 12 },
        { name: 'Администрация', value: 8 },
        { name: 'Техперсонал', value: 15 }
      ]
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;