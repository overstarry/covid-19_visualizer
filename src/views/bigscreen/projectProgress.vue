<template>
  <div class="project-progress">
    <div class="project-progress-title">
      {{datas.title}}
    </div>
    <div class="project-progress-num">
      <DigitalAnimation :num="datas.total"></DigitalAnimation>
      <div class="project-progress-unit">
        ㎡
      </div>
    </div>
    <div class="project-progress-per">
      <DigitalAnimation :num="datas.per"></DigitalAnimation>
      <div class="project-progress-unit2">
        %
      </div>
    </div>
    <div class="project-progress-empty"></div>
    <div class="project-progress-fill"
         :style="{ width: width+'rem',backgroundImage:background[index]}"></div>
    <div class="project-progress-footer">
      <div v-for="data in datas.footerDatas" class="project-progress-footerItem">
        <div style="line-height: 0.17rem;letter-spacing:0.01rem;">{{data.name}} :</div>
        <DigitalAnimation :num="data.value"
                          style="font-family: Impact;font-size: 0.14rem;color: #96A0C5;line-height: 0.17rem;margin-left:0.01rem;"></DigitalAnimation>
        <div style="line-height: 0.17rem;">{{data.unit}}</div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'projectProgress',
    props: {
      datas: {
        type: Object,
        default() {
          var data = {
            title: "已签约",
            total: 10000,
            per: 50,
            footerDatas: [{
              name: "签约占地",
              value: 7500,
              unit: "㎡"
            }, {
              name: "签约协议",
              value: 58,
              unit: "份"
            }
              , {
                name: "签约楼栋",
                value: 75,
                unit: "栋"
              }]
          };
          return data;
        }
      },
      index: {
        type: Number,
        default() {
          var data = "1";
          return data;
        }
      }
    },
    methods: {
      progressInit: function () {
        var fill = this.datas.per * 3.71 / 100;
        this.width = fill;
      }
    },
    computed: {},
    components: {
      DigitalAnimation: () => import(/* webpackChunkName: "main-map" */ './digitalAnimation.vue'),
    },
    created() {

    },
    mounted() {
      this.show = !this.show;
      setTimeout(() => {
        this.progressInit();
      }, 100);

    },
    data() {
      return {
        show: false,
        width: 0,
        background: ["linear-gradient(270deg, #D85946 0%, #100D43 95%)", "linear-gradient(270deg, #04BED6 3%, #0F0D42 100%)", " linear-gradient(270deg, #006BDD 0%, #0F0D42 93%)"]
      };
    },
  };</script>
<style>
  .project-progress-title {
    font-family: PingFangSC-Semibold;
    font-size: 0.14rem;
    color: #96A0C5;
    letter-spacing: 0;
  }

  .project-progress-num {
    font-family: PingFangSC-Regular;
    font-size: 0.18rem;
    color: #00E8FF;
    display: flex;
    margin: 0.03rem 0;
  }

  .project-progress-unit {
    font-family: PingFangSC-Regular;
    font-size: 0.11rem;
    line-height: 0.25rem;
    margin-left: 0.05rem;
  }

  .project-progress-unit2 {
    font-family: PingFangSC-Regular;
    font-size: 0.12rem;
    line-height: 0.22rem;
  }

  .project-progress-per {
    font-family: Impact;
    font-size: 0.18rem;
    color: #FFFFFF;
    display: flex;
    margin: 0.03rem;
    position: absolute;
    left: 0.87rem;
    top: -0.05rem;
  }

  .project-progress-empty {
    width: 3.71rem;
    height: 0.16rem;
    background: #262458;
    position: absolute;
    top: 0.18rem;
    left: 0.86rem;
  }

  .project-progress-fill {
    width: 3.71rem;
    height: 0.16rem;
    background: #262458;
    position: absolute;
    top: 0.18rem;
    left: 0.86rem;
    background-image: linear-gradient(270deg, #D85946 0%, #100D43 95%);
    transition: width 1.4s;
  }

  .project-progress-footer {
    display: flex;
    justify-content: space-between;
    width: 3.71rem;
    margin-left: 0.87rem;
  }

  .project-progress-footerItem {
    font-family: PingFangSC-Regular;
    font-size: 0.12rem;
    color: #96A0C5;
    display: flex;
  }
</style>
