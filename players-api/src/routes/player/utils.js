// Imports the Google Cloud client library
const { Datastore } = require('@google-cloud/datastore');

// Creates a client
const datastore = new Datastore();

const ENTITY_KIND = 'Player';

// Create Player
const createPlayer = async playerData => {
  const playerKey = datastore.key([ENTITY_KIND]);

  const player = {
    key: playerKey,
    data: playerData
  };

  await datastore.save(player);

  return `Saved new player`;
};

// Get Player
const getPlayer = async playerId => {
  const playerKey = datastore.key([ENTITY_KIND, parseInt(playerId)]);
  const [player] = await datastore.get(playerKey);

  return {
    id: playerId,
    firstName: player.firstName,
    lastName: player.lastName,
    age: player.age,
    position: player.position,
    teamId: player.teamId,
    kind: ENTITY_KIND
  };
};

// List/Read Players
const listPlayers = async () => {
  const query = datastore.createQuery(ENTITY_KIND);

  const queryResults = await datastore.runQuery(query);

  if (queryResults && queryResults.length && queryResults[0].length) {
    const players = queryResults[0];

    const nbaPlayerRoster = players.map(player => {
      const playerKey = player[datastore.KEY];

      return {
        id: playerKey.id,
        firstName: player.firstName,
        lastName: player.lastName,
        age: player.age,
        position: player.position,
        teamId: player.teamId,
        kind: player[datastore.KEY].kind
      };
    });

    return nbaPlayerRoster;
  }

  return [];
};

// Update Player
const updatePlayer = async (playerId, player) => {
  const transaction = datastore.transaction();
  const playerKey = datastore.key([ENTITY_KIND, playerId]);

  try {
    await transaction.run();
    transaction.save({
      key: playerKey,
      data: player
    });

    await transaction.commit();

    return `Player updated successfully`;
  } catch (err) {
    transaction.rollback();
  }
};

// Delete Player
const deletePlayer = async playerId => {
  const playerKey = datastore.key([ENTITY_KIND, playerId]);
  await datastore.delete(playerKey);

  return `Player ${playerId} deleted successfully.`;
};

module.exports = {
  createPlayer,
  getPlayer,
  listPlayers,
  updatePlayer,
  deletePlayer
};
