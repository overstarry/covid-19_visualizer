<template>
  <div>
    <div class="title-box">
      <div class="title-icon"></div>
      <span class="title-name">集团指标</span>
    </div>
    <div class="group">

      <div v-for="(data,i) in datas">


        <div
          v-bind:class="{ groupindex: data.id==1,groupindex2: data.id==2,groupindex3: data.id==3,groupindex4: data.id==4,}">
          <div class="group-index-attribute">

            <p class="group-index-name">{{data.title}}</p>
            <div style="display:flex">
              <Digital-Animation :num="data.data" class="group-index-num"></Digital-Animation>
              <a class="group-index-company">{{data.unit}}</a>
            </div>
            <p class="group-index-total">{{data.des}}</p>
          </div>
          <div
            v-bind:class="{ grouppiefont1: data.id==1,grouppiefont2: data.id==2,grouppiefont3: data.id==3,grouppiefont4: data.id==4,}">
            <div>
              <span
                style="font-family: Impact;font-size: 0.28rem;color: #FFFFFF;letter-spacing: 0;">{{pieDatas[i].value}}</span>
              <span
                style="ont-family: HelveticaNeue;font-size: 0.11rem;color: #FFFFFF;letter-spacing: 0;">%</span>
            </div>
            <div
              style="font-family: PingFangSC-Regular;font-size: 0.11rem;color: #A6F0FE;letter-spacing: 0;">
              {{pieDatas[i].name}}
            </div>
          </div>
          <div
            v-bind:class="{ grouppie1: data.id==1,grouppie2: data.id==2,grouppie3: data.id==3,grouppie4: data.id==4,}"
            :id="data.name">


          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import echarts from 'echarts'

  export default {
    name: 'groupIndex',
    methods: {
      pieInit() {
        for (var i = 0; i < this.pieDatas.length; i++) {
          var option = {
            xAxis: {
              splitLine: {
                show: false
              },
              axisLabel: {
                show: false
              },
              axisLine: {
                show: false
              }
              // data: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
            },
            yAxis: {
              splitLine: {
                show: false
              },
              axisLabel: {
                show: false
              },
              axisLine: {
                show: false
              }
            },
            series: [
              // 进度圈
              {
                type: 'pie',
                silent: true,
                radius: ["81%", "90%"],
                center: ["69.5%", "47%"],
                data: [{
                  value: this.pieDatas[i].value,
                  itemStyle: {
                    normal: {
                      borderWidth: 5,
                      borderColor: {
                        colorStops: [{
                          offset: 0,
                          color: '#0A4E78' || '#00cefc' // 0% 处的颜色
                        }, {
                          offset: 1,
                          color: '#01E5F6' || '#367bec' // 100% 处的颜色
                        }]
                      },
                      color: { // 完成的圆环的颜色
                        colorStops: [{
                          offset: 0,
                          color: '#0A4E78' || '#00cefc' // 0% 处的颜色
                        }, {
                          offset: 1,
                          color: '#01E5F6' || '#367bec' // 100% 处的颜色
                        }]
                      },
                      label: {
                        show: false
                      },
                      labelLine: {
                        show: false
                      },
                    },
                  }
                },
                  {
                    name: 'gap',
                    value: 100 - this.pieDatas[i].value,
                    itemStyle: {
                      normal: {
                        label: {
                          show: false
                        },
                        labelLine: {
                          show: false
                        },
                        color: 'rgba(0, 0, 0, 0)',
                        borderColor: 'rgba(0, 0, 0, 0)',
                        borderWidth: 0,
                      }
                    },
                  }
                ]
              },

            ],
          };
          this.charts = echarts.init(document.getElementById(this.datas[i].name));
          this.charts.setOption(option);
        }
      },
      animationInit() {

      }
    },
    created() {
      this.animationInit();

    },
    components: {
      DigitalAnimation: () => import(/* webpackChunkName: "main-map" */ './digitalAnimation.vue'),
    },
    mounted() {
      this.show = true;
      this.pieInit();
    },
    data() {
      return {
        datas: [{
          id: 1,
          name: "Signing",
          title: "签约面积",
          data: 30000,
          unit: "㎡",
          des: "签约总面积:50000㎡"
        }, {
          id: 2,
          name: "express",
          title: "交房面积",
          data: 25000,
          unit: "㎡",
          des: "交房总面积:50000㎡"
        }, {
          id: 3,
          title: "拆除面积",
          name: "dismantle",

          data: 25000,
          unit: "㎡",
          des: "拆除总面积:50000㎡"
        }, {
          id: 4,
          name: "place",
          title: "安置面积",
          data: 25000,
          unit: "㎡",
          des: "安置总面积:50000㎡"
        }],
        pieDatas: [{name: "已签约", value: 30}, {name: "已交房", value: 50}, {
          name: "已签约",
          value: 29
        }, {name: "已交房", value: 36}],
        show: false
      };
    },
  };
