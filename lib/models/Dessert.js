const pool = require('../utils/pool');

module.exports = class Dessert {
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
            'INSERT INTO desserts(name, category, link) VALUES ($1, $2, $3) RETURNING *;', [name, category, link])
            const dessert = new Dessert(rows[0])
            return dessert
    }

    static async getAll() {
        const { rows } = await pool.query('SELECT * FROM desserts;');
        const dessert = rows.map((row) => new Dessert(row));
    
        return dessert;
      }
    
    static async getById(id) {
        const { rows } = await pool.query('SELECT * FROM desserts WHERE id=$1;', [
            id,
    ]);

    if (!rows[0]) return null;
        const dessert = new Dessert(rows[0]);

        return dessert;
    }

    static async updateById(id, { name, category, link }) {
        const { rows } = await pool.query(
            'UPDATE desserts SET name=$2, category=$3, link=$4 WHERE id=$1 RETURNING *;',
            [id, name, category, link]
        );
        const dessert = new Dessert(rows[0]);

        return dessert;
    }

    static async deleteById(id) {
        const { rows } = await pool.query(
            'DELETE FROM desserts WHERE id=$1 RETURNING *;',
            [id]
    );

        if (!rows[0]) return null;
            const dessert = new Dessert(rows[0]);

        return dessert
        }

}
