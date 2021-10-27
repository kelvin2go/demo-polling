<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import ProgressCircle from './ProgressCirclar.vue';
export default defineComponent({
  props: { poll: Object },
  setup() {
    const store = useStore();
    const addVote = (params) => {
      store.dispatch('addVote', params);
    };
    return { addVote };
  },
  components: {
    ProgressCircle,
  },
  computed: {
    totalVote() {
      let total = 0;
      let percentOption = {};
      this.poll.answer.options.forEach((x) => {
        total += x.count;
      });
      return total;
    },
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
      // var hour = a.getHours();
      // var min = a.getMinutes();
      // var sec = a.getSeconds();
      var time = date + ' ' + month + ' ' + year;
      return time;
    },
  },
});
</script>
<template>
  <div class="bg-background grid grid-cols-3 gap-4 p-5">
    <div class="col-span-full">
      <img class="w-8 h-8 float-left" src="@/assets/icon.svg" />
      <h1 class="float-left text-primary text-2xl font-extrabold">
        Today's Poll
      </h1>
    </div>
    <div class="flex flex-wrap col-span-full">
      <div class="flex-initial text-lg text-medium w-full">
        {{ poll.title }}
        <span class="text-sm font-extrabold text-primary">{{
          toDate(poll.publishedDate)
        }}</span>
      </div>

      <div class="flex-initial text-lg text-medium md:w-8/12 sm: w-full">
        <div v-for="(option, i) in poll.answer.options">
          <button
            class="text-white font-bold py-2 px-4 m-1 min-w-100"
            style="min-width: 80px"
            v-bind:class="{ 'bg-info': i == 0, 'bg-primary': i !== 0 }"
            @click="addVote({ id: poll.id, optionId: option.id })"
          >
            {{ option.label }}
          </button>
        </div>
      </div>

      <div
        class="row-span-2 col-span-1 text-lg text-medium md:w-4/12 sm: w-full"
      >
        <ProgressCircle
          :percent="
            totalVote
              ? Math.floor((poll.answer.options[0].count / totalVote) * 100)
              : 0
          "
        />
      </div>
    </div>
  </div>
</template>
