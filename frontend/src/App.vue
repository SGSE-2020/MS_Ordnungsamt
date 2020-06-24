<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
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

      <v-spacer></v-spacer>
      <LoginForm/>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
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
