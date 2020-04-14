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
      axios.get('http://localhost:8024/api/unit/').then(res => {
        console.log(res.data)
        var options = {
          // url: 'http://localhost:3000/unit',
          data: res.data,
          onchange: this.changed,
          oninsertrow: this.insertrow,
          ondeleterow: this.deleterow,
          allowToolbar: true,
          responsive: true,
          columns: [
            { type: 'hidden', title: 'ID', width: '120px' },
            { type: 'dropdown', title: 'Kategori', width: '120px', url: 'http://localhost:8024/api/kategoriunit/', autocomplete: true },
            { type: 'text', title: 'Nama', width: '120px' }
          ]
        }
        let spreadsheet = jexcel(this.$el, options)
        Object.assign(this, { spreadsheet })
      })
    },
    changed(instance, cell, columns, row, value) {
      axios.get('http://localhost:8024/api/unit/').then(response => {
        var index = Object.values(response.data[row])
        index[columns] = value
        console.log('index selected: ' + index)
        axios
          .put('http://localhost:8024/api/unit/' + index[0], {
            id: index[0],
            kategoriunit_id: index[1],
            nama: index[2]
          })
          .then(response => {
            console.log(response.data)
          })
      })
    },
    insertrow(instance) {
      axios({
        method: 'post',
        url: 'http://localhost:8024/api/unit/',
        data: {
          kategoriunit_id: 1,
          nama: ''
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
      axios.get('http://localhost:8024/api/unit/').then(response => {
        var index = Object.values(response.data[row])
        console.log('Index: ' + index)
        console.log('Deleting row: ' + row)
        axios.delete('http://localhost:8024/api/unit/' + index[0])
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
