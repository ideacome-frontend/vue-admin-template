<template>
  <div class="platform-col" :class="[colPosition]">
    <label class="platform-col-label" :style="labelStyle">
      <slot name="label" />
    </label>
    <div class="platform-col-content">
      <slot name="content" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'SearchItem',
  componentName: 'SearchItem',
  inject: ['Search'],
  props: {
    labelWidth: {
      default: 'auto'
    }
  },
  computed: {
    labelStyle() {
      if (this.Search.position === 'horizontal') {
        return {
          'width': this.labelWidth || this.Search.labelWidth,
          'text-align': this.Search.labelPosition
        }
      }
      return null
    },
    colPosition() {
      return this.Search.position
    }
  }
}
</script>
<style lang="scss" scoped>
  .platform-col {
    display: inline-block;
    margin-bottom: 20px;
    padding-left: 20px;
    padding-right: 20px;
    box-sizing: border-box;
    width: 33.3%;
    vertical-align: middle;

    .platform-col-label {
      display: inline-block;
      font-size: 12px;
      box-sizing: border-box;
      height: 16px;
      margin-bottom: 10px;
    }

    .platform-col-content {
      box-sizing: border-box;
      font-size: 13px;
    }

    &.horizontal {
      .platform-col-label {
        float: left;
        line-height: 34px;
        margin-right: 10px;
      }

      .platform-col-content {
        overflow: hidden;
      }
    }
  }

  @media (min-width: 960px) and (max-width: 1360px) {
    .platform-col,
    .platform-col-1 {
      width: 33.3%;
    }
  }

  @media (min-width: 1360px) and (max-width: 1760px) {
    .platform-col,
    .platform-col-1 {
      width: 25%;
    }
  }

  @media (min-width: 1760px) {
    .platform-col,
    .platform-col-1 {
      width: 20%;
    }
  }
</style>
