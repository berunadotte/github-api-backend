const axios = require('axios');
const [,, ...args] = process.argv;

const baseURL = 'http://localhost:3000';

async function fetchRepositories() {
  const response = await axios.get(`${baseURL}/repositories`);
  console.log(response.data);
}

async function fetchRepository(id) {
  const response = await axios.get(`${baseURL}/repositories/${id}`);
  console.log(response.data);
}

async function fetchRepositoryByName(name) {
  const response = await axios.get(`${baseURL}/search`, {
    params: { name }
  });
  console.log(response.data);
}

async function syncRepositories() {
  const response = await axios.post(`${baseURL}/sync`);
  console.log(response.data);
}

if (args[0] === 'list') {
  fetchRepositories();
} else if (args[0] === 'get' && args[1]) {
  fetchRepository(args[1]);
} else if (args[0] === 'search' && args[1]) {
  fetchRepositoryByName(args[1]);
} else if (args[0] === 'sync') {
  syncRepositories();
} else {
  console.log('Invalid command');
}
