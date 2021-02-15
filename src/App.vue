<template>
  <!-- App.vue -->
  <v-app>
    <!-- Sizes your content based upon application components -->
    <v-main>
      <v-app-bar app v-if="isDevelopment">
        <v-btn class="mx-2" @click.stop="$router.go(-1)" color="red">BACK</v-btn>
        <v-btn class="mx-2" @click.stop="$route.path === '/' || $router.push('/')" color="red">HOME</v-btn>
      </v-app-bar>
      <!-- Provides the application the proper gutter -->
      <v-container fluid class="fill-height">

        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
const io = require('socket.io-client');
export default {
  name: 'App',
  data () {
    return {
      isDevelopment: process.env.NODE_ENV === 'development'
    }
  },
  created() {
    const socket = io('http://localhost:3000');
    socket.on('connect', () => console.log('successfully connected to server: ' + socket.id));
    socket.on('disconnect', () => console.log('disconnected client: ' + socket.id));
    this.$store.commit('register', socket);
  }
};
</script>
