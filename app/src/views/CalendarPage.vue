<template>
  <div class="calendarPage">
    <div class="date-picker">
      {{ currentDate.getFullYear() }}
      <span @click="handleDatePicker">
        <van-icon name="arrow-down" v-if="!datePickerVisible" />
        <van-icon name="arrow-up" v-else />
      </span>
    </div>
    <div class="card-list">
      <Poker
        :isTurnOver="isTurnOver"
        v-for="(card, index) in cards"
        :key="card.month"
        width="200px"
        height="300px"
      >
        <template #front>
          <div class="frontCover" :style="{ 'background-color': card.bgColor }">
            <div class="date">
              <div style="font-size: 3em;">{{ index + 1 }}</div>
              <div style="font-size: 1.5em;">{{ card.month }}</div>
            </div>
            <div class="tools">
              <font-awesome-icon
                icon="ellipsis-h"
                @click="showColorPicker(card)"
              />
            </div>
          </div>
        </template>
        <template #back>
          <div class="backCover">
            <div class="date">
              <div style="font-size: 3em;">{{ index + 1 }}</div>
              <div style="font-size: 1.5em;">{{ card.month }}</div>
            </div>
            <Calendar :time="new Date(currentDate.setMonth(index))"></Calendar>
          </div>
        </template>
      </Poker>
    </div>
    <div class="controler">
      <van-button round @click="turnOver" class="front" v-if="!isTurnOver"
        >CALENDER</van-button
      >
      <van-button round color="black" @click="turnOver" class="back" v-else
        >BACK</van-button
      >
    </div>
    <van-popup v-model="datePickerVisible" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="year-month"
        title="选择年月"
        :min-date="minDate"
        :max-date="maxDate"
        :formatter="formatter"
        @confirm="handleDatePicker"
        @cancel="handleDatePicker"
      />
    </van-popup>
    <van-popup v-model="colorPickerVisible" position="bottom">
      <p>颜色</p>
      <van-row>
        <van-col span="6" v-for="color in colors" :key="color">
          <button
            class="round"
            :style="{ 'background-color': color }"
            @click="changeColor(color)"
          ></button>
        </van-col>
      </van-row>
    </van-popup>
  </div>
</template>

<script>
import StandardCard from "@/components/StandardCard.vue";
import Poker from "@/components/Poker.vue";
import Calendar from "@/components/Calendar.vue";
import colorSetting from "@/static/color.js";
import monthName from "@/static/month.js";

export default {
  name: "CalendarPage",
  components: {
    StandardCard,
    Poker,
    Calendar
  },
  data() {
    return {
      datePickerVisible: false,
      colorPickerVisible: false,
      minDate: new Date(2000, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      currentCard: null,
      cards: [],
      colors: null,
      isTurnOver: false
    };
  },
  methods: {
    formatter(type, val) {
      if (type === "year") {
        return `${val}年`;
      } else if (type === "month") {
        return `${val}月`;
      }
      return val;
    },
    handleDatePicker() {
      this.datePickerVisible = !this.datePickerVisible;
    },
    showColorPicker(card) {
      this.currentCard = card;
      this.colorPickerVisible = true;
    },
    closeColorPicker() {
      this.colorPickerVisible = false;
    },
    changeColor(color) {
      this.currentCard.bgColor = color;
      this.colorPickerVisible = false;
      this.currentCard = null;
    },
    turnOver() {
      this.isTurnOver = !this.isTurnOver;
    }
  },
  mounted() {
    var _this = this;
    let monthArray = monthName;
    _this.colors = colorSetting.colors;
    _this.defaultColor = colorSetting.default;
    for (let i = 0; i < 12; i++) {
      _this.cards.push({ month: monthArray[i], bgColor: _this.defaultColor });
    }
  }
};
</script>

<style lang="scss" scoped>
.calendarPage {
  .date-picker {
    padding: 10% 0;
    font-weight: bold;
  }
  .card-list {
    width: 100%;
    padding: 20px;
    overflow-x: scroll;
    white-space: nowrap;
    .poker {
      margin: 15px 15px;
      display: inline-block;
      color: white;
    }
    .frontCover {
      width: 100%;
      height: 100%;
      .date {
        position: absolute;
        padding: 10px;
        font-weight: 400;
      }
      .tools {
        position: absolute;
        bottom: 0;
        right: 0;
        font-size: 1.5em;
        padding: 2% 10%;
      }
    }
    .backCover {
      width: 100%;
      height: 100%;
      color: black;
      .date {
        padding: 8%;
        font-weight: 400;
      }
    }
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .controler {
    .van-button {
      transition: all 1s;
    }
  }
}
button.round {
  width: 40px;
  height: 40px;
  border: 0;
  border-radius: 50% 50%;
}
</style>
