<template>
  <div>
    <div class="title-box" style="top:0rem;left:0rem">
      <div class="title-icon"></div>
      <p
        style="font-family: PingFangSC-Medium;font-size: 0.20rem;color: #FFFFFF;letter-spacing: 0;position:absolute;top:0.8rem;left:0.32rem;z-index:1000">
        各地块占比情况</p>
      <span class="title-name">签约分析</span>
    </div>
    <div class="contract-analysis-content">
      <div id="pieAnalysis"></div>
      <div id="lineAnalysis"></div>
      <div class="pie-lenged">
        <div v-for="(pie,i) in pieDatas">
          <div style="display:flex;margin-bottom:0.03rem">
            <div :style="gardenStyle[i]"></div>
            <div style="margin:0.03rem 0.05rem;">{{pie.name}}</div>
            <DigitalAnimation style="margin:0.03rem 0.05rem;" :num="pie.value"></DigitalAnimation>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

  import echarts from 'echarts'

  export default {
    name: 'contractAnalysis',
    props: {
      pieDatas: {
        type: Array,
        default() {
          let Datas = [{value: 3200, name: 'A地块'},
            {value: 200, name: 'B地块'},
            {value: 1562, name: 'C地块'},
            {value: 1821, name: 'D地块'},
            {value: 1254, name: 'E地块'},
            {value: 1254, name: 'F地块'}]
          return Datas;
        }
      }
    },
    methods: {
      pieInit() {
        var font = document.body.clientWidth / 1980 * 12;
        var color = this.color;
        this.charts = echarts.init(document.getElementById("pieAnalysis"));
        this.charts.setOption({
          color: color,
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          series: [
            {
              name: '各地块占比情况',
              type: 'pie',
              radius: ['30%', '55%'],
              center: ['29%', '52%'],
              label: {
                normal: {
                  show: true,
                  formatter: '{b}\n{d}%  ',
                  color: "white",
                  align: 'left',
                  verticalAlign: "middle",
                  fontSize: font
                },
              },
              data: this.pieDatas
            }
          ],
        });
        // 默认高亮
        let index = 0; // 高亮索引
        this.charts.dispatchAction({
          type: "highlight",
          seriesIndex: index,
          dataIndex: index
        });
      },
      lineInit() {
        var linecharts = echarts.init(document.getElementById("lineAnalysis"));
        linecharts.setOption({
          xAxis: {
            type: 'category',
            boundaryGap: false,
            axisLabel: {
              interval: 0,
              fontSize: '12'
            },
            data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12(月份)'],
            axisLine: {
              lineStyle: {
                color: "#96A0C5",
              },
            },
            splitLine: {
              show: false,
              lineStyle: {
                type: 'dashed',

              },
            },
          },
          yAxis: {
            type: 'value',
            name: '(㎡)',
            axisTick: {
              show: false
            },
            axisLine: {
              show: false,
              fontSize: '12',
              lineStyle: {
                color: "#96A0C5",
              },
            },
            splitLine: {
              show: false,
              lineStyle: {
                type: 'dashed',
                color: ['#cccccc4d']
              },
            },
          },
          series: [{
            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
            type: 'line',
            smooth: true,
            color: "#00E8FF",
            symbol: 'none',
            itemStyle: {
              color: 'rgba(14,156,255,1)',
              normal: {
                lineStyle: {
                  width: 2,
                  type: 'solid',
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#2ff5fa'
                  }, {
                    offset: 1,
                    color: '#0b7aa0'
                  }]),//线条渐变色
                }
              },
            },
          }, {
            name: '蒸发量',
            type: 'bar',
            barGap: '-100%',
            barCategoryGap: '60%',
            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    {offset: 0, color: '#2ff5fa'},
                    {offset: 1, color: '#0b7aa0'}
                  ]
                )
              },

            },
          }],
          grid: {
            left: '12%',
            top: '10%',
            bottom: '27%',
            right: '10%'
          },
        });
      }
    },
    computed: {},
    components: {
      DigitalAnimation: () => import(/* webpackChunkName: "main-map" */ './digitalAnimation.vue'),
    },
    created() {

    },
    mounted() {
      this.pieInit();
      this.lineInit();
    },
    data() {
      return {
        gardenStyle: [{
          margin: "0.05rem 0.03rem",
          backgroundColor: '#0561c0',
          height: "0.1rem",
          width: "0.1rem",
          borderRadius: "50%"
        }, {
          margin: "0.05rem 0.03rem",
          backgroundColor: '#03cee3',
          height: "0.1rem",
          width: "0.1rem",
          borderRadius: "50%"
        },
          {
            margin: "0.05rem 0.03rem",
            backgroundColor: '#c839ff',
            height: "0.1rem",
            width: "0.1rem",
            borderRadius: "50%"
          }, {
            margin: "0.05rem 0.03rem",
            backgroundColor: '#d93d5d',
            height: "0.1rem",
            width: "0.1rem",
            borderRadius: "50%"
          },
          {
            margin: "0.05rem 0.03rem",
            backgroundColor: '#ff9b39',
            height: "0.1rem",
            width: "0.1rem",
            borderRadius: "50%"
          }, {
            margin: "0.05rem 0.03rem",
            backgroundColor: '#3de57d',
            height: "0.1rem",
            width: "0.1rem",
            borderRadius: "50%"
          }],
        color: ['#0561c0', '#03cee3', '#c839ff', '#d93d5d', '#ff9b39', '#3de57d'],
      };
    },
  };</script>
<style>
  .contract-analysis-content {
    background-image: url("./images/zbqk.png");
    width: 5.19rem;
    height: 5.73rem;
    background-size: 5.19rem 5.73rem;
    position: absolute;
    top: 0.57rem;
    z-index: 100;
  }

  #pieAnalysis {
    height: 2.5rem;
    width: 5.19rem;
    position: absolute;
    top: 0.5rem;
  }

  #lineAnalysis {
    height: 2.96rem;
    width: 5.19rem;
    position: absolute;
    top: 3.06rem;
  }

  .pie-lenged {
    position: absolute;
    width: 1.2rem;
    height: 1.58rem;
    top: 1rem;
    left: 3.32rem;
    background-image: url('./images/pie-lenged.png');
    background-size: 1.2rem 1.58rem;
    font-size: 0.12rem;
    color: #ffff;
    text-align: left;
    line-height: 0.14rem;
    padding-left: 0.13rem;
    padding-top: 0.11rem;
  }
</style>
