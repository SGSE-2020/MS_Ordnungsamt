import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import * as firebase from "firebase";

Vue.config.productionTip = false

const configOptions = {
  apiKey: "AIzaSyBvTg0_QrhEvQ9UeZPH8--E2JZ55KA_u_c",
	authDomain: "smart-city-ss2020.firebaseapp.com",
	databaseURL: "https://smart-city-ss2020.firebaseio.com",
	projectId: "smart-city-ss2020",
  storageBucket: "smart-city-ss2020.appspot.com",
  messagingSenderId: "957240233717"
};

firebase.initializeApp(configOptions);

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
