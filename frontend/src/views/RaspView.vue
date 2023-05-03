<template>
  <div class="matches">
    <h1>Расписание матчей</h1>
    <button style="margin: 10px;" @click="createNewMatch">Добавить матч в расписание</button>
    <div class="" v-if="arrayMatсhes.length > 0" v-for="match in arrayMatсhes">
      <div class="match">
        {{ match.match_date }}
        {{ match.first_team }}
        {{ match.second_team }}
        <div class="">
          <button @click="Update(match.id)">Редактировать матч</button>
          <button style="margin-left: 10px; background-color:#42b983; color: #ffffff; border: none;" @click="fetchMathes">Провести матч</button>
          <button style="margin-left: 10px;" @click="Delete(match.id)">Удалить из расписания</button>
        </div>
      </div>
    </div>
  </div>
  <ModalRasp 
  :isShow="showModal" 
  @cancel="this.showModal = false" 
  @confirm="SendTeam"
  @update="SendUpdateTeam(this.team.id)"
  :headerModal="ActionModal"
  :action="action"
  v-model="team.tname" 
  :arrayTeams="arrayTeams" />
</template>

<script>
import ModalRasp from "../components/ModalRasp.vue";
import * as api from '../api'
export default {
  components: {
    ModalRasp
  },
  data() {
    return {
      arrayMatсhes: [],
      arrayTeams: [],
      team: {
        id: null,
        tname: ''
      },
      showModal: false,
      ActionModal: '',
      action: '', //'add' or 'update'
    }
  },
  methods: {
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
    async SendTeam() {
      if (this.team.tname != '') {
        const response = await api.CreateTeam(this.team.tname)
        const data = await response.json()
        console.log(data)
        this.showModal = false
      }
      this.fetchMathes()
    },
    //редактирование команды
    async Update(id) {
      this.ActionModal = 'Редактировать матч'
      this.action = 'update'
      this.showModal = true
      this.team.id = id 
    },
    async SendUpdateTeam(id_team) {
      if (this.team.tname != '') {
        const response = await api.UpdateTeam(id_team, this.team.tname)
        const data = await response.json()
        //console.log(data) //показать отредактированную запись
        this.showModal = false
        this.team.id = null
        this.team.tname = ''
        this.fetchMathes()
      }
    }
  },
  created() {
    this.fetchMathes()
    this.fetchTeams()
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

}

.match:hover {
  background-color: #cafce6;
}
</style>