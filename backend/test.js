const API_BASE_URL = 'localhost:5000'

function GetAllTeams() {
    return fetch(`http://${API_BASE_URL}/api/teams`, {
        method: 'GET',
    })
}

function CreateTeam(team_name) {
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

function UpdateTeam(team_id, team_name) {
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
function GetOneTeam(teamid) {
    return fetch(`http://${API_BASE_URL}/api/teams/${teamid}`, {
        method: 'GET',
    })
}
function GetALLMathesFromArchive() {
    return fetch(`http://${API_BASE_URL}/api/arc`, {
        method: 'GET',
    })
}


/*-------------------------------------------------*/
//тесты на получение записей с базы дынных
async function test_list_teams(a) {
    var response = await GetAllTeams(a)
    var data = await response.json()
    const test_base =
    [
        { id: 1, tname: 'Спартак' },
        { id: 2, tname: 'Манчестер Юнайтед' },
        { id: 3, tname: 'Барселона' },        
        { id: 4, tname: 'Ливерпуль' },        
        { id: 5, tname: 'Реал Мадрид' },
        { id: 6, tname: 'Милан' },
        { id: 8, tname: 'Зенит' },
        { id: 9, tname: 'Боруссия' },
        { id: 10, tname: 'Марсель' },
        { id: 11, tname: 'Ювентус' },
        { id: 14, tname: 'Ньюкасл' },
        { id: 7, tname: 'ЦСКА' }
    ]
    var isEqual = JSON.stringify(data) === JSON.stringify(test_base);
    if (isEqual) {
        console.log(data)
        console.log('pass')
    }
    else {
        console.log('NO pass')
    }
}
async function test_length_teams(a) {
    var response = await GetAllTeams(a)
    var data = await response.json()
    var select_all = data.length
    if (select_all === 12) {
        console.log('pass')
    }
    else {
        console.log('NO pass')
    }
}
async function insert_team(tname) {
    var response = await GetAllTeams()
    var data = await response.json()
    var before_insert = data.length
    console.log(tname)
    response = await CreateTeam(tname)

    response = await GetAllTeams()
    data = await response.json()
    var after_insert = data.length

    if (after_insert - before_insert === 1) {
        console.log('pass')
    }
    else {
        console.log('NO pass')
    }
}
async function insert_get_team(new_tname) {
    const response = await CreateTeam(new_tname)
    var data = await response.json()
    console.log(data)
    var test = { id: 61, tname: ['team_one', 'team_two'] }

    if (JSON.stringify(test) === JSON.stringify(data)) {
        console.log('pass')
    }
    else {
        console.log('NO pass')
    }
}
async function update_one_team(new_tname) {
    const bresponse = await GetOneTeam(7)
    const bdata = await bresponse.json()
    //console.log(bdata)
    var new_record = await UpdateTeam(7, new_tname)
    //console.log(new_data)
    const aresponse = await GetOneTeam(7)
    const adata = await aresponse.json()
    console.log(adata)
    if (new_tname === adata.tname) {
        console.log('pass')
    }
    else {
        console.log('NO pass')
    }
}

async function test_select_length_archive() {
    var response = await GetALLMathesFromArchive()
    var data = await response.json()
    var select_all = data.length
    //console.log(data)

    if (select_all === 9) {
        console.log('pass')
    }
    else {
        console.log('NO pass')
    }
}
async function test_select_list_archive() {
    var response = await GetALLMathesFromArchive()
    var data = await response.json()
    const test = [
        {
          id: 1,
          match_date: '2023-05-18T21:00:00.000Z',
          match_time: null,
          first_team: 10,
          res_one: 2,
          second_team: 2,
          res_two: 1,
          penalty: false,
          winner: 10
        },
        {
          id: 4,
          match_date: '2023-05-23T21:00:00.000Z',
          match_time: null,
          first_team: 2,
          res_one: 2,
          second_team: 4,
          res_two: 2,
          penalty: true,
          winner: 4
        },
        {
          id: 5,
          match_date: '2023-05-23T21:00:00.000Z',
          match_time: null,
          first_team: 8,
          res_one: 2,
          second_team: 1,
          res_two: 2,
          penalty: true,
          winner: 8
        },
        {
          id: 6,
          match_date: '2023-05-18T21:00:00.000Z',
          match_time: null,
          first_team: 9,
          res_one: 2,
          second_team: 6,
          res_two: 1,
          penalty: false,
          winner: 9
        },
        {
          id: 7,
          match_date: '2023-05-24T21:00:00.000Z',
          match_time: null,
          first_team: 7,
          res_one: 2,
          second_team: 8,
          res_two: 3,
          penalty: false,
          winner: 8
        },
        {
          id: 8,
          match_date: '2023-04-30T21:00:00.000Z',
          match_time: null,
          first_team: 6,
          res_one: 2,
          second_team: 5,
          res_two: 2,
          penalty: true,
          winner: 6
        },
        {
          id: 9,
          match_date: '2023-05-02T21:00:00.000Z',
          match_time: null,
          first_team: 5,
          res_one: 3,
          second_team: 3,
          res_two: 3,
          penalty: true,
          winner: 5
        },
        {
          id: 10,
          match_date: '2023-05-17T21:00:00.000Z',
          match_time: null,
          first_team: 11,
          res_one: 2,
          second_team: 5,
          res_two: 1,
          penalty: false,
          winner: 11
        },
        {
          id: 11,
          match_date: '2023-05-24T21:00:00.000Z',
          match_time: null,
          first_team: 5,
          res_one: 2,
          second_team: 3,
          res_two: 2,
          penalty: true,
          winner: 3
        }
      ]
    if (JSON.stringify(data) === JSON.stringify(test)) {
        console.log('pass')
    }
    else {
        console.log('NO pass')
    }
}

/* тесты к командам */
//test_list_teams()
//test_length_teams('string')
//insert_team('team_one', 'team_two')
//insert_get_team('team_one', 'team_two')
update_one_team('21')
/* тесты к архиву */
//test_select_length_archive()
//test_select_list_archive()
