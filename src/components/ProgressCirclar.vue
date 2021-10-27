<script lang="ts">
import { ref, defineComponent, computed } from 'vue';

export default defineComponent({
  setup() {
    // const percent = 13;
    // const circumference = 30 * 2 * Math.PI;
    // return { percent, circumference };
  },
  props: {
    stroke: {
      type: Number,
      default: 57,
    },
    radius: {
      type: Number,
      default: 180,
    },
    percent: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {};
  },
  computed: {
    normalizedRadius: function () {
      return this.radius - this.stroke * 2;
    },
    circumference: function () {
      return this.normalizedRadius * 2 * Math.PI;
    },
  },
});
</script>
<template>
  <!-- Circle -->
  <div class="relative inline-flex items-center justify-center overflow-hidden">
    <!-- Building a Progress Ring: https://css-tricks.com/building-progress-ring-quickly/ -->
    <svg :height="radius * 1.4" :width="radius * 1.4">
      <circle
        class="text-secondary"
        :stroke-width="stroke"
        stroke="currentColor"
        fill="transparent"
        :stroke-dasharray="`${circumference} ${circumference}`"
        :r="normalizedRadius"
        :cx="radius * 0.7"
        :cy="radius * 0.7"
      />
      <circle
        class="text-info"
        :stroke-width="stroke"
        :stroke-dasharray="`${circumference} ${circumference}`"
        :stroke-dashoffset="circumference - (percent / 100) * circumference"
        stroke="currentColor"
        fill="transparent"
        :r="normalizedRadius"
        :cx="radius * 0.7"
        :cy="radius * 0.7"
      />
    </svg>
    <div
      class="absolute inset-55 left-0 grid grid-cols-3 gap-2"
      :style="`width='${radius * 0.7}px`"
      v-if="percent > 0"
    >
      <span class="text-3xl font-extrabold py-4 pl-9 pr-4">{{ percent }}</span>
      <span class="text-4xl font-extrabold py-4 pl-5 pr-3">%</span>
      <span class="text-3xl font-extrabold py-4">{{ 100 - percent }}</span>
    </div>
  </div>
</template>

<style scoped>
circle {
  transition: stroke-dashoffset 0.35s;
  transform: rotate(152deg);
  transform-origin: 50% 50%;
}
span {
  --tw-text-opacity: 1;
  color: rgba(249, 250, 251, var(--tw-text-opacity));
}
</style>
