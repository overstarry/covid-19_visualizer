<template>
  <div class="cost-index2-view">
    <div class="cost-index2-item">
      <div id="contracted">
        <div class="cost-index2-title">签约面积</div>
        <line-statistics2 :list="contracted" :height="3" :width="2.7"/>
      </div>
    </div>
    <div class="cost-index2-item">
      <div id="express">
        <div class="cost-index2-title">交房面积</div>
        <line-statistics2 :list="contracted" :height="3" :width="2.7"/>
      </div>
    </div>
    <div class="cost-index2-item">
      <div id="dismantle">
        <div class="cost-index2-title">拆除面积</div>
        <line-statistics2 :list="contracted" :height="3" :width="2.7"/>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'costIndex2',
    methods: {},
    components: {
      LineStatistics2: () => import(/* webpackChunkName: "line-statistics" */ './LineStatistics2.vue'),
    },
    computed: {},
    created() {
      var data = [];
      for (var i = 1; i <= 12; i++) {
        data.push({
          name: i,
          value: Math.floor(Math.random() * 100000),
        });
      }
      this.contracted = data;
    },
    data() {
      return {
        contracted: []
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
    background-image: url("./images/costindex2.png");
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
    top: 0.17rem;
    left: 1rem;
  }
</style>
