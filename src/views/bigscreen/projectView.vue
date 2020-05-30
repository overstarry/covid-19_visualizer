<template>
  <div>
    <!--签约面积-->
    <div class="project-view-title">
      {{title}}
    </div>
    <div class="project-view-content">
      <div class="project-view-content-title">
        {{signDatas[0].name}}:
        <DigitalAnimation :num="signDatas[0].value"></DigitalAnimation>
        {{signDatas[0].unit}}
      </div>
      <div class="project-view-content-description">
        {{signDatas[1].name}}:
        <DigitalAnimation :num="signDatas[1].value"></DigitalAnimation>
        {{signDatas[1].unit}}
      </div>
      <div class="project-view-content-footer">
        <div v-for="(data,i) in signFooterDatas">

          <div v-if="i===0">
            <div class="project-view-content-footer-name">
              {{data.name}}
            </div>
            <div class="project-view-content-footer-line">

            </div>
            <div class="project-view-content-footer-des">
              <DigitalAnimation :num="data.value"></DigitalAnimation>
              <p
                style="display:inline;font-family: PingFangSC-Semibold;font-size: 0.12rem;letter-spacing: 0.006rem;line-height: 0.24rem">
                {{data.unit}}</p>
            </div>
          </div>
          <div :class="{footerItem1:i===1,footerItem2:i===2}">
            <div class="project-view-content-footer-name">
              {{data.name}}
            </div>
            <div class="project-view-content-footer-line">

            </div>
            <div class="project-view-content-footer-des">
              <DigitalAnimation :num="data.value"></DigitalAnimation>
              <p
                style="display:inline;font-family: PingFangSC-Semibold;font-size: 0.12rem;letter-spacing: 0.006rem;line-height: 0.24rem">
                {{data.unit}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--指标-->
    <div class="project-view-index">
      <div class="project-view-index-title">
        项目指标
      </div>

      <div v-for="(progress,i) in progressDatas"
           :class="{projectprogress1:i===0,projectprogress2:i===1,projectprogress3:i===2}">
        <project-progress :datas="progress" :index="i"></project-progress>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'groupRanking',
    props: {
      title: {
        type: String,
        default() {
          return "湖里区XX旧村改造项目"
        }
      },
      signDatas: {
        type: Array,
        default() {
          let data = [{name: "总建筑面积", value: 50000, unit: "㎡"},
            {name: "项目地块", value: 6, unit: "个"},
          ];
          return data;
        }
      },
      signFooterDatas: {
        type: Array,
        default() {
          let data = [
            {name: "总占地面积", value: 44900, unit: "㎡"},
            {name: "总人口数", value: 5000, unit: "人"},
            {name: "总户籍数", value: 2890, unit: "户"}
          ];
          return data;
        }
      },
      progressDatas: {
        type: Array,
        default() {
          let data = [{
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
            }, {
              name: "签约楼栋",
              value: 75,
              unit: "栋"
            }]
          }, {
            title: "已交房",
            total: 5125,
            per: 25,
            footerDatas: [{
              name: "剩余交房",
              value: 14875,
              unit: "㎡"
            }, {
              name: "交房楼数",
              value: 39,
              unit: "栋"
            }
              , {
                name: "剩余楼栋",
                value: 111,
                unit: "栋"
              }]
          }, {
            title: "已拆除",
            total: 4200,
            per: 21,
            footerDatas: [{
              name: "剩余拆除",
              value: 15800,
              unit: "㎡"
            }, {
              name: "拆除楼数",
              value: 32,
              unit: "栋"
            }
              , {
                name: "剩余楼栋",
                value: 75,
                unit: "栋"
              }]
          }]
          return data;
        }
      }
    },
    methods: {},
    components: {
      DigitalAnimation: () => import(/* webpackChunkName: "main-map" */ './digitalAnimation.vue'),
      ProjectProgress: () => import(/* webpackChunkName: "main-map" */ './projectProgress.vue'),
    },
    created() {

    },
    mounted() {
    },
    data() {
      return {};
    },
  };</script>
<style>
  .project-view-title {
    opacity: 0.95;
    /*background: rgba(16,13,66,0.80);
    box-shadow: inset 0 0 20px 0 rgba(49,214,247,0.87);*/
    border-radius: 0.04rem;
    border-radius: 0.04rem;
    background-image: url("./images/project.png");
    background-size: 3.48rem 0.48rem;
    width: 3.48rem;
    height: 0.48rem;
    font-family: PangMenZhengDao;
    font-size: 0.28rem;
    color: #FFFFFF;
    letter-spacing: 0;
    text-align: center;
    line-height: 0.5rem;
    position: absolute;
    top: 0.56rem;
    left: 14.64rem;
  }

  .project-view-content {
    width: 5.23rem;
    height: 2.09rem;
    background-image: url("./images/zqymj.png");
    background-size: 5.23rem 2.09rem;
    position: absolute;
    top: 1.22rem;
    left: 13.77rem;
  }

  .project-view-content-title {
    font-family: PingFangSC-Semibold;
    font-size: 0.20rem;
    color: #FFFFFF;
    letter-spacing: 0.01rem;
    position: absolute;
    left: 0.34rem;
    top: 0.28rem;
    display: flex;
  }

  .project-view-content-description {
    font-family: PingFangSC-Regular;
    font-size: 0.12rem;
    color: #FFFFFF;
    letter-spacing: 0.006rem;
    position: absolute;
    left: 0.34rem;
    top: 0.6rem;
    display: flex;
  }

  .project-view-content-footer {
    background: #20285C;
    width: 4.56rem;
    height: 0.78rem;
    position: absolute;
    left: 0.34rem;
    top: 0.97rem;
    padding-left: 0.18rem;
  }

  .project-view-content-footer-name {
    font-family: PingFangSC-Regular;
    font-size: 0.12rem;
    color: #FFFFFF;
    letter-spacing: 0.006rem;
    line-height: 0.17rem;
    position: absolute;
    top: 0.12rem;
  }

  .project-view-content-footer-des {
    font-family: Impact;
    font-size: 0.20rem;
    color: #00E8FF;
    letter-spacing: 0.001rem;
    color: #00E8FF;
    line-height: 0.24rem;
    position: absolute;
    top: 0.41rem;
    display: flex;
  }

  .project-view-content-footer-line {
    background-image: linear-gradient(to right, #FFD2F9FF, #a6f0fe00);
    height: 0.01rem;
    width: 0.855rem;
    position: absolute;
    top: 0.325rem;
  }

  .footerItem1 {
    position: relative;
    left: 1.6rem;
  }

  .footerItem2 {
    position: relative;
    left: 3.2rem;
  }

  .project-view-index {
    background-image: url("./images/xmzb2.png");
    background-size: 5.19rem 3.93rem;
    width: 5.19rem;
    height: 3.93rem;
    position: absolute;
    top: 3.46rem;
    left: 13.81rem;
  }

  .project-view-index-title {
    font-family: PingFangSC-Medium;
    font-size: 0.20rem;
    color: #FFFFFF;
    letter-spacing: 0;
    position: absolute;
    top: 0.25rem;
    left: 0.34rem;
  }

  .projectprogress1 {
    position: absolute;
    left: 0.34rem;
    top: 0.73rem;
  }

  .projectprogress2 {
    position: absolute;
    left: 0.34rem;
    top: 1.7rem;
  }

  .projectprogress3 {
    position: absolute;
    left: 0.34rem;
    top: 2.69rem;
  }
</style>
