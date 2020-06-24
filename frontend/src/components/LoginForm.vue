<template>
<div id="loginForm">
    <v-dialog v-model="showLoginForm" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
    <v-btn
        @click="showLoginForm = true"
        target="_blank"
        text
        v-bind="attrs"
        v-on="on"
      >
      <span class="mr-2">Anmeldung</span>
    </v-btn>
    </template>
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
import firebase from "firebase";

export default {
  name: 'LoginForm',
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
      }
  }
}
</script>

<style>

</style>