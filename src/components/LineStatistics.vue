<template>
  <div class="c-chart1" :class="id" :style="chartStyle">
    <div></div>
  </div>
</template>
<script>
  import {Line} from "../utils/line.js";
  import * as d3 from "d3";


  export default {
    name: '',
    data() {
      return {
        //生成一个随机的ID
        id: "main" + new Date().getMilliseconds() * Math.floor(Math.random() * 10000),

      }
    },
    props: {
      width: {
        type: Number,
        default: 0,
      },
      height: {
        type: Number,
        default: 300,
      }
    },
    computed: {
      chartStyle() {
        return {
          width: this.width ? `${this.width}rem` : '100%',
          height: `${this.height}rem`,
        };
      },
    },
    mounted() {
      this.chartInit();

    },
    created() {

    },
    methods: {
      chartInit() {
        let arr = [];
        let dataX = [];

        let series = [{
          name: '人数', data: arr
        }];
        d3.json("fjyf.json").then((data) => {
          for (const keys in data) {
            dataX.push(data[keys].key);
            arr.push(data[keys].value);
          }
          series[0].arr = arr;
          const line = new Line('.c-chart1');
          line
            .dataX(dataX)
            .series(series)
            .render()
        });

      }
    }
  };
</script>
<style lang="scss">


  .domain {
    stroke-width: 2;
    fill: none;
    opacity: 0;
    shape-rendering: crispEdges;

  }

  .tick text {
    font-size: 14px;
    color: #96A0C5;
  }

  .axes {
  }

  .grid-line {
    fill: none;
    stroke: #888;
    opacity: .4;
    shape-rendering: crispEdges;
  }

  .trans-line {
    fill: none;
    opacity: .4;
  }

  .line {
    fill: none;
    stroke: #0ADBDD;

    stroke-width: 2;
  }

  .dot {
    fill: #0ADBDD;
  }

  .tooltip {
    font-size: 15px;
    width: auto;
    padding: 10px;
    height: auto;
    position: absolute;
    background-color: #000000;
    opacity: .6;
    border-radius: 5px;
    color: #ffffff;
    display: none;
  }

</style>
