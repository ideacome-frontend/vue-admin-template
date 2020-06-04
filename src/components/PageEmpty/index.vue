<template>
  <div class="empty-container flex flex-vc flex-hc">
    <div>
      <img src="../../assets/empty_data.png" :style="{width: width+'px'}" alt="暂无数据">
      <p class="text-center fs24 color8">
        {{ text }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: ''
    },
    width: {
      type: [String, Number],
      default: 240
    }
  }
}
</script>

<style scoped lang="scss">
  .empty-container {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
</style>