</script>
<style>
  .title-box {
    background-image: linear-gradient(270deg, rgba(21, 33, 101, 0.00) 0%, rgba(0, 155, 243, 0.51) 97%);
    border-radius: 0.235rem;
    border-radius: 0.235rem;
    width: 4.36rem;
    height: 0.47rem;
    display: flex;
    position: absolute;
    top: 0.23rem;
    left: 0.16rem;
  }

  .title-icon {
    width: 0.06rem;
    height: 0.2rem;
    background: #0ADBDD;
    position: absolute;
    top: 0.1344rem;
    left: 0.1872rem;
  }

  .title-name {
    font-family: PangMenZhengDao;
    font-size: 0.24rem;
    color: #FFFFFF;
    letter-spacing: 0;
    position: absolute;
    top: 0.11516rem;
    left: 0.34rem;
  }

  .group {
    position: absolute;
    top: 0.8rem;
    left: 0.16rem;
    z-index: 2;
  }

  .groupindex {
    width: 5.07rem;
    height: 1.33rem;
    background-image: url('./images/qymj.png');
    background-size: 5.07rem 1.33rem;
    margin: 0.15rem 0 0 0;
    display: flex;
    border-radius: 0.04rem;
    border-radius: 0.04rem;
  }

  .groupindex2 {
    width: 4.64rem;
    height: 1.30rem;
    background-image: url('./images/jfmj.png');
    background-size: 4.64rem 1.30rem;
    margin: 0.15rem 0 0 0;
    display: flex;
    border-radius: 0.04rem;
    border-radius: 0.04rem;
  }

  .groupindex3 {
    width: 4.36rem;
    height: 1.33rem;
    background-image: url('./images/ccmj.png');
    background-size: 4.36rem 1.33rem;
    margin: 0.15rem 0 0 0;
    display: flex;
    border-radius: 0.04rem;
    border-radius: 0.04rem;
  }

  .groupindex4 {
    background-size: 4.68rem 1.30rem;
    width: 4.68rem;
    height: 1.30rem;
    background-image: url('./images/azmj.png');
    margin: 0.15rem 0 0 0;
    display: flex;
    border-radius: 0.04rem;
    border-radius: 0.04rem;
  }

  .group-index-attribute {
    flex-direction: column;
    position: relative;
    top: 0.19rem;
    left: 0.59rem;
  }

  .group-index-name {
    font-family: PingFangSC-Semibold;
    font-size: 0.16rem;
    line-height: 0.22rem;
    color: #00E8FF;
    letter-spacing: 0;
  }

  .group-index-num {
    font-family: Impact;
    font-size: 0.32rem;
    color: #FFFFFF;
    margin: 0.07rem 0 0 0;
  }

  .group-index-company {
    font-size: 0.05rem;
    color: #00E8FF;
    letter-spacing: 0;
    margin-left: 0.01rem;
    position: relative;
    top: 0.25rem;
  }

  .group-index-total {
    font-family: PingFangSC-Regular;
    font-size: 0.12rem;
    color: #96A0C5;
    margin-top: 0.15rem;
  }

  .group-index-pie {
    background-image: url("./images/pie2x.png");
    width: 1.578125rem;
    height: 0.63rem;
    padding-left: 0.8rem;
  }

  .grouppie1 {
    background-image: url("./images/pie.png");
    width: 3.03rem;
    height: 1.2rem;
    background-size: 3.03rem 1.2rem;
    position: absolute;
    left: 1.8rem;
    top: 0.25rem;
  }

  .grouppie2 {
    background-image: url("./images/pie.png");
    width: 3.03rem;
    height: 1.21rem;
    background-size: 3.03rem 1.21rem;
    position: absolute;
    left: 1.2rem;
    top: 1.67rem;
  }

  .grouppie3 {
    background-image: url("./images/pie.png");
    width: 3.03rem;
    height: 1.21rem;
    background-size: 3.03rem 1.21rem;
    position: absolute;
    left: 1.2rem;
    top: 3.15rem;
  }

  .grouppie4 {
    background-image: url("./images/pie3.png");
    width: 3.03rem;
    height: 1.21rem;
    background-size: 3.03rem 1.21rem;
    position: absolute;
    left: 1.6rem;
    top: 4.6rem;
  }

  .grouppiefont1 {
    position: absolute;
    left: 3.75rem;
    top: -0.05rem;
  }

  .grouppiefont2 {
    position: absolute;
    left: 3.15rem;
    top: 1.35rem;
  }

  .grouppiefont3 {
    position: absolute;
    left: 3.15rem;
    top: 2.85rem;
  }

  .grouppiefont4 {
    position: absolute;
    left: 3.55rem;
    top: 4.3rem;
  }
</style>
