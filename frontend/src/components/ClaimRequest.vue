<template>
<v-card>
<v-tabs
    fixed-tabs
    background-color="primary"
    dark
  >

    <v-tab>
        Antrag
    </v-tab>

    <v-tab>
        Ordnungswidrigkeit
    </v-tab>

    <v-tab-item >
          <v-card-title>Antrag stellen</v-card-title>
          <v-card-text>
          <form sm="4">
              <v-text-field
                v-model="headline"
                label="Überschrift"
                required
              ></v-text-field>
              <v-text-field
                v-model="an_text"
                label="Antragstext"
                required
              ></v-text-field>
              <v-btn class="mr-4" @click="submitAN">Antrag stellen</v-btn>
              <v-btn @click="clear">Zurücksetzen</v-btn>
              <v-spacer></v-spacer>
          </form>
          </v-card-text>
    </v-tab-item>

    <v-tab-item>
          <v-card-title>Ordnungswidrigkeit melden</v-card-title>
          <v-card-text>
          <form sm="4">
              <v-text-field
                v-model="personOfInterest"
                label="Beschuldigte"
                required
              ></v-text-field>
              <v-text-field
                v-model="ow_text"
                label="Tatbeschreibung"
                required
              ></v-text-field>
              <v-select
                v-model="ow_cat"
                :items="ow_all_cat"
                attach
                chips
                label="Kategorien"
                multiple
          ></v-select>
              <v-btn class="mr-4" @click="submitOW">Ordnungswidrigkeit melden</v-btn>
              <v-btn @click="clear">Zurücksetzen</v-btn>
              <v-spacer></v-spacer>
          </form>
          </v-card-text>
    </v-tab-item>
</v-tabs>
</v-card>

</template>

<script>
import axios from 'axios';
export default {
    data: () => ({
        headline : '',
        an_text : '',
        ow_text : '',
        personOfInterest : '',
        ow_cat : [],
        ow_all_cat: ['Öffentliches Ärgernis', 'Falschparken', 'Sachbeschädigung', 'Körperverletzung'],
    }),
    methods:{
        clear() {
          this.headline = '';
          this.an_text = '';
          this.ow_text = '';
          this.personOfInterest = '';
          this.ow_cat = [];
        },
        submitOW() {
          axios.post('/api/newGenehmigung', {
            name: this.headline,
            description: this.an_text,
            state: 'unbearbeitet'
          })
          .then((response) => {
            console.log(response);
          }, (error) => {
            console.log(error);
          });
          this.clear();
        },
        submitAN() {
          axios.post('/newOrdnungswidrigkeit', {
            name: this.personOfInteres,
            description: this.ow_text,
            type: this.ow_cat,
            state: 'unbearbeitet'
          })
          .then((response) => {
            console.log(response);
          }, (error) => {
            console.log(error);
          });
          this.clear();
        }
    },
}

</script>