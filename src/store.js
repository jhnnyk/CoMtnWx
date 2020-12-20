import Vue from 'vue';
import Vuex from 'vuex';
import { db } from './firebase';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    mtns: [],
    selectedMtn: null,
    forecast: [],
    forecastLoading: false,
  },

  getters: {
    mtnsByRange: (state) => {
      const ranges = [];

      state.mtns.forEach((mtn) => {
        let index = ranges.findIndex((r) => r.name === mtn.range);

        if (index === -1) {
          ranges.push({ name: mtn.range, mtns: [mtn] });
        } else {
          ranges[index].mtns.push(mtn);
        }
      });

      return ranges;
    },
  },

  mutations: {
    setMtns: (state, mtns) => {
      state.mtns = mtns;
    },
    setSelectedMtn: (state, mtn) => {
      state.selectedMtn = mtn;
    },
    setForecast: (state, forecast) => {
      state.forecast = forecast;
    },
    setForecastLoading: (state, val) => {
      state.forecastLoading = val;
    },
  },

  actions: {
    getMtns: async ({ commit }) => {
      const mtnList = [];

      const snapshot = await db
        .collection('spots')
        .orderBy('el', 'desc')
        .get();

      if (snapshot.empty) {
        console.log('No matching documents');
        return;
      }

      snapshot.forEach((mtn) => {
        mtnList.push({ id: mtn.id, ...mtn.data() });
      });

      commit('setMtns', mtnList);
    },

    selectMtn: async ({ dispatch, commit, state }, slug) => {
      const selectedMtn = await state.mtns.find((m) => m.slug === slug);
      commit('setSelectedMtn', selectedMtn);

      if (selectedMtn) {
        commit('setForecastLoading', true);
        dispatch('getForecastURL', selectedMtn);
        dispatch('getForecast', selectedMtn);
      }
    },

    getForecastURL: async (context, mtn) => {
      const response = await fetch(
        `https://api.weather.gov/points/${mtn.loc.x_},${mtn.loc.N_}`
      );
      const data = await response.json();
      const forecastURL = await data.properties.forecast;

      // update DB with forecast URL if needed
      // ----------------------------------
      // if the DB does need updated with a new forecastURL,
      // the below will run and generate an error
      // because of firebase permissions
      // I'm leaving it like this because per the API docs at:
      // https://weather-gov.github.io/api/general-faqs
      // it should rarely need updating.
      if (forecastURL !== mtn.forecastURL) {
        const spotRef = db.collection('spots').doc(mtn.id);
        try {
          await spotRef.update({
            forecastURL: forecastURL,
          });
        } catch (error) {
          console.log(error);
        }
      }
    },

    getForecast: async ({ commit }, mtn) => {
      const response = await fetch(mtn.forecastURL);
      const data = await response.json();
      const forecast = await data.properties.periods;
      commit('setForecast', forecast);
      commit('setForecastLoading', false);
    },
  },
});
