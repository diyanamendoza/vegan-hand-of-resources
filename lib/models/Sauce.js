const pool = require('../utils/pool');

module.exports = class Sauce {
    id;
    name;
    category;
    link;

    constructor(row) {
        this.id = row.id;
        this.name = row.name;
        this.category = row.category;
        this.link = row.link;
    }

    static async insert({ name, category, link }) {
        const { rows } = await pool.query(
            'INSERT INTO sauces(name, category, link) VALUES ($1, $2, $3) RETURNING *;', [name, category, link])
            const sauce = new Sauce(rows[0])
            return sauce
    }

    static async getAll() {
        const { rows } = await pool.query('SELECT * FROM sauces;');
        const sauce = rows.map((row) => new Sauce(row));
    
        return sauce;
      }
    
    static async getById(id) {
        const { rows } = await pool.query('SELECT * FROM sauces WHERE id=$1;', [
            id,
    ]);

    if (!rows[0]) return null;
        const sauce = new Sauce(rows[0]);

        return sauce;
    }

    static async updateById(id, { name, category, link }) {
        const { rows } = await pool.query(
            'UPDATE sauces SET name=$2, category=$3, link=$4 WHERE id=$1 RETURNING *;',
            [id, name, category, link]
        );
        const sauce = new Sauce(rows[0]);

        return sauce;
    }

    static async deleteById(id) {
        const { rows } = await pool.query(
            'DELETE FROM sauces WHERE id=$1 RETURNING *;',
            [id]
    );

        if (!rows[0]) return null;
            const sauce = new Sauce(rows[0]);

        return sauce
        }

}
