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
      <v-container>
        <v-layout row> <!-- The two row split -->
          <v-flex md6> <!-- The left row -->
            <v-layout column> <!-- Vertical Layout -->
              <v-flex md6><FeedGN/></v-flex>
              <v-flex md6><FeedOW/></v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-container>
      
    </v-content>
  </v-app>
</template>

<script>

//Ordnungsamt Components
import LoginForm from './components/LoginForm';
import FeedGN from './components/FeedGN';
import FeedOW from './components/FeedOW';

export default {
  name: 'App',

  components: {
    LoginForm,
    FeedGN,
    FeedOW
  },

  data: () => ({
    //
  })
};
</script>
