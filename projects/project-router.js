const express = require('express')
const router = express.Router();
const Project = require('../data/helpers/projectModel')

router.get('/', (req, res) => {
    Project.get()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(error => {
            console.log(error)
            res.status(404).json({ message: 'Could not get project'})
        })
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    if(!id){
        res.status(500).json({ message: 'Must have valid ID'})
    } else {

        Project.get(id)
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
    Project.insert(req.body)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(error => {
            console.log(error)
            res.status(404).json({message: 'Could not add project'})
        })
})

router.put('/:id', (req, res) => {
    const id = req.params.id
    const changes = req.body
    Project.update(id, changes)
        .then(data => {
            if(data) {
                res.status(200).json(data)
            } else {
                res.status(404).json({ message: 'The project could not be updated'})
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ message: 'Something went bad'})
        })
})

router.delete('/:id', (req, res) => {
    Project.remove(req.params.id)
        .then(count => {
            if(count > 0) {
                res.status(200).json({ message: 'Project deleted'})
            } else {
                res.status(404).json({message: 'The project could not be found'})
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ message: 'Something went bad'})
        })
})

module.exports = router;