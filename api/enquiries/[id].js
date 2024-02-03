import { createConnection } from 'mysql';

export default (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  const db = createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });

  db.connect((err) => {
    if (err) {
      return res.status(500).json({ error: 'Error connecting to database' });
    }

    switch (method) {
      case 'PUT':
        const { confirmed } = req.body;
        const query = 'UPDATE enquiries SET confirmed = ? WHERE id = ?';
        db.query(query, [confirmed, id], (err, results) => {
          if (err) {
              return res.status(500).json({ error: 'Error updating database' });
            }
          res.json({ message: 'Enquiry updated successfully' });
        });
        break;
      default:
        res.setHeader('Allow', ['PUT']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  });
};