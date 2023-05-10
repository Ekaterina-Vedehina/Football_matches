<template>
  <div class="archive">
    <h1>Архив игр</h1>
    <!-- {{ arrayTeams }} -->
    <div class="" v-if="arrayTeams.length > 0" v-for="match in arrayArchiveMatches">
      <div class="team">
        <div style="width: 20%;">
          {{ GetCorrectDate(match.match_date) }}
        </div>
        <div style="width: 35%;">
          {{ GetNameTeams(match.first_team) }} :
          {{ GetNameTeams(match.second_team) }}
        </div>
        <div style="width: 20%;">
          {{ match.res_one }} :
          {{ match.res_two }}
          
        </div>
        <div>
          Победитель: <strong>{{ GetNameTeams(match.winner) }}</strong>
          <div v-if="match.penalty"> по серии пенальти</div>
        </div>
        <!-- <button @click="Delete(team.id)">Удалить команду</button> -->
      </div>
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
      arrayTeams: [],
      arrayArchiveMatches: [],
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
    async fetchArchive() {
      const response = await api.GetALLMathesFromArchive()
      const data = await response.json()
      console.log(data)
      this.arrayArchiveMatches = data
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
    this.fetchArchive()
  }
}

</script>
<style scoped>
.archive {
  text-align: center;
}

.team {
  background-color: #e1faef;
  margin: 10px auto;
  text-align: start;
  max-width: 900px;
  padding: 20px;
  display: flex;
  align-items: center;
}

.team:hover {
  background-color: #cafce6;
}
</style>