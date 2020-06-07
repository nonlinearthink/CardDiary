<template>
  <div class="poker" :style="{ height, width }">
    <StandardCard :class="{ cover: true, turnOver: isTurnOver }">
      <slot name="front"></slot>
    </StandardCard>
    <StandardCard :class="{ cover: true, turnOver: !isTurnOver }">
      <slot name="back"></slot>
    </StandardCard>
  </div>
</template>

<script>
import StandardCard from "./StandardCard.vue";
export default {
  name: "Poker",
  props: {
    isTurnOver: {
      type: Boolean,
      default: false
    },
    height: {
      type: String,
      default: "100px"
    },
    width: {
      type: String,
      default: "100px"
    }
  },
  components: {
    StandardCard
  }
};
</script>

<style lang="scss" scoped>
.poker {
  position: relative;
  transform-style: preserve-3d;
  perspective: 2000px;
  .cover {
    height: 100%;
    width: 100%;
    margin: 0;
    overflow: hidden;
    position: absolute;
    backface-visibility: hidden;
    transition: all 1s;
  }
  .turnOver {
    transform: rotateY(180deg);
  }
}
</style>

