<template>
  <div class="home">
    Это прототип приложения ведущего учёт футбольных матчей.
    С его помощью можно:
    <ul>
      <li>Добавлять новые команды и редактироать существующие</li>
      <li>Добавлять в расписание новые матчи</li>
      <li>и наконец ПРОВОДИТЬ матчи самим</li>
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
