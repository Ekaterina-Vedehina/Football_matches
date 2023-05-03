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
      //'Access-Control-Allow-Origin': 'http://http://localhost:8080'
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
      //'Access-Control-Allow-Origin': 'http://http://localhost:8080'
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

