<template>
  <div class="standard-card">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "StandardCard"
};
</script>

<style lang="scss" scoped>
.standard-card {
  border: 1px solid #f5f5f5;
  border-radius: 10px 10px;
  box-shadow: 0px 0px 25px -8px #dad3d3;
  margin: 30px;
  position: relative;
}
</style>