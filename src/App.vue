<template>
  <div id="app">
    <index></index>
  </div>
</template>

<script>
  import index from './views/bigscreen/index'

  export default {
    name: 'App',
    components: {
      index
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
