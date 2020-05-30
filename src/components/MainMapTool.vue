<template>
  <div class="map-tool">
    <el-button-group>
      <el-button @click="click"><i class="el-icon-edit-outline" style="margin-right:5px;"></i>面积计算
      </el-button>
      <el-button @click="clear"><i class="el-icon-edit-outline" style="margin-right:5px;"></i>清除
      </el-button>
    </el-button-group>
  </div>
</template>
<script>
  import {ButtonGroup, Button} from 'element-ui';

  const components = {};
  components[ButtonGroup.name] = ButtonGroup;
  components[Button.name] = Button;
  export default {
    name: 'MainMapTool',
    methods: {
      click: function () {
        this.$emit('drawPolygon');
      },
      clear: function () {
        this.$emit('clearDraw');
      }
    },
    components,
  };
</script>
<style scoped lang="scss">

  @import "~@/style/pcmixin";

  .map-tool {
    position: absolute;
    z-index: 1000;
    right: rem(20);
    top: rem(80);
    font-size: 0;
  }
</style>
