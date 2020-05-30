<template>
  <div :class="className">
    <ul>
      <el-checkbox-group v-model="checkList" @change="onChange">
        <li v-for="item in total" :key="item.id">
          <el-checkbox :label="item.id">
            <div class="li-inner">
              <i v-bind:style="{backgroundColor:(item.fillColor)}"></i>
              <p>{{item.name}}<span>{{item.count}}</span></p>
            </div>
          </el-checkbox>
        </li>
      </el-checkbox-group>
    </ul>
  </div>
</template>
<script>
  import {CheckboxGroup, Checkbox} from 'element-ui';
  import {isMobile} from '@/utils/get-client-type';

  const components = {};
  components[CheckboxGroup.name] = CheckboxGroup;
  components[Checkbox.name] = Checkbox;
  export default {
    name: 'MainMapStatistics',
    data() {
      return {
        checkList: [],
      };
    },
    props: {
      total: Array,
      name: String,
    },
    methods: {
      onChange() {
        // :label="item.id"  checkList里面的值都是 id字段  如果需要改成获取多个字段 请修改成 :label="item"
        //console.info(this.checkList)
        this.$emit('chooseStatus', this.checkList);
      },
    },
    computed: {
      className() {
        return {
          'map-statistics': true,
          'isMobile': isMobile,
        };
      },
    },
    components,
  };
</script>
<style scoped lang="scss">
  @import "~@/style/pcmixin";

  .map-statistics {
    position: absolute;
    z-index: 1000;
    right: rem(16);
    bottom: rem(16);
    background-color: rgba(#fff, 0.62);
    border-radius: rem(6);
    box-shadow: 0px 1px 5px 0px rgba(68, 91, 131, 0.33);

    ul {
      padding: rem(16);

      li {
        padding: rem(8) 0;

        &:nth-of-type(2) {
          .li-inner {
            i {
              /*background-color: #7ecef4;*/
            }

          }
        }

        &:nth-of-type(3) {
          .li-inner {
            i {
              /*background-color: #DBA3FF;*/
            }

          }
        }

        &:nth-of-type(4) {
          .li-inner {
            i {
              /*background-color: #FFC000;*/
            }

          }
        }

        &:nth-of-type(5) {
          .li-inner {
            i {
              /*background-color: #8FC31F;*/
            }

          }
        }

        .li-inner {
          @include clearfix;

          i {
            width: rem(32);
            height: rem(12);
            border-radius: rem(4);
            margin-top: 2px;
            float: left;
            /*background-color: #FF9595;*/
          }

          p {
            margin-left: rem(42);
            color: #171717;
            font-size: rem(14);
            line-height: 16px;

            span {
              font-weight: bold;
            }

          }
        }
      }
    }
  }
</style>
<style lang="scss">
  @import "~@/style/mixin";

  .map-statistics {
    &.isMobile {
      left: rem(29);
      bottom: rem(42);
      width: rem(395);
      right: auto;

      ul {
        padding: rem(21) rem(42);

        li {
          padding: rem(21) 0;

          .el-checkbox {
            display: block;
            font-size: inherit;

            .el-checkbox__label {
              display: block;
              padding-left: 0;
            }
          }

          .el-checkbox__inner {
            display: none;
          }

          .li-inner {
            @include box-c;

            i {
              display: block;
              width: rem(42);
              height: rem(42);
              float: none;
              margin-top: 0;
            }

            p {
              @include box-flex;
              margin-left: rem(13);
              color: #8C8C8C;
              font-size: rem(35);
              @include box-c;

              span {
                font-weight: bold;
                @include box-flex;
                color: #333333;
                font-size: rem(35);
                display: block;
                text-align: right;
              }

            }
          }
        }
      }
    }
  }
</style>
