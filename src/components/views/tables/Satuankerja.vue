<template lang='html'>
  <div class='wrapper-jexcel'>
    <div id='spreadsheet' ref='spreadsheet'>
      <input class='btn-primary' type='button' value='Add new row' @click='() => spreadsheet.insertRow()' />
      <input class='btn-primary' type='button' value='Delete row' @click='() => spreadsheet.deleteRow()' />
    </div>
  </div>
</template>

<script>
import jexcel from 'jexcel' // eslint-disable-line no-unused-vars
import 'jexcel/dist/jexcel.css' // eslint-disable-line no-unused-vars
import axios from 'axios'

export default {
//   name: 'jexcel',
  mounted() {
    this.load()
  },
  methods: {
    load() {
      axios.get('http://localhost:8024/api/satuankerja/').then(res => {
        console.log(res.data)
        var options = {
          // url: 'http://localhost:3000/satuankerja',
          data: res.data,
          onchange: this.changed,
          oninsertrow: this.insertrow,
          ondeleterow: this.deleterow,
          allowToolbar: true,
          responsive: true,
          columns: [
            { type: 'hidden', title: '#', width: '120px' },
            { type: 'text', title: 'ID', width: '120px', readOnly: true },
            { type: 'dropdown', title: 'Jenis', width: '120px', url: 'http://localhost:8024/api/jenissatkername/', autocomplete: true },
            { type: 'dropdown', title: 'Induk', width: '120px', url: 'http://localhost:8024/api/satuankerjaname/', autocomplete: true },
            { type: 'text', title: 'Nama', width: '120px' },
            { type: 'text', title: 'E-Mail', width: '120px' },
            { type: 'text', title: 'Create Date', width: '120px', name: 'create_date', readOnly: true },
            { type: 'text', title: 'Last Update', width: '120px', name: 'last_update', readOnly: true },
            { type: 'text', title: 'Expired Date', width: '120px', name: 'expired_date' }
          ]
        }
        let spreadsheet = jexcel(this.$el, options)
        Object.assign(this, { spreadsheet })
      })
    },
    changed(instance, cell, columns, row, value) {
      axios.get('http://localhost:8024/api/satuankerja/').then(response => {
        var index = Object.values(response.data[row])
        index[columns] = value
        console.log('index selected: ' + index)
        axios
          .put('http://localhost:8024/api/satuankerja/' + index[0], {
            id_jns_satker: index[2],
            id_induk_satker: index[3],
            nama: index[4],
            email: index[5],
            create_date: index[6],
            last_update: index[7],
            expired_date: index[8]
          })
          .then(response => {
            console.log(response.data)
          })
      })
    },
    insertrow(instance) {
      axios({
        method: 'post',
        url: 'http://localhost:8024/api/satuankerja/',
        data: {
          id_jns_satker: 1,
          id_induk_satker: 1,
          nama: '',
          email: '',
          create_date: '0000-00-00T00:00:00.000Z',
          last_update: '0000-00-00T00:00:00.000Z',
          expired_date: '0000-00-00T00:00:00.000Z'
        }
      })
        .then(response => {
          console.log(response.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleterow(instance, row) {
      axios.get('http://localhost:8024/api/satuankerja/').then(response => {
        var index = Object.values(response.data[row])
        console.log('Index: ' + index)
        console.log('Deleting row: ' + row)
        axios.delete('http://localhost:8024/api/satuankerja/' + index[0])
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
