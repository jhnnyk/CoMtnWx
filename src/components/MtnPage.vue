<template>
  <div class="mtn-page">
    <div v-if="selectedMtn">
      <h1>{{ selectedMtn.name }}</h1>
      <p>{{ selectedMtn.range }}</p>
      <p>{{ selectedMtn.el }} ft.</p>

      <div class="forecast">
        <h2>{{ selectedMtn.name }} Weather</h2>
        <div v-if="forecastLoading">
          ... loading weather forecast ...
        </div>
        <div v-else class="periods">
          <div
            v-for="(period, index) in forecast"
            :key="index"
            class="period-card"
          >
            <p class="period-header">
              {{ period.name }} -
              {{ period.shortForecast }}
            </p>

            <div class="period-content">
              <div class="primary-info">
                <p>
                  <span>{{ period.temperature }}</span>
                  º{{ period.temperatureUnit }}
                </p>
                <p>Wind: {{ period.windSpeed }}</p>
              </div>

              <div class="weather-icon">
                <img :src="period.icon" :alt="period.shortForecast" />
              </div>

              <div class="weather-details">
                <p>{{ period.detailedForecast }}</p>
              </div>
            </div>
          </div>
        </div>
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

<style scoped>
.mtn-page {
  width: 65vw;
}

.periods {
  display: flex;
  flex-direction: column;
}

.period-card {
  border-radius: 10px;
  margin-bottom: 15px;
  padding: 5px 10px 10px 10px;
  background-image: linear-gradient(var(--accent), var(--light));
}

.period-header {
  font-weight: bold;
  padding-bottom: 5px;
}

.period-content {
  display: flex;
  flex-direction: row;
}

.period-content div {
  flex: 1;
}

.period-content .weather-details {
  flex-grow: 3;
}

.primary-info {
  text-align: center;
}

.primary-info span {
  font-size: 3.5em;
  font-weight: bold;
}

.period-content img {
  object-fit: cover;
  border-radius: 5px;
  margin: 0 10px;
}
</style>
