<template lang='html'>
  <div class='wrapper-jexcel'>
    <div id='spreadsheet' ref='spreadsheet'>
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
      axios.get('http://localhost:8024/api/indikator_satuankerja/').then(res => {
        console.log(res.data)
        var options = {
          // url: 'http://localhost:3000/indikator_satuankerja',
          data: res.data,
          onchange: this.changed,
          oninsertrow: this.insertrow,
          ondeleterow: this.deleterow,
          allowToolbar: true,
          responsive: true,
          allowInsertRow: false,
          allowManualInsertRow: false,
          columns: [
            { type: 'dropdown', title: 'Periode', width: '120px', url: 'http://localhost:8024/api/periodename/', autocomplete: true },
            { type: 'dropdown', title: 'Indikator', width: '120px', url: 'http://localhost:8024/api/masterindikatorname/', autocomplete: true },
            { type: 'dropdown', title: 'Satuan Kerja', width: '120px', url: 'http://localhost:8024/api/satuankerjaid/', autocomplete: true },
            { type: 'numeric', title: 'Bobot', width: '120px' },
            { type: 'numeric', title: 'Target', width: '120px' },
            { type: 'numeric', title: 'Capaian', width: '120px' },
            { type: 'text', title: 'Last Update', width: '120px' }
          ]
        }
        let spreadsheet = jexcel(this.$el, options)
        Object.assign(this, { spreadsheet })
      })
    },
    changed(instance, cell, columns, row, value) {
      axios.get('http://localhost:8024/api/indikator_satuankerja/').then(response => {
        var old = Object.values(response.data[row])
        var index = Object.values(response.data[row])
        index[columns] = value
        console.log('old: ' + old[0] + ' ' + old[1] + ' ' + old[2])
        console.log('new: ' + index[0] + ' ' + index[1] + ' ' + index[2])
        axios.put('http://localhost:8024/api/indikator_satuankerja/' + old[0] + '&' + old[1] + '&' + old[2], {
          id_periode: index[0],
          id_master: index[1],
          id_satker: index[2],
          bobot: index[3],
          target: index[4],
          capaian: index[5],
          last_update: index[6],
        })
          .then(response => {
            console.log(response.data)
          })
          .catch(err => {
            console.log(err)
          })
      })
    },
    insertrow(instance) {
      axios({
        method: 'post',
        url: 'http://localhost:8024/api/indikator_satuankerja/',
        data: {
          waktu: '0000-00-00T00:00:00.000Z',
          capaian: 0.0
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
      axios.get('http://localhost:8024/api/indikator_satuankerja/').then(response => {
        var index = Object.values(response.data[row])
        console.log('Index: ' + index)
        console.log('Deleting row: ' + row)
        axios.delete('http://localhost:8024/api/indikator_satuankerja/' + index[0] + '&' + index[1] + '&' + index[2])
        .catch(err => {
          console.log(err)
        })
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
