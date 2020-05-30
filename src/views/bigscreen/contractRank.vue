<template>
  <div>
    <div class="rank-name">
      {{list.name}}
    </div>

    <Digital-Animation :num="list.per" class="rank-per" symbol="%"
                       className="cost-index-symbol"></Digital-Animation>
    <div class="rank-data">
      <p class="exit">{{list.exis}}/</p>
      <p class="total">{{list.total}}</p>
    </div>
    <div class="rank-progress">
      <div class="rank-progress-empty"></div>

      <div class="rank-progress-fill" v-bind:style="{ width: width+'rem' }" v-show="show"></div>
    </div>
    <div class="rank-footer">
      <div v-for="data in list.data" :key="index">
        <div style="padding-left:0.15rem">
          <div style="text-align:center">
            {{data.value}}
          </div>
          <div
            style="text-align:center;letter-spacing:0.006rem;font-size:0.12rem;margin-top:0.08rem">
            {{data.name}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'contractRank',
    props: {
      list: {
        type: Object,
        default() {
          let data = {
            name: "A项目",
            agreement: "47份",
            population: "1200人",
            buildings: "75栋",
            households: "421户",
            per: "33",
            exis: "10000㎡",
            total: "30000㎡",
            data: [{
              name: "占地面积",
              value: "8500㎡/23000㎡"
            },
              {
                name: "签约协议",
                value: "47份"
              },
              {
                name: "安置人口",
                value: "1200人"
              },
              {
                name: "签约楼栋",
                value: "75栋"
              }
              ,
              {
                name: "签约户数",
                value: "421户"
              }]
          };
          return data;
        },
      },
    },
    components: {
      DigitalAnimation: () => import(/* webpackChunkName: "main-map" */ './digitalAnimation.vue'),
    },
    //计算宽度赋值给data
    methods: {
      progressInit: function () {
        var fill = this.list.per * 3.3 / 100;
        this.width = fill;
      }
    },
    computed: {},
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
        width: 0,
        show: false,
      };
    },
  };</script>
<style>
  .rank-name {
    font-family: PingFangSC-Semibold;
    font-size: 0.18rem;
    color: #00E8FF;
    line-height: 0.25rem;
    letter-spacing: 0;
    position: absolute;
    top: 0.81rem;
    left: 0.7rem;
  }

  .rank-per {
    font-family: Impact;
    font-size: 0.24rem;
    color: #FFFFFF;
    letter-spacing: 0;
    position: absolute;
    top: 0.7rem;
    left: 1.35rem;
  }

  .rank-data {
    background-image: url("./images/xmzb.png");
    background-size: 1.28rem 0.26rem;
    width: 1.28rem;
    height: 0.26rem;
    position: absolute;
    top: 0.71rem;
    left: 3.35rem;
    padding: 0.02rem 0.1rem 0.02rem 0.05rem;
    display: flex;
    justify-content: center;
  }

  .exit {
    font-family: DINAlternate-Bold;
    font-size: 0.12rem;
    color: #00E8FF;
    letter-spacing: 0.009rem;
    line-height: 0.21rem;
  }

  .total {
    font-family: DINAlternate-Bold;
    font-size: 0.08rem;
    color: #ddd;
    letter-spacing: 0.006rem;
    line-height: 0.21rem;
  }

  .rank-progress {
  }

  .rank-progress-empty {
    background: #335295;
    border-radius: 4.5px;
    border-radius: 4.5px;
    width: 3.3rem;
    height: 0.09rem;
    position: absolute;
    top: 1.03rem;
    left: 1.35rem;
  }

  .rank-progress-fill {
    background-image: linear-gradient(90deg, #26a2ff 0%, #01E5F6 100%);
    border-radius: 4.5px;
    border-radius: 4.5px;
    width: 0rem;
    height: 0.09rem;
    position: absolute;
    top: 1.03rem;
    left: 1.35rem;
    z-index: 100;
    transition: width 1.4s;
  }

  .rank-footer {
    font-family: DINAlternate-Bold;
    font-size: 0.14rem;
    color: #7E9DB9;
    letter-spacing: 0.007rem;
    position: absolute;
    top: 1.26rem;
    left: 0.68rem;
    display: flex;
  }

</style>
