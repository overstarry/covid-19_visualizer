<template>

  <div id="bullet"></div>

</template>
<script>

  import * as d3 from 'd3';
  import {bullet} from '../utils/bulleT.js'

  export default {
    name: '',
    props: {
      data: {
        value: Array,
        defalut() {
          return [{
            "ranges": [3502222213],
            "measures": [2722213450],
            "markers": [0]
          }];
        }
      }
    },
    methods: {
      draw() {
        const margin = {top: 5, right: 40, bottom: 20, left: 120},
          width = 260 - margin.left - margin.right,
          height = 40 - margin.top - margin.bottom;

        const chart = bullet()
          .width(width)
          .height(height);


        // eslint-disable-next-line no-unused-vars
        const svg = d3.select("#bullet").selectAll("svg")
          .data(this.data)
          .enter().append("svg")
          .attr("class", "bullet")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
          .call(chart);
      }
    },
    computed: {},
    created() {
    },
    mounted: function () {
      this.draw();

    },
    watch: {},

    data() {
      return {};
    },
  }
</script>
<style>
</style>
