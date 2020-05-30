<template>
  <div class="map-search">
    <el-cascader @change="onSelectProgram"
                 :show-all-levels="false"
                 placeholder="请选择项目"
                 :options="programList"
                 v-model="program">
      <template v-slot:default="{ node, data }">
        {{data.label}}
      </template>
    </el-cascader>
    <div class="search-input">
      <el-popover placement="bottom-start"
                  popper-class="search-list"
                  :width="popperWidth"
                  v-model="search.visible"
                  trigger="manual">
        <div class="list" v-loading="search.isLoading">
          <ul class="search-history" v-if="search.isHistory">
            <li v-for="(item,index) in search.history"
                @click="onHistorySelect(item)"
                :key="index">
              <i class="el-icon-time"></i> {{item.value}}
            </li>
          </ul>
          <ul class="search-item" v-else>
            <li v-for="(item,index) in search.list"
                @click="onSelect(item)"
                :key="index">
              <p>{{item.value}}</p>
              <p>
                <span>被拆迁人：张三丰</span>
                <span>门牌号：A123</span>
                <span>楼栋号：ZZ234568</span>
              </p>
            </li>
          </ul>
        </div>
        <el-input slot="reference"
                  placeholder="请输入姓名、楼栋号、门牌号、协议号"
                  @focus="onVisibleSearchList(true)"
                  @blur="onVisibleSearchList(false)"
                  @keyup.enter.native="onSearch"
                  v-model="search.value">
          <i slot="suffix" class="search-icon" @click="onSearch"></i>
        </el-input>
      </el-popover>
    </div>
  </div>
</template>
<script>
  import {Input, Cascader, Popover} from 'element-ui';
  import {mapGetters} from 'vuex';
  import {isNotEmptyArray} from '@/utils/fns';
  import axios from 'axios';

  const components = {};
  components[Input.name] = Input;
  components[Cascader.name] = Cascader;
  components[Popover.name] = Popover;
  let id = 0;
  export default {
    name: 'MainSearch',
    data() {
      let self = this;
      return {
        storageKey: 'search-history',
        search: {
          value: '',
          history: [],
          list: [],
          source: axios.CancelToken.source(),
          isLoading: false,
          isHistory: true,
          visible: false,
          time: null,
        },
        address: {
          value: 'd48117bfcbe7c13ee2ce58519e60c303',
          //props: {
          //  lazy: true,
          //  async lazyLoad(node, resolve) {
          //    const { level, data } = node;
          //    let nodes = [];
          //    if (level === 0) {
          //      // 第一级别
          //      nodes = self.programList.map(item => ({
          //        value: item,
          //        label: item.title,
          //        childrenData: item.children,
          //        leaf: false,
          //      }));
          //    }
          //    else {
          //      if (isNotEmptyArray(data.childrenData)) {
          //        if (data.childrenData[0].type == 'program') {
          //          nodes = data.childrenData.map((item) => ({
          //            value: item,
          //            label: item.title,
          //            leaf: true,
          //          }));
          //        } else {
          //          nodes = data.childrenData.map((item) => ({
          //            value: item,
          //            label: item.title,
          //            childrenData: item.children,
          //            leaf: false,
          //          }));
          //        }
          //      }
          //    }
          //    resolve(nodes);
          //  },
          //},
        },
        program: ""
      };
    },
    methods: {
      onHistorySelect({value}) {
        this.search.value = value;
        this.onSearch();
      },
      onSelectProgram(e, notlocal) {
        if (!e) return;
        if (!notlocal) localStorage.setItem('pcProgram', JSON.stringify(e))
        this.onVisibleSearchList(false);
        if (e[e.length - 1] != this.address.value)
          this.search.value = '';

        this.address.value = e[e.length - 1];
        this.onSearch();
      },
      onSelect(item, n) {
        this.onVisibleSearchList(false);
        this.search.value = item.value;
        this.onSearch();
      },
      onSearch() {
        const {source, value} = this.search;
        if (this.search.isLoading) return;

        if (!value) {
          this.search.isHistory = true;
        } else {
          this.onVisibleSearchList(true);
          // 搜索记录还是点击记录，
          this.search.history.unshift({value});
          this.search.history = this.search.history.splice(0, 5);
          this.$store.dispatch('storage/setItem', {
            key: this.storageKey,
            data: this.search.history,
          });
          source.cancel();
        }

        this.search.isLoading = true;

        //查询楼栋
        this.$emit('queryBuilding', this.search.value, this.address.value, (e) => {
          //回调
          this.search.list.length = 0;
          if (e) {
            e.features.forEach((val, i) => {
              this.search.list.push({value: val.properties.code});
            });
            this.search.isHistory = false;
          }
          this.search.isLoading = false;
        });

        // this.$http.post('', {
        //   cancelToken: source.token,
        // }).then(res => {
        //   // 处理下数据丢到显示列表去
        // }).catch(err => {
        //   // 错误处理
        // });
        //setTimeout(() => {
        //  this.search.list.push({ value: ~~(Math.random() * 1000) + '' });
        //  this.search.isLoading = false;
        //  this.search.isHistory = false;
        //}, 1000 * Math.random());
      },
      onVisibleSearchList(bool) {
        window.clearTimeout(this.search.time);
        if (bool) {
          this.search.visible = true;
        } else {
          this.search.time = window.setTimeout(() => {
            this.search.visible = false;
          }, 300);
        }
      },

      //递归生成列表
      getCascader(arr) {
        arr.forEach(t => {
          t.value = t.id;
          t.label = t.title;
          if (t.children) {
            this.getCascader(t.children);
          }
        });
      },
    },
    async created() {
      try {
        const history = await this.$store.dispatch('storage/getItem', this.storageKey);
        this.search.history = history;
      } catch (e) {
      }
    },
    computed: {
      ...mapGetters({
        options: 'areas/getOptions',
        programList: 'areas/getprogramList'
      }),
      popperWidth() {
        return this.search.isHistory ? 356 : 580;
      },
    },
    components,
    mounted() {
      this.getCascader(this.programList)
      var pcProgram = localStorage.getItem("pcProgram");

      if (pcProgram) {
        this.program = JSON.parse(pcProgram);
        this.onSelectProgram(this.program, true);
      } else {
        this.program = ["11", "31", "38", "ffd684ec3ae1a0a45799cd4779d4db0e"];
        this.onSelectProgram(this.program, true);
      }
    }
  };
