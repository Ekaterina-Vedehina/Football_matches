<template>
  <div class="home">
    Это прототип приложения ведущего учёт футбольных матчей.
    С его помощью можно:
    <ul>
      <li>Добавлять новые команды и редактировать существующие;</li>
      <li>Добавлять в расписание новые матчи;</li>
      <li>
        <router-link to="/rasp" style="text-decoration: none;">
          ПРОВОДИТЬ
        </router-link>
        &#8194;матчи.</li>
    </ul>
  </div>
</template>

<script>


export default {
  name: 'HomeView',
  components: {

  }
}
</script>
<style scope>
.home {
  max-width: 700px;
  margin: 10px auto;
}
</style>
