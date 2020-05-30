<template>
  <div v-if="visible" class="pop-select-data">
    <div class="pop-head">时间选择</div>
    <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
    <div class="pop-footer">
      <a href="javascript:;" @click="close">取消</a>
      <a href="javascript:;" class="on" @click="onSubmit">确定</a>
    </div>
  </div>
</template>

<script>
  const KEY_TYPE = {
    Year: 'y+',
    Month: 'M+',
    Date: 'd+',
    Hours: 'h+',
    Minutes: 'm+',
    Seconds: 's+',
  };
  export default {
    name: 'PopSelectData',
    data() {
      return {
        visible: false,
        slots: [],
        values: {},
        keys: [],
        resolve: null,
        reject: null,
        options: {},
      };
    },
    watch: {
      visible(value) {
        if (!value) {
          this.reject && this.reject();
        }
      },
    },
    methods: {
      onValuesChange(picker, values) {
        // if (values[0] > values[1]) {
        //   picker.setSlotValue(1, values[0]);
        // }
        // console.info(picker, values);
        values.forEach((item, index) => {
          const key = this.keys[index];
          const value = this.values[key];
          if (item !== value) {
            this.values[key] = item;
            if (this.values[KEY_TYPE.Date] != null) {
              switch (key) {
                case KEY_TYPE.Year:
                case KEY_TYPE.Month:
                  // console.info(this.keys.indexOf(KEY_TYPE.Date));
                  // 判断是否有天数
                  const {arr} = this.onGetValues(KEY_TYPE.Date);
                  picker.setSlotValues(this.keys.indexOf(KEY_TYPE.Date), arr);
                  // console.info(_values);
                  break;
              }
            }
          }
        });
      },
      onGetValues(k, nowValue, isNow = false) {
        let arr = [];
        let nowValueIndex = 0;
        switch (k) {
          case KEY_TYPE.Year: {
            // 年份取最近10年
            const length = 10;
            let startTime = isNow ? (nowValue - length) : (nowValue - length / 2);
            for (let i = 0; i <= length; i++) {
              let _Y = startTime + i;
              if (_Y === nowValue) {
                nowValueIndex = i;
              }
              arr.push(_Y);
            }
            break;
          }
          case KEY_TYPE.Month: {
            for (let i = 1; i <= 12; i++) {
              if (i === nowValue) {
                nowValueIndex = i - 1;
              }
              arr.push(i);
            }
            break;
          }
          case KEY_TYPE.Date: {
            const length = new Date(this.values[KEY_TYPE.Year], this.values[KEY_TYPE.Month], 0).getDate();
            for (let i = 1; i <= length; i++) {
              if (i === nowValue) {
                nowValueIndex = i - 1;
              }
              arr.push(i);
            }
            break;
          }
          case KEY_TYPE.Hours: {
            for (let i = 0; i <= 23; i++) {
              if (i === nowValue) {
                nowValueIndex = i;
              }
              arr.push(i);
            }
            break;
          }
          case KEY_TYPE.Minutes: {
            for (let i = 0; i <= 59; i++) {
              if (i === nowValue) {
                nowValueIndex = i;
              }
              arr.push(i);
            }
            break;
          }
          case KEY_TYPE.Seconds: {
            for (let i = 0; i <= 59; i++) {
              if (i === nowValue) {
                nowValueIndex = i;
              }
              arr.push(i);
            }
            break;
          }
        }
        return {
          arr,
          nowValueIndex,
        };
      },
      /**
       * 弹窗打开
       * @param {Date} date 默认选中时间
       * @param {boolean} isNow 是否限制到当前时间
       * @param {string} fmt 时间格式
       */
      open(date = new Date, options = {}) {
        return new Promise((resolve, reject) => {
          let {fmt = 'yyyy-MM-dd hh:mm:ss', isNow = false} = options;
          this.options = {...this.options, ...options};
          this.resolve = resolve;
          this.reject = reject;
          if (typeof date === 'string') {
            date = new Date(+date.replace(/\/Date\((\d+)\)\//gi, '$1'));
          }
          let o = {};
          o[KEY_TYPE.Year] = date.getFullYear();
          o[KEY_TYPE.Month] = date.getMonth() + 1;
          o[KEY_TYPE.Date] = date.getDate();
          o[KEY_TYPE.Hours] = date.getHours();
          o[KEY_TYPE.Minutes] = date.getMinutes();
          o[KEY_TYPE.Seconds] = date.getSeconds();
          let index = 1;
          for (let k in o) {
            if (new RegExp(`(${k})`).test(fmt)) {
              let str = o[k] + '';
              const nextIndex = fmt.indexOf(RegExp.$1) + RegExp.$1.length;
              const next = fmt.slice(nextIndex, nextIndex + 1);
              // console.info(fmt, str, RegExp.$1, next);
              let slot = {
                flex: 1,
                className: `slot${index}`,
                textAlign: 'center',
                values: [],
                defaultIndex: 0,
              };
              const {arr, nowValueIndex} = this.onGetValues(k, +str, isNow);
              slot.values = [...arr];
              slot.defaultIndex = nowValueIndex;
              fmt = fmt.replace(RegExp.$1, str);
              this.slots.push(slot);
              this.values[k] = +str;
              this.keys.push(k);
              if (this.slots.length > 0) {
                this.slots.push({
                  divider: true,
                  content: next,
                  className: `slot${index}`,
                });
                index++;
              }
              index++;
            }
          }
          this.visible = true;
          this.$popBox(this, {placement: 3});
        });
      },
      close() {
        this.$popBoxClose(this);
        this.visible = false;
      },
      onSubmit() {
        let {fmt} = this.options;
        for (let k in this.values) {
          if (new RegExp(`(${k})`).test(fmt)) {
            let value = this.values[k] + '';
            fmt = fmt.replace(RegExp.$1, value);
          }
        }
        this.reject = null;
        this.resolve && this.resolve({fmt, values: this.values});
        this.close();
      },
    },
    mounted() {
      // this.open(new Date, { fmt: 'yyyy-MM' });
    },
  };
</script>

<style scoped lang="scss">
  @import "~@/style/mixin";

  .pop-select-data {
    background-color: #fff;

    .pop-head {
      @include box-c;
      height: rem(120);
      font-size: rem(48);
      color: #5C6275;
      box-shadow: 0px rem(7) rem(29) rgba(0, 0, 0, 0.11);
    }

    .pop-footer {
      position: relative;
      z-index: 2;
      box-shadow: 0px rem(-7) rem(29) rgba(0, 0, 0, 0.11);
      @include box-c;

      a {
        @include box-flex;
        @include box-c;
        height: rem(144);
        font-size: rem(48);
        color: #5C6275;

        &.on {
          background-color: #0093FF;
          color: #fff;
        }
      }
    }
  }
</style>

<style lang="scss">
  @import "../style/mixin";

  .pop-select-data {
    .picker-item {
      padding: 0;
    }
  }
</style>
