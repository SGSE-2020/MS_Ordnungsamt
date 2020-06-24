<template>
<div id="loginForm">
    
    <template v-if="user.loggedIn">
        <span class="mr-2">{{user.data.displayName}}</span>
        <v-btn
            href="/buerger"
            text
        >
            <span class="mr-2">Buergerportal</span>
        </v-btn>
        <v-btn
            @click="signOut();"
            target="_blank"
            text
        >
            <span class="mr-2">Abmelden</span>
        </v-btn>
    </template>
    <template v-else>
        <v-btn
            @click="showLoginForm = true"
            target="_blank"
            text
        >
            <span class="mr-2">Anmeldung</span>
        </v-btn>
    </template>
    
    <v-dialog v-model="showLoginForm" persistent max-width="600px">
    <v-card>
        <v-card-title>
          <span class="headline">Smart City Login</span>
        </v-card-title>
        <v-alert v-if="wrongLogin == true" type="error">
            Fehlerhafter Login
        </v-alert>
        <v-card-text>
            <v-form v-model="isValid">
                <v-text-field
                    label="Email" 
                    v-model="email"
                    :rules="[v => !!v || 'Email wird benötigt']"
                    required
                ></v-text-field>
                <v-text-field
                    label="Password" 
                    v-model="password"
                    type="password"
                    :rules="[v => !!v || 'Password wird benötigt']"
                    required
                ></v-text-field>
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-btn color="primary" @click="showLoginForm = false; wrongLogin = false;" >Abbrechen</v-btn>
            <v-btn color="primary" @click="submit(); wrongLogin = false;" :disabled="!isValid">Login</v-btn>
        </v-card-actions>
    </v-card>
    </v-dialog>
</div>
</template>

<script>

//External Components
import { mapGetters } from "vuex";
import firebase from "firebase";

export default {
  name: 'LoginForm',
  computed: {
    ...mapGetters({
    // map `this.user` to `this.$store.getters.user`
      user: "user"
    })
  },
  data: () => ({
      showLoginForm: false,
      email : null,
      password: null,
      isValid: true,
      wrongLogin: false
  }),
  methods: {
      submit() {
        firebase
            .auth()
            .signInWithEmailAndPassword(this.email, this.password)
            .then(data => {
                this.showLoginForm = false;
                console.log(data)
            })
            .catch( ()=> {
                this.wrongLogin = true;
            });
      },
      signOut() {
        firebase
            .auth()
            .signOut()
            .then(() => {
              this.$router.replace({
                name: "publicpage"
              });
            });
    }
  }
}
</script>

<style>

</style>