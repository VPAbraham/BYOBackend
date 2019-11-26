const express = require('express');
//requires Express into file.
const cors = require('cors');
//requires cors into file.
const app = express();
//invokes Express, allowing us to use Express NodeJS methods.
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
//requires in knex configuration for development and production environments




app.set('port', process.env.PORT || 3000);
//runs the server in port 3000 by default but allows it to be run on another, if needed.
app.use(express.json());
app.use(cors());
//Allows the app to use JSON formatting and cors policies

app.locals.title = 'NBAPI';
//Gives the app the title of 'NBAPI' which is reflected on root.
app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}`)
});
//On successful start, the app will console log what root it is running on.

//Redirect link to endpoint documentation
app.get('/', (request, response) => {
  response.send('Endpoints available at https://github.com/VPAbraham/BYOBackend');
});
//This is the root endpoint. Since there is not data here,
//it gives a link to the docs where the roots containing data
//are detailed

//GET all players
app.get('/api/v1/players', (request, response) => {
  //This specificies the route the user will GET from.
  database('players')
  .select()
  .then((players) => {
    response.status(200).json(players)
  })
  // on successful HTTP GET request, the user will get a response with this response code and data
  .catch((error) => {
    response.status(500).json({ error: "Unable to retrieve player data" });
  });
    // on unsuccessful GET request, the user will get a response with this response code and console message

});

//GET all teams
app.get('/api/v1/teams', (request, response) => {
  database('players').select()
    .then((players) => {
      response.status(200).json(players)
    })
    // on successful HTTP GET request, the user will get a response with this response code and data
    .catch((error) => {
      response.status(500).json({error});
    });
    // on unsuccessful GET request, the user will get a response with this response code and console message
});

//GET players by id
app.get('/api/v1/players/:id', (request, response) => {
  //this GET uses a dynamic route that will dictate what player it is getting by what their id number is.
  const { id } = request.params;
  // the id will be derived from the parameter of id applied to the end of the fetch URL.
  database('players').select()
  //selects players from the players db
  .where({id: id})
  //for entries where the player id matches the id param
  .then((player) => {
    if (player.length === 0) {
      response.status(404).json('There is no player with that id.')
      //if no match, return this error message
    } else {
      response.status(200).json(player);
      //if there is a match, return the players json data
    };
  })
  .catch((error) => {
    response.status(500).json({ error });
  });
  //catch for server side errors with a 500 error code
});

//GET teams by id
app.get('/api/v1/teams/:id', (request, response) => {
    //this GET uses a dynamic route that will dictate what team it is getting by what their id number is.
  const { id } = request.params;
    // the id will be derived from the parameter of id applied to the end of the fetch URL.
  database('teams').select()
    //selects players from the teams db
    .where({id: id})
    //only for the team that matches the queried team id
    .then((team) => {
      if (team.length === 0) {
        request.status(404).json('No match for that team.');
        //if no match, return this error message
      } else {
        response.status(200).json(team);
      //if there is a match, return the team's json data
      };
    })
    .catch((error) => {
      response.status(500).json({error});
    });
  //catch for server side errors with a 500 error code
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

//DELETE by team
app.delete('/api/v1/teams/:id', (request, response) => {
  const {id} = request.params;
  database('teams')
    .where({id: id})
    .del()
    .then((team) => {
      response.status(201).json({ team, id });
    })
    .catch((error) => {
      response.status(422).json({ error });
    });
});

//DELETE by player
app.delete('/api/v1/players/:id', (request, response) => {
  const {id} = request.params;

  database('players')
    .where({id: id})
    .del()
    .then((player) => {
      response.status(201).json({player, id});
    })
    .catch((error) => {
      response.status(422).json({error});
    });
});
