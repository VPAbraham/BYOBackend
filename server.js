// import playerData from './data/nba-players';
import teamData from './data/nba-teams';
import express from 'express';

// const express = require('express');
const app = express();
// console.log(teamData)
app.set('port', process.env.PORT || 3000);

app.use(express.json());
app.use(express.static('public'))

app.locals.title = 'NBAPI';

app.get('/', (request, response) => {
  response.send(`${teamData[0]['FULL NAME']}`);
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost${app.get('port')}`)
});