<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  props: { news: Object },
  setup() {},
  components: {},
  methods: {
    toDate(ts) {
      let a = new Date(ts);
      let months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];
      let year = a.getFullYear();
      let month = months[a.getMonth()];
      let date = a.getDate();

      let hour = a.getHours();
      let ampm = hour >= 12 ? 'pm' : 'am';
      hour = hour % 12;
      hour = hour ? hour : 12; // the hour '0' should be '12'
      let min = a.getMinutes();
      let time = `${date}, ${month}, ${year} ${('0' + hour).slice(-2)}:${(
        '0' + min
      ).slice(-2)} ${ampm}`;
      return time;
    },
  },
});
</script>

<template>
  <div
    class="
      w-full
      bg-white
      rounded-lg
      sahdow-lg
      overflow-hidden
      flex flex-col
      md:flex-row
      border-gray
      divide-y
    "
  >
    <div class="w-full md:w-3/5 text-left p-4 md:p-4 space-y-2">
      <p class="text-base text-gray font-bold">
        {{ news.topics.join(', ') }}
      </p>
      <p class="text-l font-bold">{{ news.text }}</p>
      <p class="text-sm text-gray font-normal">{{ toDate(news.timeStamp) }}</p>
    </div>

    <div class="float-right mt-3">
      <img class="object-center object-cover" :src="news.image" />
    </div>
  </div>
</template>
