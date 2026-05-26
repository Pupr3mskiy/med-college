const express = require('express');
const router = express.Router();
const pool = require('../database/db');

router.get('/dashboard', async (req, res) => {
  try {
    // 1. все пользователи
    const usersResult = await pool.query(`
      SELECT user_id, role, created_at
      FROM users
    `);

    const users = usersResult.rows;

    const totalUsers = users.length;
    const students = users.filter(u => u.role === 'student').length;
    const teachers = users.filter(u => u.role === 'teacher').length;
    const admins = users.filter(u => u.role === 'admin').length;

    // 2. распределение ролей (Pie chart)
    const roleMap = {};
    users.forEach(u => {
      roleMap[u.role] = (roleMap[u.role] || 0) + 1;
    });

    const staffDistribution = Object.entries(roleMap).map(([k, v]) => ({
      name: k,
      value: v
    }));

    // 3. группы (через students таблицу)
    const groupResult = await pool.query(`
      SELECT group_name FROM students
    `);

    const groupMap = {};
    groupResult.rows.forEach(s => {
      const g = s.group_name || 'no-group';
      groupMap[g] = (groupMap[g] || 0) + 1;
    });

    const studentsByDept = {
      categories: Object.keys(groupMap),
      data: Object.values(groupMap)
    };

    // 4. тренд регистрации (по created_at)
    const trendResult = await pool.query(`
      SELECT DATE_TRUNC('month', created_at) as month, COUNT(*) as count
      FROM users
      GROUP BY month
      ORDER BY month
      LIMIT 6
    `);

    const enrollmentTrend = {
      months: trendResult.rows.map(r =>
        new Date(r.month).toLocaleString('ru-RU', { month: 'short' })
      ),
      data: trendResult.rows.map(r => Number(r.count))
    };

    res.json({
        totalUsers: totalUsers || 0,
        students: students || 0,
        teachers: teachers || 0,
        admins: admins || 0,
        studentsByDept,
        enrollmentTrend,
        staffDistribution
});

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Analytics error',
      error: err.message
    });
  }
});

module.exports = router;