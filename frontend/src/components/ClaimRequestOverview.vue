<template>
<v-card>
    <v-card-title>
      Bisherige Meldungen und Anträge
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="dataset"
      :search="search"
    ></v-data-table>
</v-card>

</template>

<script>
  export default {
    data () {
      return {
        search: '',
        headers : [
          {
            text: 'Antragsteller',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Beschreibung', value: 'description' },
          { text: 'Typ', value: 'type' },
          { text: 'Status', value: 'state' },
        ],
      }
    },
  }
</script>