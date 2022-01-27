const { Router } = require('express');
const Cheese = require('../models/Cheese');

module.exports = Router()
    .post('/', async (req, res) => {
        const cheese = await Cheese.insert({
            name: req.body.name,
            category: req.body.category,
            link: req.body.link,
        })
        res.send(cheese)
    })

    .get('/:id', async (req, res) => {
        const { id } = req.params
        const cheese = await Cheese.getById(id)
        res.send(cheese)
    })

    .get('/', async (req, res) => {
        const cheeses = await Cheese.getAll()
        res.send(cheeses)
    })

    .patch('/:id', async (req, res) => {
        try {
            const { id } = req.params
            const existingCheese = await Cheese.getById(id)
            if(!existingCheese) {
                const error = new Error(`Cheese ${id} not found.`)
                error.status = 404
                throw error
            }

            const name = req.body.name ?? existingCheese.name
            const category = req.body.category ?? existingCheese.category
            const link = req.body.link ?? existingCheese.link

            const cheese = await Cheese.updateById(id, { name, category, link })

            res.send(cheese)

        } catch (error) {
            next(error)
        }
    })

    .delete('/:id', async (req, res) => {
        const { id } = req.params
        const cheese = await Cheese.deleteById(id)
        res.send(cheese)
    })

