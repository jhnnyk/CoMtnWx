<template>
  <div id="app">
    <TitleBar />
    <main>
      <MtnList />
      <router-view />
    </main>
  </div>
</template>

<script>
import { store } from './store';
import TitleBar from './components/TitleBar';
import MtnList from './components/MtnList';

export default {
  name: 'App',
  components: {
    TitleBar,
    MtnList,
  },

  async created() {
    // get all mountains
    await store.dispatch('getMtns');

    // if slug, get specific mtn info
    // if loading a page for a specific mountain, set current mtn
    if (this.$route.params.slug) {
      store.dispatch('selectMtn', this.$route.params.slug);
    }
  },

  watch: {
    $route() {
      store.dispatch('selectMtn', this.$route.params.slug);
    },
  },
};
</script>

<style>
/* coolor theme */
:root {
  --highlight: #e63946;
  --light: #f1faee;
  --accent: #a8dadc;
  --medium: #457b9d;
  --dark: #1d3557;
}

html {
  background-color: var(--light);
}

#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; */
  font-family: 'Inter', sans-serif;
  color: var(--dark);
}

body,
h1,
h2,
h3,
h4,
h5,
h6,
p,
ul,
li {
  margin: 0;
  padding: 0;
}

a {
  color: var(--medium);
  text-decoration: none;
}

li {
  list-style-type: none;
}

main {
  display: flex;
  flex-direction: row;
  width: 90vw;
  margin: 30px auto;
}
</style>
