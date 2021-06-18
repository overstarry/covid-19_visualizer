<template>
  <div>
    <div class="rank-name" v-bind:style="{ color: color+'!important' }">
      {{list.name}}
    </div>
    <Digital-Animation :num="list.deadper" class="rank-per" symbol="%"
                       className="cost-index-symbol"></Digital-Animation>
    <div class="rank-data">
      <p class="exit" v-bind:style="{ color: color+'!important' }">{{list.deadcount}}/</p>
      <p class="total">{{list.deadtotal}}</p>
    </div>
    <div class="rank-progress">
      <div class="rank-progress-empty" v-bind:style="{ width: list.deadper*0.01*3.3+'rem'}"></div>
      <div class="rank-progress-fill"
      >

      </div>
    </div>
    <div class="rank-footer">
      <div v-for="(data,index) in list.data1" :key="index">
        <div style="padding-left:0.15rem;">
          <div :class="{footerright:index===1,footerleft:index===0}"
               style="text-align:center;letter-spacing:0.006rem;font-size:0.12rem;margin-top:0.08rem">
            {{data.name}} {{data.value}}
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'otherRank',
    props: {
      list: {
        type: Object,
        default() {
          let data = {
            name: "A国",
            per: 0,
            confirmedcount: "0",
            confirmedtotal: "0",
            data1: [{
              name: "确诊人数",
              value: "0"
            },
              {
                name: "治愈人数",
                value: "0"
              }]
          };
          return data;
        },
      },
      type: {
        type: String,
        default() {
          return "express";
        }
      }
    },
    //计算宽度赋值给data
    methods: {
      progressInit: function () {
        var fill = this.list.per * 3.3 / 100;
        this.width = fill;
      }
    },
    computed: {},
    components: {
      DigitalAnimation: () => import(/* webpackChunkName: "main-map" */ './digitalAnimation.vue'),
    },
    created() {
      if (this.type == "express") {
        this.color = "#1E8DFF";
        this.background = "linear-gradient(247deg,#1E8DFF  0%, #0a6fbb 100%)";
      } else {
        this.color = " #05B686";
        this.background = "linear-gradient(-69deg, #10CC88 0%, #0e3b43 100%)";
      }

    },
    mounted() {
      setTimeout(() => {
        this.progressInit();
      }, 100)
    },
    data() {
      return {
        width: 0,
        color: "",
        background: "",
      };
    },
  };</script>
<style>
  .footerright {
    margin-left: 1.1rem;
  }

  .footerleft {
    margin-left: 0.5rem;
  }
</style>
