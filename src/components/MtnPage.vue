<template>
  <div class="mtn-page">
    <div v-if="selectedMtn">
      <h1>{{ selectedMtn.name }}</h1>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'MtnPage',

  computed: {
    ...mapState({
      selectedMtn: (state) => state.selectedMtn,
    }),
  },
};
</script>
