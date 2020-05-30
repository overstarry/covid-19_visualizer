<template>
  <div>
    <div class="title-box2">
      <div class="title-icon2"></div>
      <span class="title-name2">项目指标</span>
    </div>
    <!--签约排名-->
    <div class="project-index-box">
      <div class="project-index-title">签约排名</div>
      <div v-for="(data,index) in contractDatas">
        <contract-rank
          :class="{projectitem0:index===0,projectitem1:index===1,projectitem2:index===2}"
          :list="data"></contract-rank>
      </div>
      <!--交房排名-->
      <div class="project-index-express">
        <div class="project-index-title2">交房排名</div>
        <div v-for="(data,index) in expressDatas">
          <other-rank
            :class="{projectexpress0:index===0,projectexpress1:index===1,projectexpress2:index===2}"
            :list="data" type="express"></other-rank>
        </div>
      </div>
      <!--交房排名-->
      <div class="project-index-dismantle">
        <div class="project-index-title3">拆除排名</div>
        <other-rank :list="dismantleData" type="dismantle" class="projectdismantle"></other-rank>
      </div>
    </div>
  </div>

</template>
<script>
  export default {
    name: 'projectIndex',
    methods: {},
    components: {
      contractRank: () => import(/* webpackChunkName: "line-statistics" */ './contractRank.vue'),
      otherRank: () => import(/* webpackChunkName: "line-statistics" */ './otherRank.vue'),
    },
    computed: {},
    created() {

    },
    data() {
      return {
        contractDatas: [{
          name: "A项目",
          per: 33,
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
            },
            {
              name: "签约户数",
              value: "421户"
            }]
        }, {
          name: "B项目",
          per: 32,
          exis: "8000㎡",
          total: "25000㎡",
          data: [{
            name: "占地面积",
            value: "6800㎡/20000㎡"
          },
            {
              name: "签约协议",
              value: "47份"
            },
            {
              name: "安置人口",
              value: "1000人"
            },
            {
              name: "签约楼栋",
              value: "68栋"
            },
            {
              name: "签约户数",
              value: "292户"
            }]
        }, {
          name: "C项目",
          per: 27,
          exis: "6000㎡",
          total: "22000㎡",
          data: [{
            name: "占地面积",
            value: "5800㎡/15000㎡"
          },
            {
              name: "签约协议",
              value: "39份"
            },
            {
              name: "安置人口",
              value: "800人"
            },
            {
              name: "签约楼栋",
              value: "52栋"
            },
            {
              name: "签约户数",
              value: "212户"
            }]
        }],
        expressDatas: [{
          name: "A项目",
          per: 80,
          exis: "10000㎡",
          total: "30000㎡",
          data: [{
            name: "交房占地",
            value: "30000㎡"
          },
            {
              name: "交房楼栋",
              value: "22栋"
            }]
        }, {
          name: "B项目",
          per: 50,
          exis: "5000㎡",
          total: "10000㎡",
          data: [{
            name: "交房占地",
            value: "28000㎡"
          },
            {
              name: "交房楼栋",
              value: "15栋"
            }]
        }, {
          name: "C项目",
          per: 40,
          exis: "6000㎡",
          total: "15000㎡",
          data: [{
            name: "交房占地",
            value: "20000㎡"
          },
            {
              name: "交房楼栋",
              value: "12栋"
            }]
        }],
        dismantleData: {
          name: "A项目",
          per: 89,
          exis: "16000㎡",
          total: "18000㎡",
          data: [{
            name: "拆除占地",
            value: "23000㎡"
          },
            {
              name: "拆除楼栋",
              value: "68栋"
            }]

        }
      }
    },
  };</script>
<style>
  .title-box2 {
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

  .title-icon2 {
    width: 0.06rem;
    height: 0.2rem;
    background: #0ADBDD;
    position: absolute;
    top: 0.1344rem;
    left: 0.1872rem;
  }

  .title-name2 {
    font-family: PangMenZhengDao;
    font-size: 0.24rem;
    color: #FFFFFF;
    letter-spacing: 0;
    position: absolute;
    top: 0.11516rem;
    left: 0.34rem;
  }

  .project-index-box {
    background-image: url("./images/projectIndex.png");
    position: absolute;
    top: 0.85rem;
    width: 5rem;
    height: 9.81rem;
    background-repeat: no-repeat;
    background-size: 5rem 9.81rem;
  }

  /*签约排名*/
  .project-index-title {
    background-image: url('./images/xmzb.png');
    background-size: 1.02rem 0.4rem;
    width: 1.02rem;
    height: 0.4rem;
    position: relative;
    top: 0.2rem;
    left: 2.18rem;
    font-family: PingFangSC-Semibold;
    font-size: 0.18rem;
    color: #FFFFFF;
    letter-spacing: 0;
    text-align: center;
    line-height: 0.4rem;
  }

  /*交房排名*/
  .project-index-title2 {
    background-image: url('./images/xmzb.png');
    background-size: 1.02rem 0.4rem;
    width: 1.02rem;
    height: 0.4rem;
    position: absolute;
    top: 4.56rem;
    left: 2.18rem;
    font-family: PingFangSC-Semibold;
    font-size: 0.18rem;
    color: #FFFFFF;
    letter-spacing: 0;
    text-align: center;
    line-height: 0.4rem;
  }

  /*拆除排名*/
  .project-index-title3 {
    background-image: url('./images/xmzb.png');
    background-size: 1.02rem 0.4rem;
    width: 1.02rem;
    height: 0.4rem;
    position: absolute;
    top: 8.34rem;
    left: 2.18rem;
    font-family: PingFangSC-Semibold;
    font-size: 0.18rem;
    color: #FFFFFF;
    letter-spacing: 0;
    text-align: center;
    line-height: 0.4rem;
  }

  .projectitem1 {
    position: relative;
    top: 0.89rem;
  }

  .projectitem2 {
    position: relative;
    top: 2.17rem;
  }

  .projectexpress0 {
    position: relative;
    top: 3.92rem;
  }

  .projectexpress1 {
    position: relative;
    top: 5rem;
  }

  .projectexpress2 {
    position: relative;
    top: 6.1rem;
  }

  .projectdismantle {
    position: relative;
    top: 7.75rem;
  }
</style>
