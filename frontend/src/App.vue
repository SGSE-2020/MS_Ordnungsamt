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


export default {
  name: 'App',

  components: {
    LoginForm
  },

  data: () => ({
    //
  })
};
</script>
