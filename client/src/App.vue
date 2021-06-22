<template>
  <v-app>
    <Home />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Home from '@/pages/Home.vue';

export default Vue.extend({
  name: 'App',

  components: {
    Home,
  },
});
</script>
