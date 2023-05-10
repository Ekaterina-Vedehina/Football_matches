<template>
  <div class="matches">
    <h1>Расписание матчей</h1>
    <button style="margin: 10px;" @click="createNewMatch">Добавить матч в расписание</button>
    <div class="" v-if="arrayMatсhes.length > 0" v-for="match in arrayMatсhes">
      <div class="match">
        <!--{{ match.match_date }}-->
        {{ GetCorrectDate(match.match_date) }}
        <!--{{ match.first_team }}
        {{ match.second_team }}-->
        <div class="row-name-teams">
          {{ GetNameTeams(match.first_team) }} :
          {{ GetNameTeams(match.second_team) }}
        </div>
        <div class="">
          <!--<button @click="Update(match.id)">Редактировать матч</button> -->
          <router-link :to="`/match/${match.id}`" >
            <button 
              class="btn__play"
              @click="fetchMathes">
              Провести матч
            </button>
          </router-link>
          <button style="margin-left: 10px;" @click="deleteOneMatchFromRasp(match.id)">Удалить из расписания</button>
        </div>
      </div>
    </div>
    <div v-else> В расписании нет ни одного матча. Вы можете создать новый.</div>
  </div>
  <ModalRasp 
  :isShow="showModal" 
  @cancel="this.showModal = false" 
  @confirm="SendMatch"
  @update="SendUpdateMatch(this.arrayMatсhes.id)"
  :headerModal="ActionModal"
  :action="action"
  :arrayTeams="arrayTeams" 
  @selectone="optionSelectOne"
  @selecttwo="optionSelectTwo"
  @changedate="optionDateSelect"
  />

</template>

<script>
import ModalRasp from "../components/ModalRasp.vue";
import * as api from '../api'
import { formatISO } from 'date-fns'
export default {
  components: {
    ModalRasp
  },
  data() {
    return {
      arrayMatсhes: [],
      arrayTeams: [],
      date_match: '',
      team_one: {
        id: '',
        tname: ''
      },
      team_two: {
        id: '',
        tname: ''
      },
      showModal: false,
      ActionModal: '',
      action: '', //'add' or 'update'
    }
  },
  methods: {
    optionSelectOne(option) {
      this.team_one.id = option;
      console.log(this.team_one.id)
    },
    optionSelectTwo(option) {
      this.team_two.id = option;
      console.log(this.team_two.id)
    },
    optionDateSelect (option) {
      this.date_match = option;
      console.log(this.date_match)
    },
    async fetchTeams() {
      const response = await api.GetAllTeams()
      const data = await response.json()
      console.log(data)
      this.arrayTeams = data
    },
    // получить список всех команд
    async fetchMathes() {
      const response = await api.GetAllMathes()
      const data = await response.json()
      console.log(data)
      this.arrayMatсhes = data
    },
    //Создать команду
    createNewMatch() {
      this.ActionModal = 'Создать новый матч'
      this.action = 'add'
      this.showModal = true
      //this.arrayMatсhes = this.arrayMatсhes.push(data)
    },
    //отправить запрос на сервер на добавление новой команды
    async SendMatch() {
      console.log(this.date_match, this.team_one.tname, this.team_two.tname)
      if (this.date_match  != '' && this.team_one.id  != '' && this.team_two.id != '') {
        const response = await api.createMatch(this.date_match, this.team_one.id, this.team_two.id)
        const data = await response.json()
        console.log(data)
        this.showModal = false
      }
      this.fetchMathes()
    },
    async deleteOneMatchFromRasp(id) {
      const response = await api.DeleteMatchFromRasp(id)
      console.log(response)
      this.fetchMathes()
    },
    GetNameTeams(number) {
      let tiname = this.arrayTeams.find(element => element.id === number).tname
      return tiname
    },
    GetCorrectDate(date) {
      let correctdate = formatISO(new Date(date), { representation: 'date' })
      return correctdate
    },
  },
  created() {
    this.fetchTeams()
    this.fetchMathes()
  }
}
</script>

<style scoped>
.matches {
  text-align: center;
}
.match {
  background-color: #e1faef;
  margin: 10px auto;
  text-align: start;
  max-width: 900px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.match:hover {
  background-color: #cafce6;
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