<template>
  <div>
    <div class="title-box">
      <div class="title-icon"></div>
      <span class="title-name">人数占比</span>
    </div>
    <div class="group">

      <div v-for="(data,i) in datas" :key="i">

        <el-tooltip class="item" effect="dark" :content="data.des" placement="left">
          <div
            v-bind:class="{ groupindex: data.id==5,groupindex2: data.id==6,groupindex3: data.id==7,groupindex4: data.id==8,}">
            <div class="group-index-attribute">

              <p class="group-index-name">{{data.title}}</p>
              <div style="display:flex">
                <Digital-Animation :num="data.count" class="group-index-num"></Digital-Animation>
              </div>
              <p class="group-index-total">{{data.des}}</p>
            </div>
            <div
              v-bind:class="{ grouppiefont1: data.id==5,grouppiefont2: data.id==6,grouppiefont3: data.id==7,grouppiefont4: data.id==8,}">
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
              v-bind:class="{ grouppie1: data.id==5,grouppie2: data.id==6,grouppie3: data.id==7,grouppie4: data.id==8,}"
              :id="data.name">
            </div>
          </div>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>
<script>
  import * as d3 from 'd3';

  export default {
    name: 'groupIndex',
    methods: {

      //还不太会弄甜甜圈图
      drawPie() {
        // set the dimensions and margins of the graph
        const width = 320;
        const height = 360;
        const margin = 34;

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
        const radius = Math.min(width, height) / 2 - margin

// append the svg object to the div called 'my_dataviz'
        const svg = d3.select("#my_dataviz")
          .append("svg")
          .attr("width", width)
          .attr("height", height)
          .append("g")
          .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// Create dummy data
        // const data = {a: 9, b: 52}
        const pieDatas = {
          "现存确诊": 30, "累计确诊": 150,
          "累计死亡": 29
          , "累计治愈": 236
        };
// set the color scale
        const color = d3.scaleOrdinal()
          .domain(pieDatas)
          .range(["#98abc5", "#8a89a6"])

// Compute the position of each group on the pie:
        const pie = d3.pie()
          .value(function (d) {
            return d.value;
          })
        const data_ready = pie(d3.entries(pieDatas))

// Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
        svg
          .selectAll('whatever')
          .data(data_ready)
          .enter()
          .append('path')
          .attr('d', d3.arc()
            .innerRadius(100)         // This is the size of the donut hole
            .outerRadius(radius)
          )
          .attr('fill', function (d) {
            return (color(d.data.key))
          })
          .attr("stroke", "black")
          .style("stroke-width", "2px")
          .style("opacity", 0.7)
      },

    },
    created() {
      d3.json("DXYArea.json").then((data) => {
        let temp1 = this.datas[0].count;
        let temp2 = this.datas[1].count;
        let temp3 = this.datas[2].count;
        let temp4 = this.datas[3].count;
        //this.datas.splice(0, 4);
        for (const datakey in data.results) {
          temp1 += data.results[datakey].currentConfirmedCount;
          temp2 += data.results[datakey].confirmedCount;
          temp3 += data.results[datakey].deadCount;
          temp4 += data.results[datakey].curedCount;
        }
        this.datas.splice(0, 4);
        this.pieDatas.splice(0, 4);
        this.pieDatas.push(
          {name: "现存确诊", value: (temp1 / temp2 * 100).toFixed(1)}
        )
        this.pieDatas.push(
          {name: "累计确诊", value: 100}
        )
        this.pieDatas.push(
          {name: "累计死亡", value: (temp3 / temp2 * 100).toFixed(1)}
        )
        this.pieDatas.push(
          {name: "累计治愈", value: (temp4 / temp2 * 100).toFixed(1)}
        )
        //set不懂为什么不生效
        this.datas.push({
          id: 5,
          name: "Signing",
          title: "现存确诊",
          count: temp1,
          des: "现存确诊" + temp1
        });
        this.datas.push({
          id: 6,
          title: "累计确诊",
          name: "express",
          count: temp2,
          des: "累计确诊人数:" + temp2
        })
        this.datas.push({
          id: 7,
          title: "累计死亡",
          name: "dismantle",
          count: temp3,
          des: "累计死亡人数" + temp3
        })
        this.datas.push({
          id: 8,
          name: "place",
          title: "累计治愈",
          count: temp4,
          des: "累计治愈人数" + temp4
        })

      });

    },
    components: {
      DigitalAnimation: () => import(/* webpackChunkName: "main-map" */ './digitalAnimation.vue'),
    },
    mounted() {
      this.show = true;
    },
    data() {
      return {
        datas: [{
          id: 1,
          name: "Signing",
          title: "现存确诊",
          count: 0,
          des: "现存确诊" + 0
        }, {
          id: 2,
          title: "累计确诊",
          name: "express",
          count: 0,
          des: "累计确诊人数:" + 0
        }, {
          id: 3,
          title: "累计死亡",
          name: "dismantle",
          count: 0,
          des: "累计死亡人数" + 0
        }, {
          id: 4,
          name: "place",
          title: "累计治愈",
          count: 0,
          des: "累计治愈人数" + 0
        }],
        pieDatas: [{name: "现存确诊", value: 30}, {name: "累计确诊", value: 150}, {
          name: "累计死亡",
          value: 29
        }, {name: "累计治愈", value: 236}],
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
