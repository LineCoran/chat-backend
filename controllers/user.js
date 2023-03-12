import { db } from '../connect.js'

export const getUser = (req, res) => {
  const q = `SELECT * FROM users WHERE id = ?`

  db.query(q, [req.params.userId], (err, data) => {
    if (err) return res.status(500).json(err);
    const {password, ...info} = data[0];
    return res.status(200).json(info);
  })
}

export const getAllUser = (req, res) => {
  const q = `SELECT * FROM users`;

  db.query(q, [req.params.userId], (err, data) => {
    if (err) return res.status(500).json(err);

    const usersWithoutPassword = data.map(user => {
      const {password, ...other} = user;
      return other;
    })
    return res.status(200).json(usersWithoutPassword);
  })
}