<template>
  <div class="mtn-list">
    <ul>
      <li v-for="mtn in mtns" :key="mtn.slug">{{ mtn.name }}: {{ mtn.el }}</li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'MtnList',
  computed: {
    ...mapState({
      mtns: (state) => state.mtns,
    }),
  },
};
</script>
