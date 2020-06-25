<template>
    <v-container>
        <v-row> <!-- The two row split -->
          <v-col md="4"> <!-- The left row -->
            <v-layout column> <!-- Vertical Layout -->
              <v-flex md6><FeedGN/></v-flex>
              <br>
              <v-flex md6><FeedOW/></v-flex>
            </v-layout>
          </v-col>
          <br>
          <v-col md="6" offset-md="1">
            <!-- BuergerPage Content Right Site -->
            <ClaimRequest/>
            <br>
            <ClaimRequestOverview/>
          </v-col>
        </v-row>
      </v-container>
</template>

<script>
import FeedGN from './FeedGN';
import FeedOW from './FeedOW';
import ClaimRequest from './ClaimRequest';
import ClaimRequestOverview from './ClaimRequestOverview'

export default {
    components: {
        FeedGN,
        FeedOW,
        ClaimRequest,
        ClaimRequestOverview
    },
}
</script>