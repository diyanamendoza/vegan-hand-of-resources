const { Router } = require('express');
const Meal = require('../models/Meal');

module.exports = Router()
    .post('/', async (req, res) => {
        const meal = await Meal.insert({
            name: req.body.name,
            category: req.body.category,
            link: req.body.link,
        })
        res.send(meal)
    })

    .get('/:id', async (req, res) => {
        const { id } = req.params
        const meal = await Meal.getById(id)
        res.send(meal)
    })

    .get('/', async (req, res) => {
        const meals = await Meal.getAll()
        res.send(meals)
    })

    .patch('/:id', async (req, res) => {
        try {
            const { id } = req.params
            const existingMeal = await Meal.getById(id)
            if(!existingMeal) {
                const error = new Error(`Meal ${id} not found.`)
                error.status = 404
                throw error
            }

            const name = req.body.name ?? existingMeal.name
            const category = req.body.category ?? existingMeal.category
            const link = req.body.link ?? existingMeal.link

            const meal = await Meal.updateById(id, { name, category, link })

            res.send(meal)

        } catch (error) {
            next(error)
        }
    })

    .delete('/:id', async (req, res) => {
        const { id } = req.params
        const meal = await Meal.deleteById(id)
        res.send(meal)
    })

