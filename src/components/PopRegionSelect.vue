<template>
  <div v-if="visible" class="pop-region-select">1</div>
</template>

<script>
  export default {
    name: 'pop-details',
    data() {
      return {
        visible: false,
      };
    },
    methods: {
      open() {
        this.visible = true;
        this.$popBox(this, {placement: 4});
      },
      close() {
        this.$popBoxClose(this);
        this.visible = false;
      },
    },
  };
</script>

<style scoped>
</style>
