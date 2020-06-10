<template>
  <div class="histogram">
    <div v-for="item in items" :key="item.value" class="histogram-item">
      <div>{{ item.count }}</div>
      <div class="container">
        <div
          class="graph"
          :style="{ height: `${(item.count / maxCount) * 50}px` }"
        ></div>
      </div>
      <div>{{ item.value }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Histogram",
  props: {
    items: Array
  },
  computed: {
    maxCount() {
      console.log(this.items)
      let max = 0;
      for (let item of this.items) {
        if (item.count > max) max = item.count;
      }
      return max;
    }
  }
};
</script>

<style lang="scss" scoped>
.histogram {
  overflow-x: scroll;
  white-space: nowrap;
  .histogram-item {
    display: inline-block;
    margin: 5px;
    .container {
      margin: 0 auto;
      height: 50px;
      width: 10px;
      position: relative;
    }
    .graph {
      width: 100%;
      background-color: #888;
      position: absolute;
      bottom: 0;
    }
  }
}
</style>