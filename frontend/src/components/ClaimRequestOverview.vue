<template>
<v-card>
    <v-card-title>
      Bisherige Anträge
      <v-spacer></v-spacer>
      <v-text-field
        v-model="searchan"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      loading loading-text="Lädt... Bitte warten"
      :headers="headersan"
      :items="datasetan"
      :searchan="searchan"
    ></v-data-table>
    <br>
    <v-card-title>
      Bisherige Meldungen
    </v-card-title>
    <v-spacer></v-spacer>
      <v-text-field
        v-model="searchow"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    <v-data-table
      loading loading-text="Lädt... Bitte warten"
      :headers="headersow"
      :items="datasetow"
      :search="searchow"
    ></v-data-table>
</v-card>

</template>

<script>
  import axios from 'axios';
  import { mapGetters } from "vuex";
  import firebase from "firebase";

  export default {
    computed: {
    ...mapGetters({
    // map `this.user` to `this.$store.getters.user`
      user: "user"
    })
    },
    data () {
      return {
        searchan: '',
        searchow: '',
        headersan : [
          {
            text: 'Antragsteller',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Beschreibung', value: 'description' },
          { text: 'Status', value: 'state' },
        ],
        headersow : [
          {
            text: 'Beschuldigte',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Tatbeschreibung', value: 'description' },
          { text: 'Kategorie', value: 'type' },
          { text: 'Status', value: 'state' },
        ],
        datasetan : [],
        datasetow : []
      }
    },
    methods:{
      loadGNData(){
        axios.get('/api/gnofuser',{
          headers: {
            authorization: 'my secret token'
          }
        })
        .then(response => {
          this.datasetow = response.data
        })
        .catch(e => {
          console.log(e);
        })
      },
      loadANData(){
        firebase.currentUser.getIdToken(false).then(function(idToken){
          axios.get('/api/anofuser',{
            headers: {
              authorization: idToken
            }
          })
          .then(response => {
            this.datasetan = response.data;
            console.log(response);
          })
        })
        
        .catch(e => {
          console.log(e);
        })
      },
    },
    created() {
      this.loadGNData();
      this.loadANData();
    }
  }
</script>