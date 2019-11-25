const playerData = require('./data/nba-teams')
const teamData = require('./data/nba-players')
const express = require('express');
const cors = require('cors');
const app = express();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);


app.set('port', process.env.PORT || 3000);
app.use(express.json());
app.use(cors());

app.locals.title = 'NBAPI';
app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}`)
});

app.get('/', (request, response) => {
  response.send('Endpoints available at https://github.com/VPAbraham/BYOBackend');
});

//GET all players
app.get('/api/v1/players', (request, response) => {
  database('players')
  .select()
  .then((players) => {
    response.status(200).json(players)
  })
  .catch((error) => {
    response.status(500).json({ error: "Unable to retrieve player data" });
  });
});

//GET all teams
app.get('/api/v1/teams', (request, response) => {
  database('players').select()
    .then((players) => {
      response.status(200).json(players)
    })
    .catch((error) => {
      response.status(500).json({error});
    });
});

//GET players by id
app.get('/api/v1/players/:id', (request, response) => {
  const { id } = request.params;
  database('players').select()
  .where({id: id})
  .then((player) => {
    if (player.length === 0) {
      response.status(404).json('There is no player with that id.')
    } else {
      response.status(404).json(player);
    };
  })
  .catch((error) => {
    response.status(500).json({ error });
  });
});

//GET teams by id
app.get('/api/v1/teams/:id', (request, response) => {
  const { id } = request.params;
  database('teams').select()
    .where({id: id})
    .then((team) => {
      if (team.length === 0) {
        request.status(404).json('No match for that team.');
      } else {
        response.status(200).json(team);
      };
    })
    .catch((error) => {
      response.status(500).json({error});
    });
});

//POST a new player
app.post('/api/v1/players', (request, response) => {
  const player = request.body;

  for (let requiredParam of ['name', 'pos', 'age', 'team']) {
    if (!player[requiredParam]) {
      return response
        .status(422)
        .send({
          error: `Expected format: { name: <String>, pos: <String>, age: <Integer>, team: <String>. 
      \"${requiredParam}\" property.}`
        })
    }
  }

  database('players').insert(player, 'id')
    .then(player => {
      response.status(201).json({id: player[0]});
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

//POST a new team
app.post('/api/v1/teams', (request, response) => {
  const team = request.body;

  for (let requiredParam of ['team', 'abbreviatation', 'city', 'state', 'venue']) {
    if (!team[requiredParam]) {
      return response
        .status(422)
        .send({
          error: `Expected format: { team: <String>, abbreviation: <String>, city: <String>, state: <String>, venue: <String>. 
      \"${requiredParam}\" property.}`
        })
    }
  }

  database('team').insert(player, 'id')
    .then(player => {
      response.status(201).json({id: player[0]});
    })
    .catch(error => {
      response.status(500).json({error});
    });
});





