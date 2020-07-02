<template>
  <div id="feedGN">
    <v-card>
      <v-toolbar
        color="primary"
        dark
      >
      <v-toolbar-title>Aktuelle Genehmigungen</v-toolbar-title>
      </v-toolbar>
      <v-list dense>
                <v-list-item
                    v-for="(item, i) in gndata"
                    :key="i"
                >
                <v-list-item-content>
                    <v-list-item-title v-text="item.description"></v-list-item-title>
                </v-list-item-content>
                </v-list-item>
            </v-list>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'FeedGN',
  data: () => ({
      gndata : []
  }),
  methods:{
    loadGNData(){
        axios.get('/api/genehmigungen')
        .then(response => {
          this.gndata = response.data
        })
        .catch(e => {
          console.log(e);
        })
    }
  },
  created() {
    this.loadGNData();
    this.interval = setInterval(() => this.loadGNData(), 5000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  }
}
</script>

<style>
</style>