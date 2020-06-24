<template>
    <v-container>
        <v-layout row> <!-- The two row split -->
          <v-flex md6> <!-- The left row -->
            <v-layout column> <!-- Vertical Layout -->
              <v-flex md6><FeedGN/></v-flex>
              <v-flex md6><FeedOW/></v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-container>
</template>

<script>
import FeedGN from './FeedGN';
import FeedOW from './FeedOW';

export default {
    components: {
        FeedGN,
        FeedOW
    },
}

</script>