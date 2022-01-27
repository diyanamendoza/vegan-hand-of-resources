const { Router } = require('express');
const Sauce = require('../models/Sauce');

module.exports = Router()
    .post('/', async (req, res) => {
        const sauce = await Sauce.insert({
            name: req.body.name,
            category: req.body.category,
            link: req.body.link,
        })
        res.send(sauce)
    })

    .get('/:id', async (req, res) => {
        const { id } = req.params
        const sauce = await Sauce.getById(id)
        res.send(sauce)
    })

    .get('/', async (req, res) => {
        const sauces = await Sauce.getAll()
        res.send(sauces)
    })

    .patch('/:id', async (req, res) => {
        try {
            const { id } = req.params
            const existingSauce = await Sauce.getById(id)
            if(!existingSauce) {
                const error = new Error(`Sauce ${id} not found.`)
                error.status = 404
                throw error
            }

            const name = req.body.name ?? existingSauce.name
            const category = req.body.category ?? existingSauce.category
            const link = req.body.link ?? existingSauce.link

            const sauce = await Sauce.updateById(id, { name, category, link })

            res.send(sauce)

        } catch (error) {
            next(error)
        }
    })

    .delete('/:id', async (req, res) => {
        const { id } = req.params
        const sauce = await Sauce.deleteById(id)
        res.send(sauce)
    })

