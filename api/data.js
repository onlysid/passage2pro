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
      
      const { name, pname, age, email, tel, classID, team, discount } = req.body;
      // Class parser
      const classes = {
        "group": "1",
        "individual": "2",
        "camps": "3",
        "finishing": "4"
      }

      // Get affiliate from discount code
      const affiliateQuery = 'SELECT id FROM affiliates WHERE code = ?';
      db.query(affiliateQuery, [discount], (err, results) => {
        if (err) {
          return res.status(500).json({ error: err });
        }
        
        let affiliate = results[0].id;
        console.log(affiliate);
        // Insert into database
        const query = 'INSERT INTO enquiries (name, player_name, age, email, phone, class, team, affiliate) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        db.query(query, [name, pname, age, email, tel, classes[classID], team, affiliate], (err, results) => {
          if (err) {
            return res.status(500).json({ error: 'Error querying database' });
          }

          res.json({ success: true });
        });
      });
    });
  } else {
    // handle GET request as before
  }
};