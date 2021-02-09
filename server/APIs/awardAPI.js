const environment = process.env.ENV || 'development';
const config = require('../knexfile')[environment];
const knex = require('knex')(config);

