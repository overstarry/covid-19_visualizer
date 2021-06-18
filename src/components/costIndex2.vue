<template>
  <div class="cost-index2-view">
    <div class="cost-index2-item">
      <div id="contracted">
        <div class="cost-index2-title">福建省确诊人数变化</div>
        <line-statistics :height="3" :width="2.7"/>
      </div>
    </div>
    <div class="cost-index2-item">
      <div id="express">
        <div class="cost-index2-title">湖北省确诊人数变化</div>
        <line-statistics1 :height="3" :width="2.7"/>
      </div>
    </div>
    <div class="cost-index2-item">
      <div id="dismantle">
        <div class="cost-index2-title">福建省治愈人数变化</div>
        <line-statistics2 :height="3" :width="2.7"/>
      </div>
    </div>

  </div>
</template>
<script>
  export default {
    name: 'costIndex2',
    methods: {},
    components: {
      LineStatistics: () => import(/* webpackChunkName: "line-statistics" */ './LineStatistics.vue'),
      LineStatistics1: () => import(/* webpackChunkName: "line-statistics" */ './LineStatistics1.vue'),
      LineStatistics2: () => import(/* webpackChunkName: "line-statistics" */ './LineStatistics2.vue'),

    },
    computed: {},
    created() {
    },
    data() {
      return {
      };
    },
  };</script>
<style scoped>
  .cost-index2-view {
    width: 8.745rem;
    height: 3.21rem;
    display: flex;
    justify-content: center;
    padding-left: 20px;
    background-image: url("images/images/costindex2.png");
    background-size: 8.745rem 3.21rem;
  }

  .cost-index2-item {
    width: 33.3%;
  }

  .cost-index2-title {
    font-family: PingFangSC-Regular;
    font-size: 0.16rem;
    color: #FFFFFF;
    position: relative;
    top: 0.27rem;
    left: 0.67rem;
  }
</style>
