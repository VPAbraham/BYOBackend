# NBAPI

A cultivated list of statistical data for all players and team for the 2018-2019 NBA season.

Peruse team and player data by a variety of criteria, as described by the documentation below.

[Heroku Deployment available here](https://nbapi2018.herokuapp.com/teams)

[View project board and planning process here.](https://github.com/VPAbraham/BYOBackend/projects/1)
 
### Stack and tools used
  - NodeJS
  - PostgreSQL
  - Heroku
  - ExpressJS
  - Knex
  - Babel

### Endpoints

## Base Url:
https://nbapi2018.herokuapp.com/


## Retrieve All Teams
A successful response will return an array containing all team info.


GET /api/v1/teams


### Parameters

| Name | Type | Description |
|------|------|-------------|
|id|integer| Unique team ID|
|Team|string|Full team name|
|Abbreviation|string| Abbrviation of team name, connects to player teams|
|City|string|City team is located in.|
|State|string|State team is located in.|
|Venue|string|Location in which the team plays home games.|



### Response

Example: ```[ 
               {
    "Team": "Spurs",
    "Abbreviation": "San",
    "City": "San Antonio",
    "State": "Texas",
    "Venue": "AT&T Center"
  }
  ]```
  
## Retrieve All Players
A successful response will return an array containing all player info and stats.


GET /api/v1/players


### Parameters

| Name | Type | Description |
|------|------|-------------|
|id|integer| Unique player ID|
|Team|string|Team name, abbreviation. Links to team abbreviations.|
|POS|string| Player's on court position.|
|Age|integer|Player's age.|
|GP|float|Games played|
|MPG|float|Average minutes played per game|
|FTA|float|Average free throws attempted per game|
|FTPer|float|Average free throw percentage per game|
|_2PA|float|Average two-point shots attempted per game|
|_2PtPer|float|Average two-point shot percentage per game|
|_3PA|float|Average three-point shots attempted per game|
|_3PtPer|float|Average three-point shot percentage per game|
|PPG|float|Average points scored played per game|
|RPG|float|Average rebounds per game|
|APG|float|Average assists per game|
|SPG|float|Average steals per game|
|BPG|float|Average blocks per game|
|TOPG|float|Average trunovers per game|


### Response

Example: ```[ 
               {
   "Name": "Tyler Zeller",
   "Team": "Mem",
   "Pos": "C",
   "Age": 29.23,
   "Gp": 4,
   "Mpg": 20.6,
   "Fta": 18,
   "FTPer": 0.778,
   "_2Pa": 28,
   "_2PtPer": 0.571,
   "_3Pa": 0,
   "_3PtPer": 0,
   "Ppg": 11.5,
   "Rpg": 4.5,
   "Apg": 0.8,
   "Spg": 0.25,
   "Bpg": 0.75,
   "Topg": 1
 }
  ]```
  
  
## Retrieve Specific Team

A successful response returns data for a certain album selected by id.


GET /api/v1/teams/:id


### Parameters

| Name | Type | Description |
|------|------|-------------|
|id|integer| Unique team ID|
|Team|string|Full team name|
|Abbreviation|string| Abbrviation of team name, connects to player teams|
|City|string|City team is located in.|
|State|string|State team is located in.|
|Venue|string|Location in which the team plays home games.|



### Response

Example: ```[ 
               {
    "Team": "Spurs",
    "Abbreviation": "San",
    "City": "San Antonio",
    "State": "Texas",
    "Venue": "AT&T Center"
  }
  ]```
  
  ## Retrieve Specific Player
A successful response will return an array containing all player info and stats.


GET /api/v1/players/:id


### Parameters

| Name | Type | Description |
|------|------|-------------|
|id|integer| Unique player ID|
|Team|string|Team name, abbreviation. Links to team abbreviations.|
|POS|string| Player's on court position.|
|Age|integer|Player's age.|
|GP|float|Games played|
|MPG|float|Average minutes played per game|
|FTA|float|Average free throws attempted per game|
|FTPer|float|Average free throw percentage per game|
|_2PA|float|Average two-point shots attempted per game|
|_2PtPer|float|Average two-point shot percentage per game|
|_3PA|float|Average three-point shots attempted per game|
|_3PtPer|float|Average three-point shot percentage per game|
|PPG|float|Average points scored played per game|
|RPG|float|Average rebounds per game|
|APG|float|Average assists per game|
|SPG|float|Average steals per game|
|BPG|float|Average blocks per game|
|TOPG|float|Average trunovers per game|


### Response

Example: ```[ 
               {
   "Name": "Tyler Zeller",
   "Team": "Mem",
   "Pos": "C",
   "Age": 29.23,
   "Gp": 4,
   "Mpg": 20.6,
   "Fta": 18,
   "FTPer": 0.778,
   "_2Pa": 28,
   "_2PtPer": 0.571,
   "_3Pa": 0,
   "_3PtPer": 0,
   "Ppg": 11.5,
   "Rpg": 4.5,
   "Apg": 0.8,
   "Spg": 0.25,
   "Bpg": 0.75,
   "Topg": 1
 }
  ]```
  
  ## Add New Team

A successful response returns the new team's id.


POST /api/v1/teams/:id


### Parameters

| Name | Type | Description |
|------|------|-------------|
|id|integer| Unique team ID|
|Team|string|Full team name|
|Abbreviation|string| Abbrviation of team name, connects to player teams|
|City|string|City team is located in.|
|State|string|State team is located in.|
|Venue|string|Location in which the team plays home games.|

### Required Body:

```
{ team: <String>, abbreviation: <String>, city: <String>, state: <String>, venue: <String> }
```

### Response

Example: 
{ "id": 32}

  
  ## Add New Player

A successful response returns the new players's id.


POST /api/v1/teams/:id


### Parameters

| Name | Type | Description |
|------|------|-------------|
|id|integer| Unique player ID|
|Team|string|Team name, abbreviation. Links to team abbreviations.|
|POS|string| Player's on court position.|
|Age|integer|Player's age.|
|GP|float|Games played|
|MPG|float|Average minutes played per game|
|FTA|float|Average free throws attempted per game|
|FTPer|float|Average free throw percentage per game|
|_2PA|float|Average two-point shots attempted per game|
|_2PtPer|float|Average two-point shot percentage per game|
|_3PA|float|Average three-point shots attempted per game|
|_3PtPer|float|Average three-point shot percentage per game|
|PPG|float|Average points scored played per game|
|RPG|float|Average rebounds per game|
|APG|float|Average assists per game|
|SPG|float|Average steals per game|
|BPG|float|Average blocks per game|
|TOPG|float|Average trunovers per game|


### Required Body:

```
{ name: <String>, pos: <String>, age: <Integer>, team: <String> }
```

### Response

Example: 
{ "id": 599}


   ## Remove a Team

A successful response returns the removed team's id.


DELETE /api/v1/teams/:id


### Parameters

| Name | Type | Description |
|------|------|-------------|
|id|integer| Unique team ID|
|Team|string|Full team name|
|Abbreviation|string| Abbrviation of team name, connects to player teams|
|City|string|City team is located in.|
|State|string|State team is located in.|
|Venue|string|Location in which the team plays home games.|

### Response

Example: 
"{Team} has been removed"

   ## Remove a Player

A successful response returns the removed player's id.


DELETE /api/v1/players/:id


### Parameters

| Name | Type | Description |
|------|------|-------------|
|id|integer| Unique player ID|
|Team|string|Team name, abbreviation. Links to team abbreviations.|
|POS|string| Player's on court position.|
|Age|integer|Player's age.|
|GP|float|Games played|
|MPG|float|Average minutes played per game|
|FTA|float|Average free throws attempted per game|
|FTPer|float|Average free throw percentage per game|
|_2PA|float|Average two-point shots attempted per game|
|_2PtPer|float|Average two-point shot percentage per game|
|_3PA|float|Average three-point shots attempted per game|
|_3PtPer|float|Average three-point shot percentage per game|
|PPG|float|Average points scored played per game|
|RPG|float|Average rebounds per game|
|APG|float|Average assists per game|
|SPG|float|Average steals per game|
|BPG|float|Average blocks per game|
|TOPG|float|Average trunovers per game|


### Response

Example: 
"{Player} has been removed"

  
  
