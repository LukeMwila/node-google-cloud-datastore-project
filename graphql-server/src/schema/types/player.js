/**
 * Player type
 */
const graphql = require('graphql');
const axios = require('axios');
/** Import object types from GraphQL */
const { GraphQLObjectType, GraphQLString, GraphQLInt } = graphql;

const PlayerType = new GraphQLObjectType({
  name: 'PlayerType',
  fields: () => ({
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    age: { type: GraphQLInt },
    team: {
      type: require('./team'),
      resolve(parentValue, args) {
        return axios
          .get(`http://${process.env.TEAMS_API}/v1/teams/${parentValue.teamId}`)
          .then(response => response.data);
      }
    }
  })
});

module.exports = PlayerType;
