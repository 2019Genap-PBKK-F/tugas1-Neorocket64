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
      axios.get('http://localhost:8024/api/indikator_satuankerja_log/').then(res => {
        console.log(res.data)
        var options = {
          // url: 'http://localhost:3000/indikator_satuankerja_log',
          data: res.data,
          editable: false,
          columns: [
            { type: 'text', title: 'Periode', width: '120px', url: 'http://localhost:8024/api/periodename/' },
            { type: 'text', title: 'Indikator', width: '120px', url: 'http://localhost:8024/api/masterindikatorname/' },
            { type: 'text', title: 'Satuan Kerja', width: '120px', url: 'http://localhost:8024/api/satuankerjaname/' },
            { type: 'numeric', title: 'Capaian', width: '120px' },
            { type: 'text', title: 'Create Date', width: '120px' }
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
