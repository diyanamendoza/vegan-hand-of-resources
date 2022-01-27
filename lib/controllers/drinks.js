const { Router } = require('express');
const Drink = require('../models/Drink');

module.exports = Router()
    .post('/', async (req, res) => {
        const drink = await Drink.insert({
            name: req.body.name,
            category: req.body.category,
            link: req.body.link,
        })
        res.send(drink)
    })

    .get('/:id', async (req, res) => {
        const { id } = req.params
        const drink = await Drink.getById(id)
        res.send(drink)
    })

    .get('/', async (req, res) => {
        const drinks = await Drink.getAll()
        res.send(drinks)
    })

    .patch('/:id', async (req, res) => {
        try {
            const { id } = req.params
            const existingDrink = await Drink.getById(id)
            if(!existingDrink) {
                const error = new Error(`Drink ${id} not found.`)
                error.status = 404
                throw error
            }

            const name = req.body.name ?? existingDrink.name
            const category = req.body.category ?? existingDrink.category
            const link = req.body.link ?? existingDrink.link

            const drink = await Drink.updateById(id, { name, category, link })

            res.send(drink)

        } catch (error) {
            next(error)
        }
    })

    .delete('/:id', async (req, res) => {
        const { id } = req.params
        const drink = await Drink.deleteById(id)
        res.send(drink)
    })

