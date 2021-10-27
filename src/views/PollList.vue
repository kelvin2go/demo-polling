<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import PollCard from '../components/PollCard.vue';
import PollHero from '../components/PollHero.vue';

export default defineComponent({
  name: 'PollList',
  setup() {
    const store = useStore();
    console.log(store.state);
    const polls = computed(() => {
      const [head, ...rest] = store.state.polls;
      return {
        head: head || {},
        rest: rest || {},
      };
    });
    const getPolls = () => {
      store.dispatch('getPolls');
    };
    const addPolls = () => {
      store.commit('');
    };
    getPolls();

    return {
      polls,
      addPolls,
      getPolls,
    };
  },
  components: {
    PollCard,
    PollHero,
  },
});
</script>

<template>
  <div class="w-full">
    <div class="w-full flex justify-center">
      <div class="justify-center max-w-screen-xl px-4 py-12 sm:px-6">
        <PollHero
          :poll="polls.head"
          @click="$router.push({ path: 'poll', params: { id: poll.id } })"
        />
      </div>
    </div>
    <div class="w-full flex justify-center">
      <div class="justify-center max-w-screen-xl px-4 py-12 sm:px-6">
        <div class="grid grid-cols-2">
          <PollCard
            v-for="poll in polls.rest"
            :poll="poll"
            class="col-span-1"
            @click="$router.push({ path: 'poll', params: { id: poll.id } })"
          />
        </div>
      </div>
    </div>
  </div>
</template>
