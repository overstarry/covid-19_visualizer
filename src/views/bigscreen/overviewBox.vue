<template>
  <div class="overiew-view">

    <div v-for="(data) in datas" :key="data.id">
      <transition name="bounce">
        <div v-if="show">
          <div v-if="data.id===1">
            <div class="overiew-box-first">
              <div class="overiew-box-data">
                <div class="overiew-box-data-num">
                  <Digital-Animation :num="data.count"></Digital-Animation>
                  <p
                    style="font-family: PingFangSC-Semibold;font-size: 0.12rem;color: #00E8FF;letter-spacing: 0.006rem;display:inline-block;">
                    {{data.unit}}</p>
                </div>
                <div class="overiew-box-data-des">
                  {{data.des}}
                </div>
              </div>
            </div>
          </div>
          <div v-if="data.id!=1">
            <div class="overiew-box">
              <div class="overiew-box-data">
                <div class="overiew-box-data-num">
                  <Digital-Animation :num="data.count"></Digital-Animation>
                  <p
                    style="font-family: PingFangSC-Semibold;font-size: 0.12rem;color: #00E8FF;letter-spacing: 0.006rem;display:inline-block;">
                    {{data.unit}}</p>
                </div>
                <div class="overiew-box-data-des">
                  {{data.des}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'overviewBox',
    methods: {},
    components: {
      DigitalAnimation: () => import(/* webpackChunkName: "main-map" */ './digitalAnimation.vue'),

    },
    computed: {},
    created() {

    },
    mounted() {
      this.show = !this.show;
    },
    data() {
      return {
        datas: [{
          id: 1,
          count: 719000,
          unit: "㎡",
          des: "总建筑面积"
        }, {
          id: 2,
          count: 13800,
          unit: "㎡",
          des: "总占地面积"
        }, {
          id: 3,
          count: 8000,
          unit: "人",
          des: "总安置人口"
        },{
          id: 4,
          count: 719000,
          unit: "㎡",
          des: "总建筑面积"
        }, {
          id: 5,
          count: 13800,
          unit: "㎡",
          des: "总占地面积"
        }, {
          id: 6,
          count: 8000,
          unit: "人",
          des: "总安置人口"
        }],
        show: false
      };
    },
  };</script>
<style scoped lang="scss">


  .overiew-view {
    display: flex;
    z-index: 20;
  }

  .overiew-box-first {
    background-image: url("./images/overviewbox.png");
    width: 1.41rem;
    height: 1.06rem;
    background-size: 1.41rem 1.06rem;
    background-repeat: no-repeat;
  }

  .overiew-box {
    background-image: url("./images/overviewbox.png");
    width: 1.41rem;
    height: 1.06rem;
    background-size: 1.41rem 1.06rem;
    background-repeat: no-repeat;
    margin-left: 0.32rem;
  }

  .overiew-box-data {
    text-align: center;
    position: relative;
    top: -0.55rem;
  }

  .overiew-box-data-num {
    position: relative;
    top: 0.03rem;
  }

  p:first-child {
    font-family: Impact;
    font-size: 0.24rem;
    color: #00E8FF;
    letter-spacing: 0.012rem;
    display: inline-block;
  }

  .overiew-box-data-des {
    font-family: PingFangSC-Regular;
    font-size: 0.14rem;
    color: #FFFFFF;
    letter-spacing: 0.007px;
  }
</style>
