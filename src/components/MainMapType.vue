<template>
  <div :class="className">
    <el-radio-group v-model="radio.value" v-on:change="change">
      <el-radio-button :label="item.key" :key="index" v-for="(item,index) in mconfig.maps">
        <i :class="item.className"></i><span>{{item.name}}</span>
      </el-radio-button>
    </el-radio-group>
  </div>
</template>
<script>
  import {RadioGroup, RadioButton} from 'element-ui';
  import {isMobile} from '@/utils/get-client-type';

  const components = {};
  components[RadioGroup.name] = RadioGroup;
  components[RadioButton.name] = RadioButton;
  export default {
    name: 'MainMapType',
    data() {
      return {
        radio: {
          value: 'cad',
        },
      };
    },
    methods: {
      change: function () {
        this.$emit('changeBaseMap', this.radio.value);
      },
    },
    computed: {
      className() {
        return {
          'map-type': true,
          'isMobile': isMobile,
        };
      },
    },
    components,
  };
</script>
<style scoped lang="scss">
  @import "../style/pcmixin";

  .map-type {
    position: absolute;
    z-index: 1000;
    right: rem(20);
    top: rem(18);
  }
</style>
<style lang="scss">
  @import "../style/pcmixin";

  .map-type {
    .el-radio-group {
      display: block;

      .el-radio-button__inner {
        padding-left: rem(46);
      }

      .el-radio-button {
        &.is-active {
          .icon-cad {
            background-image: url("./images/icon-map-type-cad-select.png");
          }

          .icon-two-dimension {
            background-image: url("./images/icon-map-type-two-dimension-select.png");
          }

          .icon-three-dimension {
            background-image: url("./images/icon-map-type-three-dimension-select.png");
          }

        }

        .icon-cad,
        .icon-two-dimension,
        .icon-three-dimension {
          display: inline-block;
          width: rem(20);
          height: rem(20);
          background-size: contain;
          background-position: center center;
          background-repeat: no-repeat;
          position: absolute;
          left: rem(20);
          top: 50%;
          margin-top: rem(-10);
        }

        .icon-cad {
          background-image: url("./images/icon-map-type-cad.png");
        }

        .icon-two-dimension {
          background-image: url("./images/icon-map-type-two-dimension.png");
        }

        .icon-three-dimension {
          background-image: url("./images/icon-map-type-three-dimension.png");
        }

      }
    }
  }
</style>
<style lang="scss">
  @import "../style/mixin";

  .map-type {
    &.isMobile {
      right: rem(29);
      top: auto;
      bottom: rem(42);

      .el-radio-group {
        display: block;
        @include clearfix;

        .el-radio-button__inner {
          padding: 0;
          border: 0;
          box-shadow: none !important;
          background: none !important;

          span {
            display: none;
          }
        }

        .el-radio-button {
          display: block;
          float: left;
          margin-left: rem(26);

          &.is-active {
            background: none;

            .icon-cad {
              background-image: url("./images/icon-map-type-cad-select.svg");
            }

            .icon-two-dimension {
              background-image: url("./images/icon-map-type-two-dimension-select.svg");
            }

            .icon-three-dimension {
              background-image: url("./images/icon-map-type-three-dimension-select.svg");
            }

          }

          .icon-cad,
          .icon-two-dimension,
          .icon-three-dimension {
            box-shadow: 0px 1px 5px 0px rgba(68, 91, 131, 0.33);
            border-radius: rem(12);
            display: block;
            width: rem(162);
            height: rem(162);
            background-size: 100% 100%;
            background-position: center center;
            background-repeat: no-repeat;
            background-color: transparent !important;
            position: relative;
            left: auto;
            top: auto;
          }

          .icon-cad {
            background-image: url("./images/icon-map-type-cad.svg");
          }

          .icon-two-dimension {
            background-image: url("./images/icon-map-type-two-dimension.svg");
            background-size: rem(170) 100%;
          }

          .icon-three-dimension {
            background-image: url("./images/icon-map-type-three-dimension.svg");
          }

        }
      }
    }
  }
</style>
