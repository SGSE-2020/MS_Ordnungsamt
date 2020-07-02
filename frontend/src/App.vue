<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
    <router-link to="/">
      <div class="d-flex align-center">
        <v-img
          alt="Ordnungsamt Logo"
          class="shrink mr-2"
          contain
          src="./assets/ordnungsamt.png"
          transition="scale-transition"
          width="200"
        />
      </div>
    </router-link>

      <v-spacer></v-spacer>
      <LoginForm/>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>

//Ordnungsamt Components
import LoginForm from './components/LoginForm';
import axios from 'axios';
var auth = require('./firebase.js').auth


export default {
  name: 'App',

  components: {
    LoginForm
  },

  data: () => ({
    //
  }),
  mounted() {
    // Add Authorization with access token
    axios.interceptors.request.use(
      async (config) => {
        var token = await auth.currentUser.getIdToken(true)
        config.headers.Authorization = token
        console.log(
          'Token added to request: ' + config.method + ' ' + config.url
        )
        return config
      },
      (error) => {
        Promise.reject(error)
      }
    )
  }
};
</script>
