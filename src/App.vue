<template>
  <div id="app">
    <index></index>
  </div>
</template>

<script>
  import index from './views/bigscreen/index'
  //import d3d from './components/d3demo.vue'

  export default {
    name: 'App',
    data() {
      return {}
    },
    components: {
      index
    },
    methods: {
      show: function () {
      }
    }
  }
</script>

<style lang="scss">
  #app {
    z-index: 1;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
  }
</style>
