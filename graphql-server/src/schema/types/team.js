/**
 * Team type
 */
const graphql = require('graphql');
// const axios = require('axios');
/** Import object types from GraphQL */
const { GraphQLObjectType, GraphQLString } = graphql;

const TeamType = new GraphQLObjectType({
  name: 'TeamType',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString }
  })
});

module.exports = TeamType;
