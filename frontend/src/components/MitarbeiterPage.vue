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
      :headers="headersan"
      :items="datasetan"
      :searchan="searchan"
    ></v-data-table>
    <br>
    <v-card-title>
      Bisherige Meldungen
      <v-spacer></v-spacer>
      <v-text-field
        v-model="searchow"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headersow"
      :items="datasetow"
      :search="searchow"
    ></v-data-table>
</v-card>

</template>

<script>
  import axios from 'axios';
  import { mapGetters } from "vuex";
  
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
          axios.get('/api/gnofall')
          .then(response => {
            this.datasetow = response.data;
            console.log(response);
          })
      },
      loadANData(){
          axios.get('/api/anofall')
          .then(response => {
            this.datasetan = response.data;
            console.log(response);
          })
      },
    },
    created() {
      this.loadGNData();
      this.loadANData();
    }
  }
</script>