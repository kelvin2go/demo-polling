<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import PollHero from '../components/PollHero.vue';
export default defineComponent({
  name: 'PollDetail',
  setup() {
    const store = useStore();
    const route = useRoute();
    const poll = computed(() => {
      const all = store.state.polls;
      console.log(all);
      return all.find((x) => x.id == route.params.id);
    });
    const getPolls = () => {
      store.dispatch('getPolls');
    };
    const addPolls = () => {
      store.commit('');
    };
    getPolls();

    return {
      poll,
      id: route.params.id,
      addPolls,
      getPolls,
    };
  },
  methods: {
    toDate(ts) {
      let a = new Date(ts * 1000);
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
      let day = a.getDay();
      const weekday = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ];
      let hour = a.getHours();
      let ampm = hour >= 12 ? 'pm' : 'am';
      hour = hour % 12;
      hour = hour ? hour : 12; // the hour '0' should be '12'
      let min = a.getMinutes();
      let sec = a.getSeconds();
      let time = `${weekday[day]}, ${date}, ${month}, ${year}, ${hour}:${min} ${ampm}`;
      return time;
    },
  },
  components: {
    PollHero,
  },
});
</script>

<template>
  <div class="w-full">
    <div class="w-full flex justify-center">
      <div class="justify-center max-w-screen-xl px-4 py-12 sm:px-6">
        <h1 class="text-5xl border-b border-b-gray-200 border-dotted pb-4">
          {{ poll.title }}
        </h1>
        <span class="float-right text-gray-600">
          PUBLISHED: {{ toDate(poll.publishedDate) }}</span
        >
      </div>
    </div>
    <div class="w-full flex justify-center">
      <div class="justify-center max-w-screen-xl px-4 py-12 sm:px-6">
        <PollHero :poll="poll" />
      </div>
    </div>
  </div>
</template>
