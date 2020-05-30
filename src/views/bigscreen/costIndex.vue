<template>
  <div>
    <div class="title-box">
      <div class="title-icon"></div>
      <span class="title-name">成本指标</span>
    </div>
    <div class="cost-index-box">
      <div v-for="(data,i) in datas">
        <div class="cost-index-data">
          <div class="cost-index-name">
            {{data.name}}
          </div>
          <div class="cost-index-bar" :id="idList[i]">
          </div>
          <Digital-Animation :num="data.per" class="cost-index-per" symbol="%"
                             className="cost-index-symbol"></Digital-Animation>
          <div class="cost-index-num">
            <div style="display:inline-block">{{data.exist}}</div>
            <div style="display:inline-block;color: #96A0C5;letter-spacing: 0.4px;">
              /{{data.total}}{{data.unit}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import echarts from 'echarts'

  export default {
    name: 'costIndex',
    methods: {
      barInit() {
        for (var i = 0; i < this.datas.length; i++) {
          var list = [{value: this.datas[i].per}];
          var option = {
            xAxis: {
              max: 100,
              splitLine: {
                show: false
              },
              axisLine: {
                show: false
              },
              axisLabel: {
                show: false
              },
              axisTick: {
                show: false
              }
            },
            grid: {
              left: 0,
              top: 0,
              right: 0,
              bottom: 0
            },
            yAxis: [{
              type: 'category',
              inverse: false,
              data: list,
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                show: false
              }
            }],
            series: [{ //内
              type: 'bar',
              barWidth: 23,

              legendHoverLink: false,
              silent: true,
              itemStyle: {

                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 1,
                  y2: 0,
                  colorStops: [{
                    offset: 0,
                    color: '#0FD8D9' // 0% 处的颜色
                  }, {
                    offset: 1,
                    color: '#F86446' // 100% 处的颜色
                  }]
                }
              },
              data: list,
              z: 1,
              animationEasing: 'elasticOut'
            },
              {
                type: 'pictorialBar',
                animationDuration: 0,
                symbolRepeat: 'fixed',
                symbolMargin: 2.5,
                symbol: 'rect',
                symbolSize: [5, 23],
                symbolBoundingData: 100,
                itemStyle: {

                  normal: {
                    color: '#152a47'

                  }
                },
                data: [100],
                z: 0,
                animationEasing: 'elasticOut'
              },
              { //分隔
                type: 'pictorialBar',
                itemStyle: {
                  color: '#031148'
                },
                symbolRepeat: 'fixed',
                symbolMargin: 2.5,
                symbol: 'rect',
                symbolClip: true,
                symbolSize: [2, 26],
                symbolPosition: 'start',
                symbolOffset: [0, 0],
                symbolBoundingData: 100,
                data: list,
                z: 2,
                animationEasing: 'elasticOut'
              }
            ]
          };
          this.charts = echarts.init(document.getElementById(this.idList[i]));
          this.charts.setOption(option);
        }

      }
    },
    components: {
      DigitalAnimation: () => import(/* webpackChunkName: "main-map" */ './digitalAnimation.vue'),
    },
    computed: {},
    mounted() {
      this.barInit();
    },
    data() {
      return {
        datas: [
          {
            id: 0,
            name: "集团指标",
            per: "40",
            exist: 45,
            total: 100,
            unit: "亿"
          },
          {
            id: 1,
            name: "A",
            per: "45",
            exist: 45,
            total: 100,
            unit: "亿"
          },
          {
            id: 2,
            name: "A",
            per: "65",
            exist: 65,
            total: 100,
            unit: "亿"
          },
          {
            id: 3,
            name: "A",
            per: "35",
            exist: 35,
            total: 100,
            unit: "亿"
          },
          {
            id: 4,
            name: "A",
            per: "85",
            exist: 85,
            total: 100,
            unit: "亿"
          },
          {
            id: 5,
            name: "A",
            per: "100",
            exist: 100,
            total: 100,
            unit: "亿"
          }
        ],
        idList: ["projectA", "projectB", "projectC", "projectD", "projectE", "projectF"]
      };
    },
  };</script>
<style>

  .cost-index-box {
    background: rgba(16, 13, 66, 0.80);
    box-shadow: inset 0 0 20px 0 rgba(49, 214, 247, 0.87);
    width: 5.23rem;
    height: 3.21rem;
    position: relative;
    top: 0.8rem;
    left: 0.16rem;
    padding: 0.17rem 0 0.27rem 0.14rem;
    border-radius: 0.04rem;
    border-radius: 0.04rem;
  }

  .cost-index-data {
    display: flex;
    margin-bottom: 0.20rem;
  }

  .cost-index-name {
    line-height: 0.25rem;
    font-family: PingFangSC-Semibold;
    font-size: 0.18rem;
    color: #00E8FF;
    letter-spacing: 0;
    margin-right: 0.14rem;
    width: 0.72rem;
    text-align: center;
  }

  .cost-index-bar {
    height: 0.3rem;
    width: 2.46rem;
    /*background-image: linear-gradient(90deg, #0FD8D9 10%, #F86446 100%);*/
    border-radius: 0.04rem;
    border-radius: 0.04rem;
    margin-right: 0.07rem;
    /*border: 0.01rem solid #0D415E;*/
  }

  .cost-index-per {
    font-family: Impact;
    font-size: 0.24rem;
    color: #FFFFFF;
    letter-spacing: 0;
    line-height: 0.29rem;
    margin-right: 0.05rem;
    margin-left: 0.08rem;
    width: 0.45rem;
  }

  .cost-index-symbol {
    font-family: Impact;
    font-size: 0.14rem;
    color: #FFFFFF;
    letter-spacing: 0;
    line-height: 0.29rem;
  }

  .cost-index-num {
    background-image: url("./images/costIndex.png");
    background-repeat: no-repeat;
    background-size: 0.98rem 0.26rem;
    line-height: 0.26rem;
    width: 0.98rem;
    height: 0.26rem;
    font-family: PingFangSC-Semibold;
    font-size: 0.12rem;
    color: #0ADBDD;
    letter-spacing: 0.004rem;
    text-align: center;
  }
</style>
