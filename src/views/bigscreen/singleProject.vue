<template>
  <div style="background:#031148;height:10.85rem">
    <div class="header-img"></div>
    <!--ǩԼ����-->
    <contract-analysis class="contract-analysis"></contract-analysis>
    <!--С������-->
    <group-rank class="group-rank"></group-rank>
    <!--�м�����-->
    <suspension-box class="suspension-box"></suspension-box>
    <!--��ͼ-->
    <single-map class="single-map"></single-map>
    <!--��Ŀ-->
    <project-view class="project-view"></project-view>
    <!--Ŀ��ִ��-->
    <target-execution class="target-execution"></target-execution>
  </div>
</template>
<script>
  import {reset} from '@/utils/reset-bigscreen';

  export default {
    name: 'index',
    methods: {},
    mounted() {
      reset();

      document.getElementById("app").style.overflowX = "hidden";
      document.getElementById("app").style.height = "10.8rem";

      window.onresize = function () { // ���崰�ڴ�С���֪ͨ�¼�
        reset();
      }
    },
    components: {
      ContractAnalysis: () => import('./contractAnalysis.vue'),
      GroupRank: () => import('./groupRank.vue'),
      SuspensionBox: () => import('./suspensionBox.vue'),
      SingleMap: () => import('./singleMap.vue'),
      ProjectView: () => import('./projectView.vue'),
      TargetExecution: () => import('./targetExecution.vue'),
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
  @import "./font/font.css";
</style>
<style>
  .title-box {
    background-image: linear-gradient(270deg, rgba(21, 33, 101, 0.00) 0%, rgba(0, 155, 243, 0.51) 97%);
    border-radius: 0.235rem;
    border-radius: 0.235rem;
    width: 4.36rem;
    height: 0.47rem;
    display: flex;
    position: absolute;
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

  .header-img {
    margin: 0 auto;
    background-image: url("./images/head.png");
    background-size: 12.78rem 1.7rem;
    width: 12.78rem;
    height: 1.7rem;
    background-repeat: no-repeat;
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

  .contract-analysis {
    position: absolute;
    left: 0.26rem;
    top: 0.46rem;
  }

  .group-rank {
    position: absolute;
    top: 7.02rem;
    left: 0.2rem;
  }

  .suspension-box {
    position: absolute;
    top: 1.12rem;
    left: 6.05rem;
  }

  .single-map {
    position: absolute;
    top: 2.3rem;
    left: 5.71rem;
  }

  .target-execution {
    position: absolute;
    top: 7.61rem;
    left: 13.78rem;
  }
</style>

