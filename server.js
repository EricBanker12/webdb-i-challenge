const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.get('/api/accounts', (req, res) => {
    db('accounts')
    .then(resp => {
        // console.log(resp)
        res.json(resp)
    })
    .catch(err => {
        console.error(err)
        res.sendStatus(500)
    })
})

server.get('/api/accounts/:id', (req, res) => {
    db('accounts').where({id: req.params.id}).first()
    .then(resp => {
        // console.log(resp)
        if (resp) res.json(resp)
        else res.status(404).json({message: `No account of id ${req.params.id} was found.`})
    })
    .catch(err => {
        console.error(err)
        res.sendStatus(500)
    })
})

module.exports = server;