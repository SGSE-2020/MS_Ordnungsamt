<template>
    <v-container>
        <v-row> <!-- The two row split -->
          <v-col md="6"> <!-- The left row -->
            <v-layout column> <!-- Vertical Layout -->
              <v-flex md6><FeedGN/></v-flex>
              <br>
              <v-flex md6><FeedOW/></v-flex>
            </v-layout>
          </v-col>
          <br>
          <v-col md="4" offset-md="1">
            <News/>
          </v-col>
        </v-row>
      </v-container>
</template>

<script>
import FeedGN from './FeedGN';
import FeedOW from './FeedOW';
import News from './News'

export default {
    components: {
        FeedGN,
        FeedOW,
        News
    },
}

</script>