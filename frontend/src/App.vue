<template>
  <div class="d-flex">
    <img src="../football_icon.png" alt="" width="32"  height="32">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/teams">Команды</router-link>
      <router-link to="/rasp">Расписание матчей</router-link>
      <router-link to="/archive">Архив матчей</router-link>
    </nav>
  </div>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
}
.d-flex {
  margin: auto;
  display: flex;
  max-width: 900px;
  justify-content: center;
  align-items: center;
}
.d-flex img {
  flex-grow: 0;
  flex-shrink: 0;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  margin: 10px 15px;
  text-decoration: none;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
