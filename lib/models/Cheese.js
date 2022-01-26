const pool = require('../utils/pool');

module.exports = class Cheese {
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
            'INSERT INTO cheeses(name, category, link) VALUES ($1, $2, $3) RETURNING *;', [name, category, link])
            const cheese = new Cheese(rows[0])
            return cheese
    }

    static async getAll() {
        const { rows } = await pool.query('SELECT * FROM cheeses;');
        const cheese = rows.map((row) => new Cheese(row));
    
        return cheese;
      }
    
    static async getById(id) {
        const { rows } = await pool.query('SELECT * FROM cheeses WHERE id=$1;', [
            id,
    ]);

    if (!rows[0]) return null;
        const cheese = new Cheese(rows[0]);

        return cheese;
    }

    static async updateById(id, { name, category, link }) {
        const { rows } = await pool.query(
            'UPDATE cheeses SET name=$2, category=$3, link=$4 WHERE id=$1 RETURNING *;',
            [id, name, category, link]
        );
        const cheese = new Cheese(rows[0]);

        return cheese;
    }

    static async deleteById(id) {
        const { rows } = await pool.query(
            'DELETE FROM cheeses WHERE id=$1 RETURNING *;',
            [id]
    );

        if (!rows[0]) return null;
            const cheese = new Cheese(rows[0]);

        return cheese
        }

}
