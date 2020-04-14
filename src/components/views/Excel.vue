<template lang='html'>
  <div class='wrapper-jexcel'>
    <div id='spreadsheet' ref='spreadsheet'>
      <input class="btn-primary" type="button" value="Add new row" @click="() => spreadsheet.insertRow()" />
      <input class="btn-primary" type="button" value="Delete row" @click="() => spreadsheet.deleteRow()" />
    </div>
  </div>
</template>

<script>
import jexcel from 'jexcel' // eslint-disable-line no-unused-vars
import 'jexcel/dist/jexcel.css' // eslint-disable-line no-unused-vars
import axios from 'axios'

var temp = {}
var changed = function(instance, cell, x, y, value) {
  x = parseInt(x)
  y = parseInt(y)
  var datatemp = []
  console.log(datatemp)
  datatemp[0] = y + 1
  axios.get('http://localhost:8024/api/mahasiswa/' + datatemp[0]).then((response) => {
    console.log(response.data)
    datatemp = Object.values(response.data[0])
    datatemp[x] = value
    console.log(datatemp)
    axios({
      method: 'put',
      url: 'http://localhost:8024/api/mahasiswa/' + datatemp[0],
      data: {
        id: datatemp[0],
        nama: datatemp[1],
        nrp: datatemp[2],
        telp: datatemp[3]
      }
    }).then((response) => {
      console.log(response.data)
    })
  })
  this.load()
}

var insertrow = function(instance, id) {
  var x = parseInt(id) + 2
  console.log(x)
  axios({
    method: 'post',
    url: 'http://localhost:8024/api/mahasiswa/',
    data: {
      id: x,
      nama: '',
      nrp: 0,
      telp: 0
    }
  }).then((response) => {
    console.log(response.data)
  }).catch(err => {
    console.log(err)
  })
  this.load()
}
var deleterow = function(instance, id) {
  var tes
  axios({
    method: 'get',
    url: 'http://localhost:8024/api/mahasiswa/',
    data: {
    }
  }).then((response) => {
    tes = Object.keys(response.data[id]).map(function (key) {
      console.log(response.data[id])
      return response.data[id][key]
    })
    axios.delete('http://localhost:8024/api/mahasiswa/' + tes[0])
  })
  this.load()
}

export default {
  name: 'jexcel',
  mounted: function () {
    this.load()
  },
  methods: {
    load() {
      axios.get('http://localhost:8024/api/mahasiswa/').then(res => {
        temp = res.data
        console.log(temp)
        var options = {
          // url: 'http://localhost:3000/mahasiswa',
          data: temp,
          onchange: changed,
          oninsertrow: insertrow,
          ondeleterow: deleterow,
          allowToolbar: true,
          columns: [
            { type: 'hidden', title: 'ID', width: '120px', name: 'mhs_id' },
            { type: 'text', title: 'Nama', width: '120px', name: 'nama' },
            { type: 'numeric', title: 'NRP', width: '120px', name: 'nrp' },
            { type: 'numeric', title: 'No. Telpon', width: '120px', name: 'telp' }
          ]
        }
        let spreadsheet = jexcel(this.$el, options)
        Object.assign(this, { spreadsheet })
      })
    }
  }
}
</script>

<style lang='css' scoped>
.introduction { 
  font-size: 14px;
  padding: 0.5em;
  margin-bottom: 0.3em;
  color: gold;
  background: #111;
}
</style>
