// Imports the Google Cloud client library
const { Datastore } = require('@google-cloud/datastore');

// Creates a client
const datastore = new Datastore();

const ENTITY_KIND = 'Team';

// Create Team
const createTeam = async teamData => {
  const teamKey = datastore.key([ENTITY_KIND]);

  const team = {
    key: teamKey,
    data: teamData
  };

  await datastore.save(team);

  return `Saved new team`;
};

// Get Team
const getTeam = async teamId => {
  const teamKey = datastore.key([ENTITY_KIND, parseInt(teamId)]);
  const [team] = await datastore.get(teamKey);

  return {
    id: teamId,
    name: team.name,
    kind: ENTITY_KIND
  };
};

// List/Read Teams
const listTeams = async () => {
  const query = datastore.createQuery(ENTITY_KIND);

  const queryResults = await datastore.runQuery(query);

  if (queryResults && queryResults.length && queryResults[0].length) {
    const teams = queryResults[0];

    const nbaTeamRoster = teams.map(team => {
      const teamKey = team[datastore.KEY];

      return {
        id: teamKey.id,
        name: team.name,
        kind: team[datastore.KEY].kind
      };
    });

    return nbaTeamRoster;
  }

  return [];
};

// Update Team
const updateTeam = async (teamId, team) => {
  const transaction = datastore.transaction();
  const teamKey = datastore.key([ENTITY_KIND, teamId]);

  try {
    await transaction.run();
    transaction.save({
      key: teamKey,
      data: team
    });

    await transaction.commit();

    return `Team updated successfully`;
  } catch (err) {
    transaction.rollback();
  }
};

// Delete Team
const deleteTeam = async teamId => {
  const teamKey = datastore.key([ENTITY_KIND, teamId]);
  await datastore.delete(teamKey);

  return `Team ${teamId} deleted successfully.`;
};

module.exports = {
  createTeam,
  getTeam,
  listTeams,
  updateTeam,
  deleteTeam
};
