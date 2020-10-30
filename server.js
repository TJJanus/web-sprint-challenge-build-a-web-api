const express = require('express')

const projectRouter = require('./projects/project-router')
const actionRouter = require('./actions/action-router')

const server = express()
server.use(express.json())

server.get('/', (req, res) => {
    res.send(`<h2>Hello World </h2>`)
});

server.use('/api/projects', projectRouter)
server.use('/api/actions', actionRouter)

module.exports = server;