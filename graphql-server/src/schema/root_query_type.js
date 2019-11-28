const graphql = require('graphql');
const axios = require('axios');

const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString
} = graphql;

/** Model Types */
const PlayerType = require('./types/player');
const TeamType = require('./types/team');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    players: {
      type: new GraphQLList(PlayerType),
      resolve(parentValue, args) {
        return axios
          .get(`http://${process.env.PLAYERS_API}/v1/players`)
          .then(response => response.data);
      }
    },
    player: {
      type: PlayerType,
      args: { id: { type: new GraphQLNonNull(GraphQLString) } },
      resolve(parentValue, args) {
        return axios
          .get(`http://${process.env.PLAYERS_API}/v1/players/${args.id}`)
          .then(response => response.data);
      }
    },
    teams: {
      type: new GraphQLList(TeamType),
      resolve(parentValue, args) {
        return axios
          .get(`http://${process.env.TEAMS_API}/v1/teams`)
          .then(response => response.data);
      }
    },
    team: {
      type: TeamType,
      args: { id: { type: new GraphQLNonNull(GraphQLString) } },
      resolve(parentValue, args) {
        return axios
          .get(`http://${process.env.TEAMS_API}/v1/teams/${args.id}`)
          .then(response => response.data);
      }
    }
  })
});

module.exports = RootQuery;
