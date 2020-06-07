<template>
  <StandardCard>
    <div class="avatar"></div>
    <div class="edit">
      <router-link to="/setting"
        ><van-icon name="edit" size="2em"
      /></router-link>
    </div>
    <slot></slot>
  </StandardCard>
</template>

<script>
import StandardCard from "./StandardCard.vue";
export default {
  name: "AvatarCard",
  components: {
    StandardCard
  }
};
</script>

<style lang="scss" scoped>
.avatar {
  $avatar-size: 80px;
  width: $avatar-size;
  height: $avatar-size;
  background-color: #dae2e2;
  border-radius: 50%;
  margin: 0 auto;
  margin-top: -$avatar-size/2;
}
.edit {
  position: absolute;
  top: 5%;
  right: 5%;
  a {
    color: #979c9c;
  }
}
</style>