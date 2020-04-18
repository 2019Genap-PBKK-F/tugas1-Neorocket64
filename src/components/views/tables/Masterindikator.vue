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
      axios.get('http://localhost:8024/api/masterindikator/').then(res => {
        console.log(res.data)
        var options = {
          // url: 'http://localhost:3000/masterindikator',
          data: res.data,
          onchange: this.changed,
          oninsertrow: this.insertrow,
          ondeleterow: this.deleterow,
          allowToolbar: true,
          responsive: true,
          columns: [
            { type: 'hidden', title: 'ID', width: '120px' },
            { type: 'dropdown', title: 'Penyebut', width: '120px', url: 'http://localhost:8024/api/datadasarname/', autocomplete: true },
            { type: 'dropdown', title: 'Pembilang', width: '120px', url: 'http://localhost:8024/api/datadasarname/', autocomplete: true },
            { type: 'text', title: 'Nama', width: '120px' },
            { type: 'text', title: 'Deskripsi', width: '170px' },
            { type: 'numeric', title: 'Default Bobot', width: '120px' },
            { type: 'text', title: 'Create Date', width: '120px', name: 'create_date' },
            { type: 'text', title: 'Last Update', width: '120px', name: 'last_update' },
            { type: 'text', title: 'Expired Date', width: '120px', name: 'expired_date' }
          ]
        }
        let spreadsheet = jexcel(this.$el, options)
        Object.assign(this, { spreadsheet })
      })
    },
    changed(instance, cell, columns, row, value) {
      axios.get('http://localhost:8024/api/masterindikator/').then(response => {
        var index = Object.values(response.data[row])
        index[columns] = value
        console.log('index selected: ' + index)
        axios
          .put('http://localhost:8024/api/masterindikator/' + index[0], {
            id: index[0],
            id_penyebut: index[1],
            id_pembilang: index[2],
            nama: index[3],
            deskripsi: index[4],
            default_bobot: index[5],
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
        url: 'http://localhost:8024/api/masterindikator/',
        data: {
          id_penyebut: 1,
          id_pembilang: 1,
          nama: '',
          deskripsi: '',
          default_bobot: 0.0,
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
      axios.get('http://localhost:8024/api/masterindikator/').then(response => {
        var index = Object.values(response.data[row])
        console.log('Index: ' + index)
        console.log('Deleting row: ' + row)
        axios.delete('http://localhost:8024/api/masterindikator/' + index[0])
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
