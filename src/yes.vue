<template>
    <div id="formadd">
      <form ref = "form">
        <select v-model="selected_datadasar" name="datadasar" id="datadasar" class="form-control">
          <option v-for="datadasar in datadasardata" :key="datadasar.id" :value="datadasar.id">{{ datadasar.name }}</option>
        </select>
        <select v-model="selected_unit" name="unit" id="unit" class="form-control">
          <option v-for="unit in unit_data" :key="unit.id" :value="unit.id">{{ unit.name }}</option>
        </select>
        <input type="text" v-model="input_time" name="waktu" id="waktu">
        <input type="number" v-model="input_capaian" name="capaian" id="capaian">
        <a href="#" v-on:click="submit">Add new row</a>
      </form>
  </div>
</template>

<script>
import Vue from 'vue'

var yes = new Vue({
  // el: '#formadd',
  mounted() {
    this.load()
  },
  data: {
    unit_data: [],
    datadasardata: [],
    select_unit: 0,
    select_datadasar: 0,
    input_time: '',
    input_capaian: 0
  },
  methods: {
    load() {
      axios.get('http://localhost:8024/api/datadasar/').then(response => {
        // console.log(response.data)
        this.datadasardata = Object.values(response.data)
      })
      axios.get('http://localhost:8024/api/unitname/').then(response => {
        // console.log(response.data)
        this.datadasardata = Object.values(response.data)
      })
    },
    submit: function(event) {
      axios({
        method: 'post',
        url: 'http://localhost:8024/api/datadasar/',
        data: {
          datadasar_id: this.datadasardata,
          unit_id: this.unit_data,
          waktu: this.input_time,
          capaian: this.input_capaian
        }
      })
        .then(response => {
          console.log(response.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
})
export default {
    mounted() {
    this.load()
    yes.load()
  }
}
</script>