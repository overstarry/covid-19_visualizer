<template>

  <p>{{ num }}<span :class="className">{{symbol}}</span></p>

</template>
<script>
  import TweenLite from 'gsap'

  export default {
    name: 'digitalAnimation',
    props: {
      num: {
        value: Number,
        default() {
          return 0;
        },
      },
      symbol: {
        value: String,
        default() {
          return "";
        }
      },
      className: {
        value: String,
        defalut() {
          return "";
        }
      }
    },
    methods: {},
    computed: {
    },
    created() {
    },
    mounted: function () {

    },
    watch: {
      num: function (newValue) {
        TweenLite.to(this.$data, 1.5, {tweenedNumber: newValue});
      }
    },

    data() {
      return {
      };
    },
  }
</script>
<style>
</style>
