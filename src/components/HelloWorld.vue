<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
    </p>
    <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    <hr />
    <el-button>123</el-button>
    <router-link to="/vuex">Go to vuex</router-link>
    <router-link to="/pug"><el-button>pug</el-button></router-link>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.test {
  font-size: 30px;
  color: blue;
}
</style>
