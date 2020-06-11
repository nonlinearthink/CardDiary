<template>
  <div class="tag">
    <div class="container"><font-awesome-icon icon="tag" /></div>
    <div class="container"><slot name="tagname"></slot></div>
    <div class="container"><slot name="count"></slot></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.tag {
  font-size: 1em;
  border: 1px solid rgb(214, 216, 218);
  display: inline-block;
  border-radius: 1em;
  .container{
      display: inline-block;
      margin: 5px;
  }
}
</style>