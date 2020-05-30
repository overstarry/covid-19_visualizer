<template>
  <div>
    <div class="title-box" style="top:0rem;left:0rem">
      <div class="title-icon"></div>
      <span class="title-name">小组排名</span>
    </div>
    <div class="group-rank-content">
      <div v-for="(data, i) in datas">
        <div
          :class="{grouprankitem0:i===0,grouprankitem1:i===1,grouprankitem2:i===2,grouprankitem3:i===3,grouprankitem4:i===4}">
          <group-progress :datas="data" :index="i"></group-progress>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'projectBox',
    props: {
      datas: {
        type: Array,
        default() {
          let datas = [{rank: "第一名", name: "第三组", value: 2100, total: 10000, per: 21, unit: "㎡"},
            {rank: "第二名", name: "第一组", value: 1100, total: 10000, per: 11, unit: "㎡"},
            {rank: "第三名", name: "第二组", value: 1200, total: 10000, per: 12, unit: "㎡"},
            {rank: "第四名", name: "第五组", value: 900, total: 10000, per: 9, unit: "㎡"},
            {rank: "第五名", name: "第四组", value: 700, total: 10000, per: 7, unit: "㎡"},
          ];
          return datas;
        }
      }
    },
    methods: {},
    components: {
      groupProgress: () => import('./groupProgress.vue'),
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
  .group-rank-content {
    background-image: url("./images/xzpm.png");
    background-size: 5.2rem 3.07rem;
    width: 5.2rem;
    height: 3.07rem;
    position: absolute;
    top: 0.58rem;
    padding-top: 0.084rem;
  }

  .grouprankitem0 {
    position: absolute;
    left: 0.4rem;
    top: 0.384rem;
  }

  .grouprankitem1 {
    position: absolute;
    left: 0.4rem;
    top: 0.884rem;
  }

  .grouprankitem2 {
    position: absolute;
    left: 0.4rem;
    top: 1.38rem;
  }

  .grouprankitem3 {
    position: absolute;
    left: 0.4rem;
    top: 1.88rem;
  }

  .grouprankitem4 {
    position: absolute;
    left: 0.4rem;
    top: 2.39rem;
  }


</style>
