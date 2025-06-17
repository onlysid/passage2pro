import { createPool } from 'mysql';
import mailchimp from '@mailchimp/mailchimp_marketing';
import crypto from 'crypto'

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX,
});

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

      const { name, pname, age, email, tel, classID, team, discount, preferred_camp, selected_days, price_summary, discount_percent } = req.body;

      const classes = {
        "group": "1",
        "individual": "2",
        "camps": "3",
        "finishing": "4"
      };

      const affiliate = await getAffiliateId(db, discount);

      const timestamp = Math.floor(Date.now() / 1000);

      await insertEnquiry(
        db,
        timestamp,
        name,
        pname,
        age,
        email,
        tel,
        classes[classID],
        team,
        affiliate,
        preferred_camp,
        selected_days?.join(',') || null,
        price_summary,
        discount_percent || null
      );

      const emailHash = crypto.createHash('md5').update(email.toLowerCase()).digest('hex');

      await mailchimp.lists.addListMember(process.env.MAILCHIMP_AUDIENCE_ID, emailHash, {
        email_address: email,
        status_if_new: "subscribed",
        merge_fields: {
          FNAME: name.split(' ')[0],
          LNAME: name.split(' ')[1] || '',
          PHONE: tel,
          SMSPHONE: tel
        }
      });


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
function insertEnquiry(db, timestamp, name, pname, age, email, tel, classId, team, affiliate, camp, selectedDays, price, discountPercent) {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO enquiries 
      (timestamp, name, player_name, age, email, phone, class, team, affiliate, camp_id, selected_days, price, discount_percent)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(
      query,
      [timestamp, name, pname, age, email, tel, classId, team, affiliate, camp, selectedDays, price, discountPercent],
      (err, results) => {
        if (err) reject(err);
        resolve();
      }
    );
  });
}
