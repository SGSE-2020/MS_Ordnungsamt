<template>
    <div id="feedOW">
        <v-card>
            <v-toolbar
                color="primary"
                dark
            >
            <v-toolbar-title>Aktuelle Ordnungswidrigkeiten</v-toolbar-title>
            </v-toolbar>
            <v-list dense>
                <v-list-item
                    v-for="(item, i) in owdata"
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
  name: 'FeedOW',
  data: () => ({
      owdata : []
  }),
  methods:{
    loadOWData(){
        axios.get('/api/ordnungswidrigkeiten')
        .then(response => {
          this.owdata = response.data
        })
        .catch(e => {
          console.log(e);
        })
    }
  },
  created() {
    this.loadOWData();
    this.interval = setInterval(() => this.loadOWData(), 5000)
  },
  beforeDestroy() {
    clearInterval(this.interval);
  }
}


</script>