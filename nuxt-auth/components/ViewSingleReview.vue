<template>
    <div class="container">
      <h1 class="title">review component</h1>
        <br>
        <template>
        <v-layout>
          <v-flex xs12 sm6 offset-sm3>
            <v-card>
              <v-parallax src="http://s3.ap-northeast-2.amazonaws.com/dilettante/4275.jpg" height="120"></v-parallax>
              <!--<v-img
                src="http://s3.ap-northeast-2.amazonaws.com/dilettante/4275.jpg"
                aspect-ratio="2.75"
              ></v-img>-->

              <v-card-title primary-title>
                <div>
                  <h3 class="headline mb-0">{{album_name}}</h3>
                  <span>☆{{rating}}</span><span style="float:right">{{released_date}}</span>
                  <br>
                  <div> {{ review_text }} </div>
                </div>
              </v-card-title>

              <v-card-actions>
                <v-btn flat color="orange">Share</v-btn>
                <v-btn flat color="orange">Explore</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </template>
    </div>
</template>

<script>
export default {
  name: 'ViewSingleReview',
  data() {
    return {
        album_name: "Kangaroo Valley Safari",
        review_text: 'Lorem ipsum dolor sit amet, brute iriure accusata ne mea. Eos suavitate referrentur ad, te duo agam libris qualisque, utroque quaestio accommodare no qui. Et percipit laboramus usu, no invidunt verterem nominati mel. Dolorem ancillae an mei, ut putant invenire splendide mel, ea nec propriae adipisci. Ignota salutandi accusamus in sed, et per malis fuisset, qui id ludus appareat.',
        released_date: "2001-01-23",
        rating: "4.0"
    }
  }
  //,  props: ['message']
}
</script>