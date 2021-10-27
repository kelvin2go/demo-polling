<script lang="ts">
import { defineComponent } from 'vue';
import ProgressCircle from './ProgressCirclar.vue';
export default defineComponent({
  props: { poll: Object },
  setup() {},
  components: {
    ProgressCircle,
  },
  methods: {
    toDate(ts) {
      var a = new Date(ts * 1000);
      var months = [
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
      var year = a.getFullYear();
      var month = months[a.getMonth()];
      var date = a.getDate();
      var time = date + ' ' + month + ' ' + year;
      return time;
    },
  },
});
</script>

<template>
  <div class="grid grid-cols-4 p-5">
    <img src="@/assets/percentIcon.png" class="row-span-2 col-span-1" />
    <h1 class="col-span-3 text-sm font-extrabold text-primary">
      {{ toDate(poll.publishedDate) }}
    </h1>
    <div class="col-span-3 text-xl font-medium">{{ poll.title }}</div>
  </div>
</template>
