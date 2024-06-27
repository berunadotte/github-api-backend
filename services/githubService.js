const axios = require('axios');
const Repository = require('../models/repository');

async function fetchTrendingRepositories() {
  console.log('Fetching trending repositories...');
  try {
    const response = await axios.get('https://api.github.com/search/repositories', {
      params: {
        q: 'stars:>1',
        sort: 'stars',
        order: 'desc'
      }
    });

    const repositories = response.data.items.map(repo => ({
      _id: repo.id.toString(),
      name: repo.name,
      url: repo.html_url,
      stars: repo.stargazers_count
    }));

    for (const repo of repositories) {
      await Repository.findOneAndUpdate({ _id: repo._id }, repo, { upsert: true });
    }
    console.log('Trending repositories fetched and saved successfully');
  } catch (error) {
    console.error('Error fetching trending repositories:', error);
  }
}

module.exports = { fetchTrendingRepositories };