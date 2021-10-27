<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import NewsCard from '@/components/NewsCard.vue';
export default defineComponent({
  name: 'news',
  setup() {
    const store = useStore();
    const route = useRoute();

    const keyword = route.params.keyword;
    const topic = route.params.topic;

    const searchNews = (params) => {
      store.dispatch('searchNews', params);
    };
    const foundNews = computed(() => {
      return store.state.news;
    });
    const allTopics = computed(() => {
      return store.state.topics;
    });
    if (keyword && topic) {
      store.dispatch('searchNews', { q: keyword, t: topic });
    }
    store.dispatch('getTopics');
    return {
      fromParams: {
        keyword,
        topic,
      },
      form: {
        q: keyword,
        t: topic,
      },
      allTopics,
      foundNews,
      searchNews,
    };
  },
  data: () => {
    return {};
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
    NewsCard,
  },
});
</script>
<template>
  <div>
    <div class="flex justify-center">
      <div class="justify-center max-w-screen-xl px-4 py-12 sm:px-6">
        <div class="shadow flex">
          <input
            class="w-auto border-b-gray p-2"
            type="text"
            placeholder="Search..."
            style="min-width: 300px"
            v-model="form.q"
          />
          <button
            class="bg-white w-auto flex justify-end items-center p-2"
            @click="searchNews(form)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="30"
              height="30"
              viewBox="0 0 30 30"
              style="fill: #143766"
            >
              <path
                d="M 13 3 C 7.4886661 3 3 7.4886661 3 13 C 3 18.511334 7.4886661 23 13 23 C 15.396652 23 17.59741 22.148942 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148942 17.59741 23 15.396652 23 13 C 23 7.4886661 18.511334 3 13 3 z M 13 5 C 17.430666 5 21 8.5693339 21 13 C 21 17.430666 17.430666 21 13 21 C 8.5693339 21 5 17.430666 5 13 C 5 8.5693339 8.5693339 5 13 5 z"
              ></path>
            </svg>
          </button>
        </div>
        <div class="mt-5 shadow flex">
          <label>
            Topics:
            <input
              class="w-auto border-b-gray p-2"
              type="text"
              v-model="form.t"
              placeholder="The topics to search, delimited by , (eg. Hong Kong,Asia) "
            />
          </label>
        </div>
      </div>
    </div>
    <div class="flex justify-center">
      <div class="justify-center max-w-screen-xl px-4 py-12 sm:px-6">
        <div v-for="news in foundNews">
          <NewsCard :news="news" class="border border-gray m-1" />
        </div>
      </div>
    </div>
  </div>
</template>
