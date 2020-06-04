
 <!--
@show 搜索条件的显示隐藏点击切换事件
@search  搜索事件
@clear 清除事件
  -->
<template>
  <div class="pl-search-component">
    <div class="pl-search-content">
      <slot />
      <search-item v-if="isSearch" class="text-right pull-right">
        <template slot="content">
          <el-button type="primary" class="ml0" size="medium" @click="search">
            查询
          </el-button>
          <el-button
            v-if="isClear"
            type="default"
            plain
            size="medium"
            @click="clear"
          >
            重置
          </el-button>
          <span v-if="isPack" class="ml10 text-btn-primary" @click="packClick">
            <span v-show="!isShow">更多<i class="icon icon-arrow-bottom" /></span>
            <span v-show="isShow">收起<i class="icon icon-arrow-top" /></span>
          </span>
          <slot name="download" />
        </template>
      </search-item>
    </div>
    <div v-if="isOperate" class="pl-search-operate">
      <slot name="footer" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'Search',
  componentName: 'Search',
  provide() {
    return {
      Search: this
    }
  },
  props: {
    isSearch: { // 搜索按钮,清除按钮显示,默认显示true
      default: true
    },
    isPack: { // 是否显示展开收起的功能按钮 默认false
      default: false
    },
    isOperate: { // 操作区域,默认显示true
      default: false
    },
    isShow: { // 是否收起 文字切换控制 默认true
      default: false
    },
    position: {// 默认上下排列    horizontal 表示lable和content在一列
      default: ''
    },
    labelWidth: { // eg: 90px 10%
      default: 'auto'
    },
    labelPosition: { // eg: right left center
      default: 'left'
    },
    isClear: {// 是否显示清除
      default: true
    }
  },
  methods: {
    packClick() {
      this.$emit('show')
    },
    search() {
      this.$emit('search')
    },
    clear() {
      this.$emit('clear')
    }
  }
}
</script>
<style lang="scss" scoped>
    .pl-search-component {
      margin-bottom: 10px;
    }

    .pl-search-content {
      padding-top: 20px;
      padding-right: 10px;
      padding-left: 10px;
      font-size: 0;
      background: #fff;
      overflow: hidden;
    }

    .pl-search-operate {
      background: #fff;
      margin-top: 10px;
      padding: 15px 30px;
      overflow: hidden;
    }
</style>
