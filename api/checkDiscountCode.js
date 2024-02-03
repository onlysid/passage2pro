import { createConnection } from 'mysql';

export default (req, res) => {
  if (req.method === 'POST') {
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

      const query = 'SELECT * FROM affiliates WHERE code = ?';
      db.query(query, [req.body.code], (err, results) => {
          if (err) {
              return res.status(500).json({ error: 'Error querying database' });
          }
  
          if (results.length > 0) {
              res.json({ success: true, email: results[0].email });
          } else {
              res.json({ success: false });
          }
      });
    });
  } else {
    // handle GET request as before
  }
};