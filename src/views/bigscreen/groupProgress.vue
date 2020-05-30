<template>
  <div class="group-ranking-progress">
    <p :class="{grouprankingfirst:index==0,grouprankingother:index!=0}">{{this.datas.rank}}</p>
    <div>
      <div class="group-rank-progress-empty"></div>
      <div :class="{groupfill:index==0,groupfill2:index!=0}" v-bind:style="{ width: width+'rem' }"
           v-show="show"></div>
    </div>

    <div :style="{ left: left + 'rem' }" class="group-rank-values">
      <div :class="{progressvalue:index==0,progressvalue1:index!=0}" style="display:flex;">
        <DigitalAnimation :num="this.datas.value" style="font-size:0.13rem"></DigitalAnimation>
        <div>
          {{this.datas.unit}}
        </div>
      </div>
    </div>

    <div class="group-rank-progress-footer">
      {{this.datas.name}}
    </div>

    <div style="display:flex;" class="group-rank-progress-per">
      <DigitalAnimation :num="this.datas.per"
                        style=" font-family: Impact;font-size: 0.16rem;color: #FFFFFF;text-align: left;"></DigitalAnimation>
      %
    </div>
  </div>
</template>
<script>
  export default {
    name: 'groupProgress',
    props: {
      datas: {
        type: Object,
        default() {
          var data = {rank: "第一名", name: "第三组", value: 2100, total: 10000, per: 21, unit: "㎡"};
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
        var fill = this.datas.per * 3.48 / 100;

        this.left += fill;
        this.width = fill;
      }
    },
    components: {
      DigitalAnimation: () => import(/* webpackChunkName: "main-map" */ './digitalAnimation.vue'),
    },
    created() {

    },
    mounted() {
      this.show = !this.show;
      setTimeout(() => {
        this.progressInit();
      }, 100)
    },
    data() {
      return {
        show: false,
        width: 0,
        left: 0.35
      };
    },
  };</script>
<style>
  .group-ranking-progress p {
    font-family: PingFangSC-Semibold;
    font-size: 0.14rem;
  }

  .grouprankingfirst {
    color: #FFA614;
  }

  .grouprankingother {
    color: #01BEE8;
  }

  .group-rank-progress {
    position: absolute;
    top: 0.44rem;
    left: 0.92rem;
    border-radius: 0.25rem;
    border-radius: 0.25rem;
  }

  .group-rank-progress-empty {
    position: absolute;
    width: 3.48rem;
    height: 0.1rem;
    background-color: #262458;
    left: 0.51rem;
    top: 0.01rem;
  }

  .groupfill {
    background-image: linear-gradient(270deg, #D99D3D 4%, #F86446 98%);
    width: 1.5rem;
    height: 0.1rem;
    position: absolute;
    left: 0.51rem;
    top: 0.01rem;
    z-index: 100;
    transition: width 1.4s;
  }

  .groupfill2 {
    background-image: linear-gradient(270deg, #00DAF3 4%, #0656BE 98%);
    width: 1.5rem;
    height: 0.1rem;
    position: absolute;
    left: 0.51rem;
    top: 0.01rem;
    z-index: 100;
    transition: width 1.4s;
  }

  .group-rank-progress-footer {
    font-family: PingFangSC-Regular;
    font-size: 0.12rem;
    color: #96A0C5;
    position: absolute;
    left: 0.52rem;
    width: 1rem;
    margin-top: 0.02rem;
  }

  .group-rank-progress-per {
    position: absolute;
    left: 4.2rem;
    top: 0rem;
    font-family: Impact;
    font-size: 0.16rem;
    color: #FFFFFF;
    text-align: left;
  }

  .progressvalue {
    color: #DC9A3E;
  }

  .progressvalue1 {
    color: #01BEE8;
  }

  .group-rank-values {
    font-family: Impact;
    font-size: 0.12rem;
    position: absolute;
    top: -0.15rem;
    transition: left 1.4s;
  }
</style>
