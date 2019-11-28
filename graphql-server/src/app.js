const express = require('express');
const expressGraphQL = require('express-graphql');
const bodyParser = require('body-parser');
const expressPlayground = require('graphql-playground-middleware-express')
  .default;

const schema = require('./schema/schema');

const app = express();

app.get('/playground', expressPlayground({ endpoint: '/v1/graphql' }));

app.use(bodyParser.json());
app.use(
  '/v1/graphql',
  expressGraphQL({
    schema,
    graphiql: true
  })
);

module.exports = app;
