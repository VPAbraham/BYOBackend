const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3000);
app.locals.title = 'NBAPI';

app.get('/', (request, response) => {
  response.send('BALLLLLLINNNN');
});

app.listen(app.get('port'), () => {
  console.log('its running')
});