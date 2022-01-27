const { Router } = require('express');
const Dessert = require('../models/Dessert');

module.exports = Router()
    .post('/', async (req, res) => {
        const dessert = await Dessert.insert({
            name: req.body.name,
            category: req.body.category,
            link: req.body.link,
        })
        res.send(dessert)
    })

    .get('/:id', async (req, res) => {
        const { id } = req.params
        const dessert = await Dessert.getById(id)
        res.send(dessert)
    })

    .get('/', async (req, res) => {
        const desserts = await Dessert.getAll()
        res.send(desserts)
    })

    .patch('/:id', async (req, res) => {
        try {
            const { id } = req.params
            const existingDessert = await Dessert.getById(id)
            if(!existingDessert) {
                const error = new Error(`Dessert ${id} not found.`)
                error.status = 404
                throw error
            }

            const name = req.body.name ?? existingDessert.name
            const category = req.body.category ?? existingDessert.category
            const link = req.body.link ?? existingDessert.link

            const dessert = await Dessert.updateById(id, { name, category, link })

            res.send(dessert)

        } catch (error) {
            next(error)
        }
    })

    .delete('/:id', async (req, res) => {
        const { id } = req.params
        const dessert = await Dessert.deleteById(id)
        res.send(dessert)
    })

