<template>
  <div class="mtn-list">
    <ul>
      <li v-for="(range, index) in mtnsByRange" :key="index">
        <h3>{{ range.name }}</h3>
        <ul>
          <li v-for="mtn in range.mtns" :key="mtn.slug">
            <router-link :to="{ name: 'mtnpage', params: { ...mtn } }">
              {{ mtn.name }} ({{ mtn.el }} ft.)
            </router-link>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'MtnList',
  computed: {
    ...mapGetters(['mtnsByRange']),
  },
};
</script>

<style scoped>
.mtn-list {
  width: 25vw;
}
</style>
