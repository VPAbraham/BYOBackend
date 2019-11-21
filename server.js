import playerData from './data/nba-teams';
import teamData from './data/nba-players';
import express from 'express';

const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.json());

app.locals.title = 'NBAPI';
app.locals.teams = teamData;
app.locals.players = playerData;

app.get('/', (request, response) => {
  response.send(`${teamData[0]['FULL NAME']}`);
});

app.get('/api/v1/players', (request, response) => {
  const { players } = app.locals;
  console.log('2018-2019 NBA Player Stats', players.length)
  response.json({ players });
})

app.get('/api/v1/teams', (request, response) => {
  const { teams } = app.locals;
  console.log('NBA Teams', teams.length)
  response.json({ teams });
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}`)
});