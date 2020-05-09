<template>
    <div>The component will appear here</div>
</template>

<script>
import axios from 'axios'
var host = 'http://localhost:8024'
import WebDataRocks from 'webdatarocks'

export default {
  mounted: function() {
    axios.get(host + '/api/penelitian/').then(res => {
      this.webdatarocks = new WebDataRocks({
        report: {
          options: {
            grid: {
              type: 'flat',
              showTotals: false,
              showGrandTotals: false
            }
          },
          data: res.data
        },
        container: this.$el
      })
    })
  },
  beforeUpdate() {
    return false
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '~webdatarocks/webdatarocks.min.css';
</style>
