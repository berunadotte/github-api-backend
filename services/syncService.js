const { fetchTrendingRepositories } = require('./githubService')

let interval
const minutes = 10
let intervalTime = 60 * 1000 * minutes

function startSync() {
  console.log('Starting initial sync...')
  fetchTrendingRepositories()
    .then(() => {
      interval = setInterval(() => {
        console.log('Performing scheduled sync...')
        fetchTrendingRepositories().catch((err) =>
          console.error('Scheduled sync error:', err)
        )
      }, intervalTime)
    })
    .catch((err) => console.error('Initial sync error:', err))
}

function forceSync() {
  console.log('Forcing sync...')
  if (interval) {
    clearInterval(interval)
    console.log('Cleared existing interval')
  }
  fetchTrendingRepositories()
    .then(() => {
      console.log('Forced sync complete, restarting interval...')
      startSync()
    })
    .catch((err) => console.error('Forced sync error:', err))
}

module.exports = { startSync, forceSync }
