<template>
    <div class="wrapper">
        <!--<h1>Футбольные команды</h1>-->
        <div v-if="!endgame">
            <div class="teams">
                <div style="width: 48%; text-align: right;">
                    {{ GetNameTeams(newMatch.first_team) }}
                </div>
                <div style="width: 4%;">
                    :
                </div>
                <div style="width: 48%; text-align: left;">
                    {{ GetNameTeams(newMatch.second_team) }}
                </div>
            </div>
            <div class="tablo">
                <button style="font-size: 34px;" @click="res_one += 1">Гол!</button>
                <div class="group-input">
                    <div class="input"> {{ res_one }}</div>
                    :
                    <div class="input"> {{ res_two }}</div>
                </div>
                <button style="font-size: 34px;" @click="res_two += 1">Гол!</button>
            </div>
            <div v-if="penalty === true" style="margin-bottom: 20px;" class="penalty">
                Вебирите победителя по серии пенальти:
                <select name="winner-on-penalties" id="winner-on-penalties" v-model="winner">
                    <option disabled dafault value="Победитель по серии пенальти">Победитель по серии пенальти</option>
                    <option :value=newMatch.first_team>{{ GetNameTeams(newMatch.first_team) }}</option>
                    <option :value=newMatch.second_team>{{ GetNameTeams(newMatch.second_team) }}</option>
                </select>
            </div>
            <button v-if="!penalty" @click="Summarize">Подвести итоги</button>
            <button v-if="penalty && winner === null" disabled>Завершить матч</button>
            <button v-if="penalty && winner != null" @click="EndMatch">Завершить матч</button>
        </div>
        <div v-else>
            <div class="teams">Победитель:</div>
            <div class="group-input" style="width:100%"><strong>{{ GetNameTeams(winner) }}</strong></div>
            <router-link to="/archive" >
            <button 
              class="btn__play">
              Перейти в Архив игр &#8594;
            </button>
          </router-link>
        </div>
    </div>
</template>

<script>
import ModalTeam from "../components/ModalTeam.vue";
import { formatISO } from 'date-fns'
import * as api from '../api'
export default {
    components: {
        ModalTeam
    },
    data() {
        return {
            newMatch: {},
            arrayTeams: [],
            res_one: 0,
            res_two: 0,
            penalty: false,
            winner: null,
            endgame: false,
        }
    },
    methods: {
        // получить информацию об одном матче
        async fetchOneMatchFromRasp(id) {
            const response = await api.GetOneMatch(id)
            const data = await response.json()
            console.log(data)
            this.newMatch = data
        },
        async deleteOneMatchFromRasp(id) {
            const response = await api.DeleteMatchFromRasp(id)
            console.log(response)
        },
        async Archiv() {
            const response = await api.Archiving(
                formatISO(new Date(this.newMatch.match_date), { representation: 'date' }),
                this.newMatch.first_team,
                this.res_one,
                this.newMatch.second_team,
                this.res_two,
                this.penalty,
                this.winner
            )
            const data = await response.json()
            console.log(data)
        },
        async fetchTeams() {
            const response = await api.GetAllTeams()
            const data = await response.json()
            console.log(data)
            this.arrayTeams = data
        },
        GetNameTeams(number) {
            let tiname = this.arrayTeams.find(element => element.id === number).tname
            return tiname
        },
        Summarize() {
            if (this.res_one != this.res_two) {
                if (this.res_one > this.res_two) {
                    this.winner = this.newMatch.first_team
                }
                else {
                    this.winner = this.newMatch.second_team
                }
                console.log(
                    formatISO(new Date(this.newMatch.match_date), { representation: 'date' }),
                    this.newMatch.first_team,
                    this.res_one,
                    this.newMatch.second_team,
                    this.res_two,
                    this.penalty,
                    this.winner)
                this.Archiv()
                this.deleteOneMatchFromRasp(parseInt(this.$route.params.matchid))
                this.endgame = true
            }
            else {
                this.penalty = true
                if (this.winner != '') {
                    console.log(
                        formatISO(new Date(this.newMatch.match_date), { representation: 'date' }),
                        this.newMatch.first_team,
                        this.res_one,
                        this.newMatch.second_team,
                        this.res_two,
                        this.penalty,
                        this.winner)
                }
            }
        },
        EndMatch() {
            this.Archiv()
            this.deleteOneMatchFromRasp(parseInt(this.$route.params.matchid))
            this.endgame = true
        }
    },
    created() {
        this.fetchTeams()
        this.fetchOneMatchFromRasp(parseInt(this.$route.params.matchid))
    }
}

</script>
<style scoped>
.wrapper {
    text-align: center;
    max-width: 900px;
    margin: 10px auto;
}

.teams {
    width: 100%;
    height: 100px;
    margin: 0 auto 20px auto;
    font-size: 43px;
    display: flex;
    align-items: center;
}

.tablo {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin-bottom: 20px;
}

.group-input {
    width: 250px;
    height: 100px;
    background: #FFFFFF;
    border: 1px solid #F5F5F5;
    box-shadow: inset 2px 2px 2px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    padding: 11px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    font-size: 76px;
}

.input {
    font-size: 76px;
}


button {
    border-radius: 5px;
    border-width: 1px;
    padding: 5px 10px;
    box-shadow: none;
}
.btn__play {
  margin-left: 10px; 
  background-color:#42b983; 
  color: #ffffff; 
  border: 1px solid #42b983;
}
.btn__play:hover{
  background-color:#349468;
  border-color: #276f4e;
}
.btn__play:active{
  background-color:#276f4e;
  border-color: #1a4a34;
}
</style>