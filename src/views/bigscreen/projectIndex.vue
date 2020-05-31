<template>
  <div>
    <div class="title-box2">
      <div class="title-icon2"></div>
      <span class="title-name2">确诊死亡排行</span>
    </div>
    <!--确诊排名-->
    <div class="project-index-box">
      <div class="project-index-title">确诊排名</div>
      <div v-for="(data,index) in contractDatas" :key="index">
        <contract-rank
          :class="{projectitem0:index===0,projectitem1:index===1,projectitem2:index===2}"
          :list="data"></contract-rank>
      </div>
      <!--死亡排名-->
      <div class="project-index-express">
        <div class="project-index-title2">死亡排名</div>
        <div v-for="(data,index) in contractDatas1" :key="index">
          <other-rank
            :class="{projectexpress0:index===0,projectexpress1:index===1,projectexpress2:index===2,projectexpress3:index===3}"
            :list="data" type="express"></other-rank>
        </div>
      </div>

    </div>
  </div>

</template>
<script>
  import * as d3 from "d3";

  export default {
    name: 'projectIndex',
    methods: {
      //排序函数
      compare(property) {
        return function (obj1, obj2) {
          var value1 = obj1[property];
          var value2 = obj2[property];
          return value2 - value1;     // 降序
        }
      }
    },
    components: {
      contractRank: () => import(/* webpackChunkName: "line-statistics" */ './contractRank.vue'),
      otherRank: () => import(/* webpackChunkName: "line-statistics" */ './otherRank.vue'),
    },
    computed: {},
    created() {
      d3.json("DXYArea.json").then((data) => {
        let temp2 = 0;
        let temp3 = 0;
        //let temp4 = 0;
        let dead_arr = []
        for (const datakey in data.results) {
          temp2 += data.results[datakey].confirmedCount;
          temp3 += data.results[datakey].deadCount;
          // temp4 += data.results[datakey].curedCount;

          dead_arr.push({
            "confirmedcount": data.results[datakey].confirmedCount,
            "name": data.results[datakey].countryName,
            "deadcount": data.results[datakey].deadCount,
            "confirmedCount": data.results[datakey].confirmedCount,
            "curedCount": data.results[datakey].curedCount
          })
        }
        for (let i = 0; i < dead_arr.length; i++) {
          dead_arr[i].deadper = (dead_arr[i].deadcount / temp3 * 100).toFixed(1)
          dead_arr[i].confirmedper = (dead_arr[i].confirmedCount / temp2 * 100).toFixed(1)
          dead_arr[i].confirmedtotal = temp2
          dead_arr[i].deadtotal = temp3
          dead_arr[i].data = [{
            name: "死亡人数",
            value: dead_arr[i].deadcount
          },
            {
              name: "治愈人数",
              value: dead_arr[i].curedCount
            }]
        }
        this.contractDatas.length = 0;
        dead_arr.sort(this.compare("confirmedCount")).slice(0, 3);
        this.contractDatas = dead_arr.slice(0, 3);
        this.contractDatas1.length = 0;
        window.console.log(this.contractDatas);

        this.contractDatas1 = dead_arr.sort(this.compare("deadcount")).slice(0, 3);
        for (let i = 0; i < this.contractDatas1.length; i++) {
          //  this.contractDatas1[i].data.length = 0;
          this.contractDatas1[i].data1 = [{
            name: "确诊人数",
            value: this.contractDatas1[i].confirmedCount
          },
            {
              name: "治愈人数",
              value: this.contractDatas1[i].curedCount
            }]
        }
      });

    },
    data() {
      return {
        contractDatas: [{
          name: "A国",
          per: 0,
          confirmedcount: "0",
          confirmedtotal: "0",
          data: [{
            name: "死亡人数",
            value: "0"
          },
            {
              name: "治愈人数",
              value: "0"
            }]
        }, {
          name: "A国",
          per: 32,
          confirmedcount: "8",
          confirmedtotal: "2",
          data: [{
            name: "死亡人数",
            value: "0"
          },
            {
              name: "治愈人数",
              value: "0"
            }]
        }, {
          name: "A国",
          per: 0,
          confirmedcount: "6",
          confirmedtotal: "2",
          data: [{
            name: "死亡人数",
            value: "0"
          },
            {
              name: "治愈人数",
              value: "0"
            }]
        }],
        contractDatas1: [{
          name: "A国",
          per: 0,
          confirmedcount: "0",
          confirmedtotal: "0",
          data: [{
            name: "确诊人数",
            value: "0"
          },
            {
              name: "治愈人数",
              value: "0"
            }]
        }, {
          name: "A国",
          per: 32,
          confirmedcount: "8",
          confirmedtotal: "2",
          data: [{
            name: "确诊人数",
            value: "0"
          },
            {
              name: "治愈人数",
              value: "0"
            }]
        }, {
          name: "A国",
          per: 0,
          confirmedcount: "6",
          confirmedtotal: "2",
          data: [{
            name: "确诊人数",
            value: "0"
          },
            {
              name: "治愈人数",
              value: "0"
            }]
        }]
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
