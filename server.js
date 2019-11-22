// import playerData from './data/nba-teams';
// import teamData from './data/nba-players';
// import express from 'express';
const playerData = require('./data/nba-teams')
const teamData = require('./data/nba-players')
const express = require('express');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.json());

app.locals.title = 'NBAPI';
app.locals.teams = teamData;
app.locals.players = playerData;

app.get('/', (request, response) => {
  response.send('Welcome to NBAPI 2018-2019');
});

app.get('/api/v1/players', (request, response) => {
  database('players').select()
  .then((players) => {
    response.status(200).json(players)
  })
  .catch((error) => {
    response.status(500).json({ error: "Unable to retrieve player data" });
  })
  // const { players } = app.locals;
  // console.log('2018-2019 NBA Player Stats', players.length)
  // response.json({ players });
})

app.get('/api/v1/teams', (request, response) => {
  database('players').select()
    .then((players) => {
      response.status(200).json(players)
    })
    .catch((error) => {
      response.status(500).json({ error: "Unable to retrieve player data" });
    })
  // const { teams } = app.locals;
  // console.log('NBA Teams', teams.length)
  // response.json({ teams });
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}`)
});