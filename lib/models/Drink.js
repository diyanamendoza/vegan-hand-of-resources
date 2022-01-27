const pool = require('../utils/pool');

module.exports = class Drink {
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
            'INSERT INTO drinks(name, category, link) VALUES ($1, $2, $3) RETURNING *;', [name, category, link])
            const drink = new Drink(rows[0])
            return drink
    }

    static async getAll() {
        const { rows } = await pool.query('SELECT * FROM drinks;');
        const drink = rows.map((row) => new Drink(row));
    
        return drink;
      }
    
    static async getById(id) {
        const { rows } = await pool.query('SELECT * FROM drinks WHERE id=$1;', [
            id,
    ]);

    if (!rows[0]) return null;
        const drink = new Drink(rows[0]);

        return drink;
    }

    static async updateById(id, { name, category, link }) {
        const { rows } = await pool.query(
            'UPDATE drinks SET name=$2, category=$3, link=$4 WHERE id=$1 RETURNING *;',
            [id, name, category, link]
        );
        const drink = new Drink(rows[0]);

        return drink;
    }

    static async deleteById(id) {
        const { rows } = await pool.query(
            'DELETE FROM drinks WHERE id=$1 RETURNING *;',
            [id]
    );

        if (!rows[0]) return null;
            const drink = new Drink(rows[0]);

        return drink
        }

}
