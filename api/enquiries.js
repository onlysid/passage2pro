import { createConnection } from 'mysql';

export default (req, res) => {
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

        if (req.method === 'PUT') {
            const id = req.url.split('/')[3];
            const { confirmed } = req.body;
            const query = 'UPDATE enquiries SET confirmed = ? WHERE id = ?';
            db.query(query, [confirmed, id], (err, results) => {
                if (err) {
                    return res.status(500).json({ error: err });
                }
                res.json({ message: 'Enquiry updated successfully' });
            });
        } else {
            const searchTerm = req.query.search || '';
            const query = `
                SELECT enquiries.*, affiliates.name AS affiliate_name, affiliates.email AS affiliate_email
                FROM enquiries
                LEFT JOIN affiliates ON enquiries.affiliate = affiliates.id
                WHERE enquiries.player_name LIKE ? OR enquiries.name LIKE ? OR enquiries.email LIKE ? OR affiliates.name LIKE ?
                ORDER BY enquiries.id DESC
            `;
            db.query(query, [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`], (err, results) => {
                if (err) {
                    return res.status(500).json({ error: 'Error querying database' });
                }
                res.json(results);
            });
        }
    });
};