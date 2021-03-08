const axios = require('axios')
const postModel = require('./models/Post')

let seeddata =  axios.get('https://jsonplaceholder.typicode.com/comments').then(function (response) {
    console.log(response.data[0]);
    postModel.create(response.data)
  })
  .catch(function (error) {
    console.log(error);
})

module.exports = seeddata;