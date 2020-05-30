<template>
  <div style="background:#031148;height:10.8rem;">
    <div :class="bodyClass" style="overflow:hidden;">
      <div class="header-img"></div>
      <!--地图-->
      <!--      <map-view class="map-view"></map-view>-->
      <!--集团指标-->
      <group-index></group-index>
      <!--成本指标-->
      <cost-index class="cost-index"></cost-index>
      <!--中间总览悬浮框-->
      <overview-Box class="overview-Box"></overview-Box>
      <!--中间底部折线图-->
      <cost-index2 class="cost-index2"></cost-index2>
      <!--项目指标-->
      <project-index class="project-index"></project-index>
      <!--图例边框-->
      <!--      <Lengend class="legend-box"></Lengend>-->
    </div>
  </div>
</template>
<script>

  import {reset} from '@/utils/reset-bigscreen';

  export default {
    name: 'index',
    methods: {
      async allList() {
        //var a = await this.$http.get('/biz-program/programinfo/allList');
        //console.log(a);
      }
    },
    mounted() {
      reset();
      window.onresize = function () { // 定义窗口大小变更通知事件
        reset();
      }
      this.allList();
      document.getElementById("app").style.overflowX = "hidden";
      document.getElementById("app").style.height = "10.8rem";
    },
    components: {
      // MainMap: () => import('@/components/MainMap.vue'),
      GroupIndex: () => import('./groupIndex.vue'),
      CostIndex: () => import('./costIndex.vue'),
      CostIndex2: () => import('./costIndex2.vue'),
      OverviewBox: () => import('./overviewBox.vue'),
      ProjectIndex: () => import('./projectIndex.vue'),
      // Lengend: () => import('./legendBox.vue'),
      // MapView: () => import('./mapView.vue'),

      //RightContainer: () => import(/* webpackChunkName: "right-container" */ './rightContainer.vue'),
      //HeadContainer: () => import(/* webpackChunkName: "head-container" */ './headContainer.vue'),
    },
    computed: {
      bodyClass() {
        return {
          'h-home': true,
          'is-show-header': true,
        };
      },

    },
  }
</script>
<style scoped lang="scss">

  @import "../../style/pcmixin";
  @import "./font/font.css";

  .h-home {
    @include max-box;
    overflow: hidden;

    &.is-show-header {
      .m-header {
        display: block;
        @include transform(translateY(0%));
      }

      .m-container {
        top: rem(70);
      }

    }

    .m-header {
      display: none;
      position: absolute;
      z-index: 10;
      left: 0;
      top: 0;
      width: 100%;
      height: rem(70);
      box-shadow: 0px 0px 9px 0px rgba(19, 77, 176, 0.68);
      @include transform(translateY(-100%));
      @include transition(transform 0.5s);
    }

    .m-container {
      @include max-box;
      @include transition(top 0.5s);
      overflow: hidden;

      &.is-show-left {
        .m-main {
          left: rem(324);
        }

        .m-left {
          @include transform(translateX(0%));
        }

      }

      &.is-show-right {
        .m-main {
          right: rem(324);
        }

        .m-right {
          @include transform(translateX(0%));
        }

      }

      .m-main {
        background-color: rgba(153, 177, 207, 0.25);
        @include max-box;
        @include transition(left 0.5s, right 0.5s);
      }

      .m-left {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: rem(324);
        box-shadow: 0px 0px 16px 0px rgba(153, 177, 207, 0.25);
        background-color: #fff;
        z-index: 2;
        @include transform(translateX(-100%));
        @include transition(transform 0.5s);
      }

      .m-right {
        position: absolute;
        right: 0;
        top: 0;
        height: 100%;
        width: rem(324);
        background-color: #fff;
        box-shadow: 0px 0px 16px 0px rgba(153, 177, 207, 0.25);
        z-index: 2;
        @include transform(translateX(100%));
        @include transition(transform 0.5s);
      }

    }
  }
</style>
<style>

  .map-view {
    position: absolute;
    left: 20vw;
    z-index: 1;
  }

  .header-img {
    margin: 0 auto;
    background-image: url("./images/head.png");
    background-size: 12.78rem 1.7rem;
    width: 12.78rem;
    height: 1.7rem;
    background-repeat: no-repeat;
    position: relative;
    z-index: 1;
  }

  .cost-index {
    position: absolute;
    top: 6.7rem;
    z-index: 2;
  }

  .cost-index2 {
    position: absolute;
    top: 7.5rem;
    left: 5.52rem;
    z-index: 2;
  }

  .overview-Box {
    position: absolute;
    top: 1.3rem;
    left: 5.49rem;
    z-index: 20;
  }

  .project-index {
    position: absolute;
    left: 14.12rem;
    top: 0.03rem;
    z-index: 100;
  }

  .legend-box {
    position: absolute;
    left: 12.62rem;
    top: 5rem;
    z-index: 100;
    pointer-events: none;
  }

  .bounce-enter-active {
    animation: bounce-in .5s;
  }

  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }

    50% {
      transform: scale(1.5);
    }

    100% {
      transform: scale(1);
    }
  }
</style>

