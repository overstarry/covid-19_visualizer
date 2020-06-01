<template>
  <div class="c-chart1" :class="id" :style="chartStyle">
    <!--<v-chart :options="polar" />-->
    <div></div>
  </div>
</template>
<script>
  import {Line} from "../../utils/line.js";


  export default {
    name: '',
    data() {
      return {
        //生成一个随机的ID
        id: "main" + new Date().getMilliseconds() * Math.floor(Math.random() * 10000)
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
      },
      list: {
        type: Array,
        default() {
          let data = [];
          const names = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

          for (let i = 0; i < names.length; i++) {
            data.push({
              name: names[i],
              value: Math.random() * 100,
            });
          }
          return data;
        },
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

        const dataX = ['1月', '2月', '3月', '4月', '5月', '6月'];
        const series = [
          {name: '死亡人数', data: [1640, 1864, 1802, 1868, 2580, 2660]}];
        const line = new Line('.c-chart1');
        line
          .dataX(dataX)
          .series(series)
          .render()
      }
    }
  };
</script>
<style lang="scss">

  /*.c-chart {*/
  /*  .echarts {*/
  /*    width: 100%;*/
  /*    height: 100%;*/
  /*  }*/
  /*}*/
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
