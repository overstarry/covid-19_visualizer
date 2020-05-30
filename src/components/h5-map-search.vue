<template>
  <div class="m-map-search">
    <form class="input" action="javascript:;" @submit="onSubmit">
      <div class="input-inner">
        <input type="search" v-model="value" :placeholder="placeholder"/>
        <span class="input-clean" @click="value=''" v-if="value"><i
          class="el-icon-close"></i></span>
      </div>
      <div class="icon" @click="onSubmit"><i v-loading="isLoading"></i></div>
    </form>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex';

  export default {
    name: 'h5-map-search',
    props: {
      placeholder: {
        type: String,
        default: '请输入姓名、楼栋号、门牌号',
      },
      menu: {
        type: Array,
        default() {
          return [];
        },
      },
      menuIndex: {
        type: Number,
        default() {
          return 0;
        },
      },
    },
    methods: {
      onSubmit() {
        if (this.isLoading) return;
        this.isLoading = true;
        //查询楼栋
        this.$emit('queryBuilding', this.value, this.selectAreas.id, (e) => {
          //回调
          this.isLoading = false;
        });
      },
    },
    computed: {
      ...mapGetters({
        selectAreas: 'areas/getSelectAreas',
      }),
    },
    data() {
      return {
        value: '',
        isLoading: false,
      };
    },
  };
</script>
<style scoped lang="scss">
  @import "~@/style/mixin";

  .m-map-search {
    position: absolute;
    left: rem(30);
    right: rem(30);
    top: rem(80);
    z-index: 999;
    @include clearfix;

    .input {
      background: linear-gradient(167deg, rgba(10, 186, 242, 1) 0%, rgba(50, 133, 230, 1) 100%);
      height: rem(135);
      line-height: rem(135);
      border-radius: rem(23);
      box-shadow: 0px rem(12) rem(35) 0px rgba(#000, 0.11);

      .icon {
        height: 100%;
        margin-left: rem(780);
        border-radius: 0 rem(23) rem(23) 0;
        @include box-c;

        i {
          background: url("./images/icon-search.svg") no-repeat center center;
          background-size: contain;
          width: rem(70);
          height: rem(70);
          display: block;
          margin-left: rem(30);
          margin-bottom: rem(10);

          .el-loading-mask {
            background: none;
          }
        }
      }

      .input-inner {
        position: absolute;
        left: 0;
        bottom: 0;
        display: block;
        height: rem(135+20);
        padding: 0 rem(68) 0 rem(42);
        background-color: #fff;
        width: rem(760);
        border-radius: rem(23) 0 0 rem(23);

        &::after {
          width: rem(800);
          height: 100%;
          background-color: #fff;
          content: '';
          position: absolute;
          right: rem(-100);
          top: 0;
          @include mask-image('./images/mask-right-bottom.png');
          -webkit-mask-position-x: right;
          -webkit-mask-position-y: center;
          -webkit-mask-size: auto 100%;
        }

        input {
          border-radius: rem(23) 0 0 rem(23);
          height: 100%;
          color: #333;
          position: relative;
          z-index: 2;
          display: block;
          font-size: rem(40);
          width: 100%;
          border: 0;
          outline: 0;

          &::-webkit-input-placeholder {
            line-height: 1.4em;
          }
        }

        .input-clean {
          position: absolute;
          right: 0;
          top: 50%;
          width: rem(48);
          height: rem(48);
          margin-top: rem(-48/2);
          font-size: rem(32);
          z-index: 2;
          border-radius: 50%;
          border: 1px solid rgba(#333, 0.3);
          @include box-c;

          .el-icon-close {
            color: rgba(#333, 0.3);
            font-weight: bold;
            display: block;
          }
        }
      }

    }
  }
</style>
<style lang="scss">
  @import "~@/style/mixin";

  .m-map-search {

    .input {

      .icon {

        i {
          &.el-loading-parent--relative {
            background: none;

            .el-loading-mask {
              background: none;

              .el-loading-spinner {
                .circular {
                  width: rem(70);
                  height: rem(70);

                  .path {
                    stroke: #fff;
                    stroke-width: rem(16)
                  }
                }
              }
            }
          }

        }
      }

    }
  }
</style>
