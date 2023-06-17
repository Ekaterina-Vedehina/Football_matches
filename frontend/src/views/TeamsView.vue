<template>
  <div class="teams">
    <h1>Футбольные команды</h1>
    <!--<button style="margin: 10px;" @click="fetchTeams">Получить список всех команд</button>-->
    <button style="margin: 10px;" @click="createNewTeam">Добавить команду</button>
    <!-- {{ arrayTeams }} -->
    <div class="" v-if="arrayTeams.length > 0" v-for="team in arrayTeams">
      <div class="team">
        {{ team.tname }}
        <button @click="Update(team.id)">Редактировать команду</button>
        <!-- <button @click="Delete(team.id)">Удалить команду</button> -->
      </div>
    </div>
  </div>
  <ModalTeam
    :isShow="showModal" 
    @cancel="this.showModal = false" 
    @confirm="SendTeam"
    @update="SendUpdateTeam(this.team.id)"
    :headerModal="ActionModal"
    :action="action"
    v-model="team.tname" 
  />
</template>

<script>
import ModalTeam from "../components/ModalTeam.vue";
import * as api from '../api'
export default {
  components: {
    ModalTeam
  },
  data() {
    return {
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
    // получить список всех команд
    async fetchTeams() {
      const response = await api.GetAllTeams()
      const data = await response.json()
      console.log(data)
      this.arrayTeams = data
    },
    //Создать команду
    createNewTeam() {
      this.ActionModal = 'Добавить команду'
      this.action = 'add'
      this.showModal = true
      //this.arrayTeams = this.arrayTeams.push(data)
    },
    //отправить запрос на сервер на добавление новой команды
    async SendTeam() {
      if (this.team.tname != '') {
        const response = await api.CreateTeam(this.team.tname)
        const data = await response.json()
        console.log(data)
        this.showModal = false
      }
      this.fetchTeams()
    },
    //редактирование команды
    async Update(id) {
      this.ActionModal = 'Редактировать команду'
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
        this.fetchTeams()
      }
    }
  },
  created() {
    this.fetchTeams()
  }
}

</script>
<style scoped>
.teams {
  text-align: center;
}
.team {
  background-color: #e1faef;
  margin: 10px auto;
  text-align: start;
  max-width: 900px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.team:hover {
  background-color: #cafce6;
}
button {
  border-radius: 5px;
  border-width: 1px;
  padding: 5px 10px;
  box-shadow: none;
}
</style>