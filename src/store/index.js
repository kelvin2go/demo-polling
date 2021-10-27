import { createStore } from 'vuex';
import poll from './poll.json';
export default createStore({
  state() {
    return {
      count: 0,
      polls: [],
    };
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    setPolls(state, polls) {
      polls.forEach((element, index) => {
        polls[index].answer.options = element.answer.options.map((x) => {
          return {
            ...x,
            count: 0,
          };
        });
      });
      state.polls = polls;
    },
    addPolls(state, poll) {
      state.polls = {
        ...poll,
        ...state.polls,
      };
    },
    addVote(state, params) {
      console.log('params', params);
      const votedPollIndex = state.polls.findIndex((x) => x.id == params.id);
      let poll = state.polls[votedPollIndex];
      console.log(poll);
      const optionIndex = poll.answer.options.findIndex(
        (x) => x.id == params.optionId
      );
      poll.answer.options[optionIndex].count =
        poll.answer.options[optionIndex].count + 1;
      console.log(poll);
      state.polls[votedPollIndex] = poll;
    },
  },
  actions: {
    increment(context) {
      context.commit('increment');
    },
    getPolls(context) {
      // call api get poll data, set new polls to state
      context.commit('setPolls', poll.polls);
    },
    addVote(context, params) {
      context.commit('addVote', params);
    },
  },
});
