<template>
  <div class="mtn-page">
    <div v-if="selectedMtn">
      <h1>{{ selectedMtn.name }}</h1>
    </div>

    <div class="forecast">
      <h2>{{ selectedMtn.name }} Weather</h2>
      <div v-if="forecastLoading">
        ... loading weather forecast ...
      </div>
      <div v-else>
        <div v-for="(period, index) in forecast" :key="index">
          {{ period.name }}:
          <span v-if="period.isDaytime">High: </span>
          <span v-else>Low: </span>
          {{ period.temperature }}º{{ period.temperatureUnit }}
          {{ period.temperatureTrend }}<br />
          {{ period.shortForecast }}<br />
          <img :src="period.icon" :alt="period.shortForecast" /><br />
          {{ period.detailedForecast }}
        </div>
        {{ forecast }}
      </div>
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
      forecast: (state) => state.forecast,
      forecastLoading: (state) => state.forecastLoading,
    }),
  },
};
</script>
