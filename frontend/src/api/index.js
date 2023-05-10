const API_BASE_URL = 'localhost:5000'


export function GetAllTeams() {
  return fetch(`http://${API_BASE_URL}/api/teams`, {
    method: 'GET',
  })
}

export function CreateTeam(team_name) {
  return fetch(`http://${API_BASE_URL}/api/teams`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      tname: team_name
    })
  })
}

export function UpdateTeam(team_id, team_name) {
  return fetch(`http://${API_BASE_URL}/api/teams/` + team_id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      tname: team_name
    })
  })
}

export function GetAllMathes() {
  return fetch(`http://${API_BASE_URL}/api/rasp`, {
    method: 'GET',
  })
}

export function createMatch(date, team_one, team_two) {
  return fetch(`http://${API_BASE_URL}/api/rasp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      match_date: date, 
      first_team: team_one, 
      second_team: team_two
    })
  })
}
export function GetOneMatch(matchid) {
  return fetch(`http://${API_BASE_URL}/api/rasp/${matchid}`, {
    method: 'GET',
  })
}
export function DeleteMatchFromRasp(matchid) {
  return fetch(`http://${API_BASE_URL}/api/rasp/${matchid}`, {
    method: 'DELETE',
  })
}

export function Archiving(match_daten, first_teamn, res_onen, second_teamn, res_twon, penaltyn, winnern) {
  return fetch(`http://${API_BASE_URL}/api/arc`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      match_date: match_daten, 
      first_team: first_teamn, 
      res_one: res_onen, 
      second_team: second_teamn, 
      res_two: res_twon, 
      penalty: penaltyn, 
      winner: winnern
    })
  })
}

export function GetALLMathesFromArchive() {
  return fetch(`http://${API_BASE_URL}/api/arc`, {
    method: 'GET',
  })
}