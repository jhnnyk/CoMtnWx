import Vue from 'vue';
import Vuex from 'vuex';
import { db } from './firebase';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    mtns: [],
  },

  getters: {},

  mutations: {
    setMtns: (state, mtns) => {
      state.mtns = mtns;
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
  },
});
