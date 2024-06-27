const express = require('express')
const mongoose = require('./config/database')
const Repository = require('./models/repository')
const { startSync, forceSync } = require('./services/syncService')
const cors = require('cors');
const app = express()
const port = 3000

app.use(cors());

app.get('/repositories', async (req, res) => {
  const repositories = await Repository.find()
  res.json(repositories)
})

app.get('/repositories/:id', async (req, res) => {
  const repository = await Repository.findById(req.params.id)
  if (repository) {
    res.json(repository)
  } else {
    res.status(404).send('Repository not found')
  }
})

app.get('/search', async (req, res) => {
  const name = req.query.name
  if (name) {
    const repository = await Repository.findOne({ name })
    if (repository) {
      res.json(repository)
    } else {
      res.status(404).send('Repository not found')
    }
  } else {
    res.status(400).send('Name query parameter is required')
  }
})

app.post('/sync', (req, res) => {
  try {
    forceSync()
    res.send('Sync started')
  } catch (error) {
    console.error(error)
    res.status(500).send('Internal Server Error')
  }
})

startSync()

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
