<template lang="html">
  <div class="wrapper-jexcel">
    <div class="introduction"><span>This is a list of my cars</span></div>
    <input
      type="button"
      value="Add new row"
      @click="jExcelObj.insertRow()"
    /><br />
    <div id="spreadsheet" ref="spreadsheet"></div>
  </div>
</template>

<script>
import jexcelStyle from 'jexcel/dist/jexcel.css' // eslint-disable-line no-unused-vars
import jexcel from 'jexcel' // eslint-disable-line no-unused-vars

export default {
  name: 'jexcel',
  data() {
    return {
      myCars: [
        [
          'Jazz',
          'Honda',
          '2019-02-12',
          imageExample,
          true,
          '$ 2.000,00',
          '#777700'
        ],
        ['Civic', 'Honda', '2018-07-11', '', true, '$ 4.000,01', '#007777'],
        ['Z4', 'BMW', '2017-11-24', '', false, '$ 324.072,58', '#700d0d'],
        [
          'Boxter S',
          'Porshe',
          '2019-08-24',
          '',
          true,
          '$ 307.839,45',
          '#0e0438'
        ]
      ]
    }
  },
  computed: {
    jExcelOptions() {
      return {
        data: this.myCars,
        columns: [
          { type: 'text', title: 'Car', width: '120px' },
          {
            type: 'dropdown',
            title: 'Make',
            width: '250px',
            source: ['Alfa Romeo', 'Audi', 'BMW', 'Honda', 'Porshe']
          },
          { type: 'calendar', title: 'Available', width: '250px' },
          { type: 'image', title: 'Photo', width: '120px' },
          { type: 'checkbox', title: 'Stock', width: '80px' },
          {
            type: 'numeric',
            title: 'Price',
            width: '120px',
            mask: '$ #.##,00',
            decimal: ','
          },
          { type: 'color', width: '100px', render: 'square' }
        ]
      }
    }
  },
  methods: {
    insertRowc() {
      console.log(this)
      // this.spreadsheet.insertRow()
    }
  },
  mounted: function() {
    // console.log(this.jExcelOptions)
    // console.log(this.$refs['spreadsheet'])
    const jExcelObj = jexcel(this.$refs['spreadsheet'], this.jExcelOptions)
    // Object.assign(this, jExcelObj) // pollutes component instance
    Object.assign(this, { jExcelObj }) // tucks all methods under jExcelObj object in component instance
    // console.log(this.jExcelObj)
  }
}

const imageExample =
  'https://is5-ssl.mzstatic.com/image/thumb/Purple113/v4/3c/07/52/3c075237-d3cb-afed-fadb-4421ec3955a2/source/256x256bb.jpg'
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
