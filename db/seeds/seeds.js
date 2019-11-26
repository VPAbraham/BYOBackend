const teamsData = require('../../data/nba-teams');
const playersData = require('../../data/nba-players');


const createTeam = (knex, team) => {
  return knex('teams')
  .insert({
    team: team.Team,
    abbreviation: team.Abbreviation,
    city: team.City,
    state: team.State,
    venue: team.Venue
  }, 'abbreviation')
  .then(abbreviation => {
    let playerPromises = [];
    playersData
    .filter(player => player.Team === abbreviation[0])
    .forEach(player => {
      playerPromises.push(
        createPlayer(knex, {
          name: player.Name,
          pos: player.Pos,
          age: player.Age,
          gp: player.Gp,
          mpg: player.Mpg,
          fta: player.Fta,
          ftper: player.FTPer,
          _2pa: player._2Pa,
          _2ptper: player._2PtPer,
          _3pa: player._3Pa,
          _3ptper: player._3PtPer,
          ppg: player.Ppg,
          rpg: player.Rpg,
          apg: player.Apg,
          spg: player.Spg,
          bpg: player.Bpg,
          topg: player.Topg,
          team: abbreviation[0] 
        })
      );
    });

    return Promise.all(playerPromises);
  });
};

const createPlayer = (knex, player) => {
  return knex('players').insert(player);
};

exports.seed = (knex) => {
  return knex('players')
    .del()
    .then(() => knex('teams').del())
    .then(() => {
      let teamPromises = [];

      teamsData.forEach(team => {
        teamPromises.push(createTeam(knex, team));
      });

      return Promise.all(teamPromises);
    })
    .catch(error => console.log(`Error seeding data: ${error}`)); 
};
