const teamsData = require('../../data/nba-teams');
const playersData = require('../../data/nba-players');


const createTeam = (knex, team) => {
  return knex('teams')
  .insert({
    team: team.team,
    abbrev: team.abbrev,
     city: team.city,
     state: team.state,
     venue: team.venue
  }, 'abbrev')
  .then(teamAbbrev => {
    let playerPromises = [];
    playersData
    .forEach(player => {
      playerPromises.push(
        createPlayer(knex, {
          name: player.Name,
          team_abbrev:teamAbbrev,
          pos: player.pos,
          age: player.age,
          gp: player.gp,
          mpg: player.gp,
          fta: player.fta,
          ftper: player.ftper,
          _2pa: player._2pa,
          _2ptper: player._2ptper,
          _3pa: player._3pa,
          _3ptper: player._3ptper,
          ppg: player.ppg,
          rpg: player.rpg,
          apg: player.apg,
          spg: player.spg,
          bpg: player.bpg,
          topg: player.topg, 
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
