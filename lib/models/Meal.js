const pool = require('../utils/pool');

module.exports = class Meal {
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
            'INSERT INTO meals(name, category, link) VALUES ($1, $2, $3) RETURNING *;', [name, category, link])
            const meal = new Meal(rows[0])
            return meal
    }

    static async getAll() {
        const { rows } = await pool.query('SELECT * FROM meals;');
        const meal = rows.map((row) => new Meal(row));
    
        return meal;
      }
    
    static async getById(id) {
        const { rows } = await pool.query('SELECT * FROM meals WHERE id=$1;', [
            id,
    ]);

    if (!rows[0]) return null;
        const meal = new Meal(rows[0]);

        return meal;
    }

    static async updateById(id, { name, category, link }) {
        const { rows } = await pool.query(
            'UPDATE meals SET name=$2, category=$3, link=$4 WHERE id=$1 RETURNING *;',
            [id, name, category, link]
        );
        const meal = new Meal(rows[0]);

        return meal;
    }

    static async deleteById(id) {
        const { rows } = await pool.query(
            'DELETE FROM meals WHERE id=$1 RETURNING *;',
            [id]
    );

        if (!rows[0]) return null;
            const meal = new Meal(rows[0]);

        return meal
        }

}
