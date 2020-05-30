<template>
  <div>
    <div class="title-box" style="top:0rem;left:0rem">
      <div class="title-icon"></div>
      <span class="title-name">目标执行</span>
    </div>
    <div class="target-execution-box">
      <div class="lpie-title">
        {{datas[0].title}}
      </div>
      <div class="lpie-content">
        <div class="lpie-content-per">
          <DigitalAnimation :num="datas[0].per"></DigitalAnimation>
          <div
            style="font-family: PingFangSC-Medium;font-size: 0.14rem;letter-spacing: 0;position:relative;top:0.18rem;left:0.05rem">
            %
          </div>
        </div>
        <div class="lpie-content-completed">
          已完成:
          <DigitalAnimation :num="datas[0].completed"></DigitalAnimation>
          ㎡
        </div>
        <div class="lpie-content-target">
          目标:
          <DigitalAnimation :num="datas[0].target"></DigitalAnimation>
          ㎡
        </div>
      </div>
      <div class="rpie-title">
        {{datas[1].title}}
      </div>
      <div class="rpie-content">
        <div class="rpie-content-per">
          <DigitalAnimation :num="datas[1].per"></DigitalAnimation>
          <div
            style="font-family: PingFangSC-Medium;font-size: 0.14rem;letter-spacing: 0;position:relative;top:0.18rem;left:0.05rem">
            %
          </div>
        </div>
        <div class="rpie-content-completed">
          已完成:
          <DigitalAnimation :num="datas[1].completed"></DigitalAnimation>
          ㎡
        </div>
        <div class="rpie-content-target">
          目标:
          <DigitalAnimation :num="datas[1].target"></DigitalAnimation>
          ㎡
        </div>
      </div>
      <div class="target-execution-lpie" id="lpie"></div>
      <div class="target-execution-rpie" id="rpie"></div>
    </div>
  </div>
</template>
<script>
  import echarts from 'echarts'

  export default {
    name: 'targetExecution',
    props: {
      datas: {
        type: Array,
        default() {
          let data = [
            {title: "10月指标", per: 84, completed: "4200", target: "5000"}
            , {title: "年度指标", per: 30, completed: "10000", target: "20000"}];
          return data;
        }
      }
    },
    methods: {
      initPie() {

        this.charts = echarts.init(document.getElementById("lpie"));
        var item = {
          value: this.datas[0].per,
          max: 100
        };
        this.charts.setOption({
          series: [
            {
              name: ' ',
              type: 'pie',
              radius: ['58%', '75%'],
              center: ['50%', '67%'],
              startAngle: 225,
              color: [{
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 1,
                colorStops: [{
                  offset: 0,
                  color: "#0F0D41 " // 0% 处的颜色
                }, {
                  offset: 1,
                  color: "#00E8FF " // 100% 处的颜色
                }],
                globalCoord: false // 缺省为 false
              }, 'none'],
              hoverAnimation: false,
              legendHoverLink: false,
              z: 10,
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: [{
                value: 75 * item.value / 100
              }, {
                value: item.max - (75 * item.value / 100)
              }]
            },
            {
              name: '',
              type: 'pie',
              radius: ['58%', '75%'],
              center: ['50%', '67%'],
              startAngle: 225,
              color: ["#192a4a"],
              z: 9,
              hoverAnimation: false,
              legendHoverLink: false,
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: [{
                value: 75,
                itemStyle: {
                  normal: {
                    color: "#1B304C"
                  }
                }
              }, {
                value: 25
              }]
            }
          ],
        });

        var item2 = {
          value: this.datas[1].per,
          max: 100
        };
        this.charts2 = echarts.init(document.getElementById("rpie"));
        this.charts2.setOption({
          series: [
            {
              name: ' ',
              type: 'pie',
              radius: ['58%', '75%'],
              center: ['50%', '67%'],
              startAngle: 225,
              color: [{
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 1,
                colorStops: [{
                  offset: 0,
                  color: "#0F0D41 " // 0% 处的颜色
                }, {
                  offset: 1,
                  color: "#FFAD29  " // 100% 处的颜色
                }],
                globalCoord: false // 缺省为 false
              }, 'none'],
              hoverAnimation: false,
              legendHoverLink: false,
              z: 10,
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: [{
                value: 75 * item2.value / 100
              }, {
                value: item2.max - (75 * item2.value / 100)
              }]
            },
            {
              name: '',
              type: 'pie',
              radius: ['58%', '75%'],
              center: ['50%', '67%'],
              startAngle: 225,
              color: ["#262458"],
              z: 9,
              hoverAnimation: false,
              legendHoverLink: false,
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: [{
                value: 75,
                itemStyle: {
                  normal: {
                    color: "#1B304C"
                  }
                }
              }, {
                value: 25
              }]
            }
          ],
        });
      }
    },
    components: {
      DigitalAnimation: () => import(/* webpackChunkName: "main-map" */ './digitalAnimation.vue'),
    },
    computed: {},
    created() {

    },
    mounted() {
      this.initPie();
      this.show = !this.show;
    },
    data() {
      return {
        show: false
      };
    },
  };</script>
<style>
  .target-execution-box {
    width: 5.23rem;
    height: 2.49rem;
    background-image: url("./images/mbzx.png");
    background-size: 5.23rem 2.49rem;
    position: absolute;
    top: 0.56rem;
    display: flex;
  }

  .target-execution-lpie {
    width: 2.61rem;
    height: 2.39rem;
  }

  .target-execution-rpie {
    width: 2.61rem;
    height: 2.39rem;
  }

  .lpie-title {
    font-family: PingFangSC-Medium;
    font-size: 0.18rem;
    color: #FFFFFF;
    letter-spacing: 0;
    position: absolute;
    left: 0.9rem;
    top: 0.31rem;
  }

  .rpie-title {
    font-family: PingFangSC-Medium;
    font-size: 0.18rem;
    color: #FFFFFF;
    letter-spacing: 0;
    position: absolute;
    left: 3.5rem;
    top: 0.31rem;
  }

  .lpie-content-per {
    display: flex;
    font-family: Impact;
    font-size: 0.32rem;
    color: #FFFFFF;
    letter-spacing: 0;
    line-height: 0.39rem;
  }

  .lpie-content {
    position: absolute;
    top: 1.21rem;
    left: 1.01rem;
  }

  .lpie-content-completed {
    font-family: PingFangSC-Medium;
    font-size: 0.14rem;
    color: #3DCAE7;
    letter-spacing: 0;
    display: flex;
    margin: 0.07rem 0;
    position: relative;
    left: -0.15rem;
  }

  .lpie-content-target {
    font-family: PingFangSC-Regular;
    font-size: 0.12rem;
    color: #96A0C5;
    display: flex;
    position: relative;
    left: -0.08rem;
  }

  .rpie-content-per {
    display: flex;
    font-family: Impact;
    font-size: 0.32rem;
    color: #FFFFFF;
    letter-spacing: 0;
    line-height: 0.39rem;
  }

  .rpie-content {
    position: absolute;
    top: 1.21rem;
    left: 3.65rem;
  }

  .rpie-content-completed {
    font-family: PingFangSC-Medium;
    font-size: 0.14rem;
    color: #3DCAE7;
    letter-spacing: 0;
    margin: 0.07rem 0;
    display: flex;
    position: absolute;
    left: 3.38rem;
    position: relative;
    left: -0.15rem;
  }

  .rpie-content-target {
    font-family: PingFangSC-Regular;
    font-size: 0.12rem;
    color: #96A0C5;
    display: flex;
    position: relative;
    left: -0.08rem;
  }
</style>
