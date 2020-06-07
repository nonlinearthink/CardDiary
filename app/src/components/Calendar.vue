<template>
  <div class="calendar">
    <div
      v-for="(value, index) in placeholders"
      :key="index"
      :class="{ Sunday: index % 7 == 0, Saturday: index % 7 == 6 }"
    >
      {{ value == 0 ? "&nbsp;" : value }}
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "Calendar",
  props: {
    time: {
      type: Date,
      default: () => new Date()
    }
  },
  data() {
    return {
      placeholders: new Array(35)
    };
  },
  methods: {
    updateCalendar() {
      var startOf = moment(this.time)
        .startOf("month")
        .weekday();
      var endDate = moment(this.time)
        .endOf("month")
        .date();
      var isStart = false,
        isEnd = false;
      var increaser = 1;
      this.placeholders = new Array(35);
      for (let i = 0; i < 42; i++) {
        this.placeholders[i] = 0;
        if (i == startOf) isStart = true;
        if (i >= endDate + startOf) isEnd = true;
        if (isStart && !isEnd) this.placeholders[i] = increaser++;
      }
    }
  },
  watch: {
    time(newValue, old) {
      this.time = newValue;
      this.updateCalendar();
    }
  }
};
</script>

<style lang="scss" scoped>
.calendar {
  display: grid;
  grid-template-columns: repeat(7, 14.28%);
  grid-template-rows: repeat(6, 16.6%);
  color: #888888;
}
.Saturday {
  color: #3fb0e4;
}
.Sunday {
  color: #dd5a5a;
}
</style>