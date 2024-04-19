import { createPool } from 'mysql';

// Create a connection pool
const pool = createPool({
  connectionLimit: 10,
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      const db = await getConnectionFromPool(pool);

      const { name, pname, age, email, tel, classID, team, discount } = req.body;

      const classes = {
        "group": "1",
        "individual": "2",
        "camps": "3",
        "finishing": "4"
      };

      const affiliate = await getAffiliateId(db, discount);

      const timestamp = Math.floor(Date.now() / 1000);

      await insertEnquiry(db, timestamp, name, pname, age, email, tel, classes[classID], team, affiliate);

      res.json({ success: true });
    } catch (error) {
      console.error('Error processing request:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

// Function to get a connection from the pool
function getConnectionFromPool(pool) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) reject(err);
      resolve(connection);
    });
  });
}

// Function to get affiliate ID
function getAffiliateId(db, discount) {
  return new Promise((resolve, reject) => {
    const affiliateQuery = 'SELECT id FROM affiliates WHERE code = ?';
    db.query(affiliateQuery, [discount], (err, results) => {
      if (err) reject(err);
      resolve(results[0]?.id);
    });
  });
}

// Function to insert enquiry
function insertEnquiry(db, timestamp, name, pname, age, email, tel, classId, team, affiliate) {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO enquiries (timestamp, name, player_name, age, email, phone, class, team, affiliate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [timestamp, name, pname, age, email, tel, classId, team, affiliate], (err, results) => {
      if (err) reject(err);
      resolve();
    });
  });
}
