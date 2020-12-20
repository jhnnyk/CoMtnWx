<template>
  <div class="title-bar">
    <h1>
      <router-link :to="{ name: 'landingpage' }">
        Colorado Mountain Weather
      </router-link>
    </h1>
  </div>
</template>

<style scoped>
.title-bar {
  background-color: var(--dark);
  text-align: center;
  padding: 10px;
}

a {
  color: var(--light);
}
</style>
