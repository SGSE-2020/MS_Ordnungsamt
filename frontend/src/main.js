import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
//import * as firebase from "firebase";
import store from "./store";
import router from "./routes/index";

Vue.config.productionTip = false

// const configOptions = {
//   apiKey: "AIzaSyBvTg0_QrhEvQ9UeZPH8--E2JZ55KA_u_c",
// 	authDomain: "smart-city-ss2020.firebaseapp.com",
// 	databaseURL: "https://smart-city-ss2020.firebaseio.com",
// 	projectId: "smart-city-ss2020",
//   storageBucket: "smart-city-ss2020.appspot.com",
//   messagingSenderId: "957240233717"
// };

//firebase.initializeApp(configOptions);

// firebase.auth().onAuthStateChanged(user => {
//   store.dispatch("fetchUser", user);
//   console.log(JSON.stringify(user));
// });

// firebase.auth().currentUser.getIdToken(false).then(function(idToken) {
//   store.dispatch("storeToken",idToken);
// }).catch(function(error) {
//   console.log(error);
// });

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