</script>
<style scoped lang="scss">
  @import "~@/style/pcmixin";

  .map-search {
    position: absolute;
    z-index: 1000;
    left: rem(20);
    top: rem(18);

    .search-icon {
      width: rem(16+25);
      height: 100%;
      display: inline-block;
      line-height: rem(40);
      font-size: rem(20);
      color: #626467;
      font-weight: bold;
      border-radius: 0 rem(4) rem(4) 0;
      background-image: url("./images/icon-map-search.png");
      background-position: center center;
      background-repeat: no-repeat;
      background-size: rem(20);
      cursor: pointer;

      &:hover {
        /*background-color: #4F90FF;*/
        color: #fff;
      }

    }
  }

  .search-history {
    li {
      line-height: rem(38);
      font-size: rem(15);
      color: #566A8D;
      padding: 0 rem(8);
      cursor: pointer;

      .el-icon-time {
        margin-right: rem(8);
      }

      &:hover {
        background: #E7EDF7;
      }

    }
  }

  .search-item {
    max-height: rem(420);
    overflow-y: auto;

    li {
      padding: rem(12) rem(20) rem(12) rem(60);
      background: url("./images/icon-map-search-address.png") no-repeat rem(18) center;
      background-size: rem(28);
      cursor: pointer;

      &:hover {
        background-color: #E7EDF7;
      }

      p {
        line-height: rem(14+12);
        color: #566A8D;
        font-size: rem(15);
        @include box-pack-start;

        span {
          display: block;
          width: 33%;

          i {
            color: #289CFF;
            font-weight: bold;
            font-style: normal;
          }

        }
      }
    }
  }
</style>
<style lang="scss">
  @import "~@/style/pcmixin";

  .map-search {
    @include clearfix;

    .el-cascader, .search-input {
      display: block;
      float: left;
      margin-left: rem(10);

      .el-input {
        display: block;

        input {
          box-shadow: 0px 1px 5px 0px rgba(117, 130, 153, 0.33);
          border: 0;
          padding: 0 rem(16+25) 0 rem(16);
        }

      }
    }

    .el-cascader {
      margin-left: 0;

      .el-input {
        width: rem(202);
        margin-left: 0;
      }

    }

    .el-input {
      width: rem(356);

      .el-input__suffix {
        right: rem(0);
      }

    }
  }

  .search-list {
    padding: 0;

    .el-autocomplete-suggestion__wrap {
      margin-bottom: 0 !important;
      padding: 0;
      overflow: hidden;
      overflow-y: auto;

      .el-autocomplete-suggestion__list {
        li {
          padding: 0;
        }

      }
    }

    .popper__arrow {
      display: none;
    }

    .is-horizontal {
      display: none;
    }
  }
</style>
