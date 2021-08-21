<template>
  <div>
    <h1>List of Finnish VTubers</h1>

    <!-- <table class="table table-no-borders">
      <thead>
        <tr>
          <th></th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ft in finntubers" :key="ft.name">
          <td class="table-td">
            <b>
              <a href="{{ ft.channel }}">{{ ft.name }}</a>
            </b>
          </td>
          <td class="table-td">{{ ft.type }}</td>
          <td>{{ ft.short_description }}</td>
        </tr>
      </tbody>
    </table> -->
    <ul id="list-finntubers" class="">
      <li v-for="ft in finntubers" :key="ft.name">
        <b>
          <a href="{{ ft.channel }}">{{ ft.name }}</a>
        </b>
      </li>
    </ul>
  </div>
</template>

<script>
import * as db from "../../db.json";

export default {
  name: "Finntubers",
  props: {
    finntubers: db,
  },
};
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
  list-style: none;
  margin: 0 10px;
  padding: 0;
  float: inline-start;
  text-align: center;
}
li:after {
  content: "\A";
  white-space: pre;
}
a {
  color: #42b983;
  text-decoration: none;
}
.table-no-borders {
  border-collapse: collapse;
}
.table-td {
  text-align: left;
}
#div {
  display: flex;
  justify-content: center;
}
.table {
  align-self: center;
}
</style>