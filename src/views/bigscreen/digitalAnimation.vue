<template>

  <p>{{ animatedNumber }}<span :class="className">{{symbol}}</span></p>

</template>
<script>
  import TweenLite from 'gsap'

  export default {
    name: 'digitalAnimation',
    props: {
      num: {
        value: Number,
        default() {
          return 100;
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
      animatedNumber: function () {
        return this.tweenedNumber.toFixed(0);
      }
    },
    created() {

    },
    mounted: function () {
      this.number = this.num;
    },
    watch: {
      number: function (newValue) {
        TweenLite.to(this.$data, 1.5, {tweenedNumber: newValue});
      }
    },

    data() {
      return {
        number: 0,
        tweenedNumber: 0
      };
    },
  }
</script>
<style>
</style>
