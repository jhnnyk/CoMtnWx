import Vue from 'vue';
import Vuex from 'vuex';
import { db } from './firebase';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    mtns: [],
    selectedMtn: null,
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
        dispatch('getForecastURL', selectedMtn);
      }
    },

    getForecastURL: async (context, mtn) => {
      const response = await fetch(
        `https://api.weather.gov/points/${mtn.loc.x_},${mtn.loc.N_}`
      );
      const data = await response.json();
      const forecastURL = await data.properties.forecast;

      // update DB with forecast URL
      if (forecastURL !== mtn.forecastURL) {
        const spotRef = db.collection('spots').doc(mtn.id);
        try {
          await spotRef.update({
            forecastURL: forecastURL,
          });
        } catch (error) {
          console.log(error);
        }
        console.log('forecast URL updated!');
      } else {
        console.log('all set!');
      }
    },
  },
});
