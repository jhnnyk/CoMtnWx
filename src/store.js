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
        mtnList.push(mtn.data());
      });

      commit('setMtns', mtnList);
    },

    selectMtn: async ({ commit, state }, slug) => {
      const selectedMtn = await state.mtns.find((m) => m.slug === slug);
      commit('setSelectedMtn', selectedMtn);
    },
  },
});
