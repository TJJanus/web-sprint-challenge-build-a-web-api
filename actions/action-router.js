const express = require('express')
const router = express.Router()
const Action = require('../data/helpers/actionModel')

router.get('/', (req, res) => {
    Action.get()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(error => {
            console.log(error)
            res.status(404).json({ message: 'Could not get actions'})
        })
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    if(!id){
        res.status(500).json({ message: 'Must have valid ID'})
    } else {

        Action.get(id)
            .then(data => {
                res.status(200).json(data)
            })
            .catch(error => {
                console.log(error)
                res.status(404).json({ message: 'it broke'})
            })
    }
})

router.post('/', (req, res) => {
    Action.insert(req.body)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(error => {
            console.log(error)
            res.status(404).json({message: 'Could not add action'})
        })
})

router.put('/:id', (req, res) => {
    const id = req.params.id
    const changes = req.body
    Action.update(id, changes)
        .then(data => {
            if(data) {
                res.status(200).json(data)
            } else {
                res.status(404).json({ message: 'Could not update the action'})
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ message: 'Something went bad'})
        })
})

router.delete('/:id', (req, res) => {
    Action.remove(req.params.id)
        .then(count => {
            if(count > 0) {
                res.status(200).json({ message: 'Action deleted'})
            } else {
                res.status(404).json({ message: 'The action could not be found'})
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ message: 'Something went bad'})
        })
})

module.exports = router;