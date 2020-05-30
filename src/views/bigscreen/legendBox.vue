<template>
  <div>
    <transition name="bounce">
      <div class="lengend-box-content" v-show="show">

        <div v-for="(data,i) in datas">
          <div style="display:flex;margin-bottom:0.08rem">
            <div :style="gardenStyle[i]"></div>
            <div style="margin:0.03rem 0.02rem;">{{data.name}}({{data.count}})</div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  export default {
    name: 'legendBox',
    props: {
      datas: {
        type: Array,
        default() {
          let datas = [{color: "#167cf6", name: "数据摸底", count: 2}, {
            color: "#dd0608",
            name: "商谈签约",
            count: 2
          }, {color: "#ff7c00", name: "工程拆除", count: 2}, {
            color: "#0adbdd",
            name: "安置交房",
            count: 2
          }];
          return datas;
        }
      }
    },
    //计算宽度赋值给data
    methods: {
      showBox() {
        this.show = true;
      }
    },
    computed: {},
    created() {

    },
    mounted() {
      this.showBox();
    },
    data() {
      return {
        gardenStyle: [{
          margin: "0.05rem 0.03rem",
          backgroundColor: "#167cf6",
          height: "0.1rem",
          width: "0.1rem",
          borderRadius: "50%"
        }, {
          margin: "0.05rem 0.03rem",
          backgroundColor: "#dd0608",
          height: "0.1rem",
          width: "0.1rem",
          borderRadius: "50%"
        },
          {
            margin: "0.05rem 0.03rem",
            backgroundColor: "#ff7c00",
            height: "0.1rem",
            width: "0.1rem",
            borderRadius: "50%"
          }, {
            margin: "0.05rem 0.03rem",
            backgroundColor: "#0adbdd",
            height: "0.1rem",
            width: "0.1rem",
            borderRadius: "50%"
          }],
        show: false,

      };
    },
  };</script>
<style>
  .lengend-box-content {
    background-image: url('./images/lengendBox.png');
    background-size: 1.28rem 1.35rem;
    width: 1.28rem;
    height: 1.35rem;
    text-align: center;
    font-size: 0.13rem;
    padding: 0.17rem 0.13rem;
    color: #ddd;
    letter-spacing: 0.01rem;

  }


</style>
