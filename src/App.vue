<template>
  <div id="app">
    <h1>Colorado Mountain Weather</h1>
    <MtnList />
    <router-view />
  </div>
</template>

<script>
import { store } from './store';
import MtnList from './components/MtnList';

export default {
  name: 'App',
  components: {
    MtnList,
  },

  created() {
    store.dispatch('getMtns');
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
