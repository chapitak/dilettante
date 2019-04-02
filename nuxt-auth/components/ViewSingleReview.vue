<template>
    <div class="container">
      
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
                  <div>{{artist_name}}</div>
                  <h3 class="headline mb-0">{{album_name}}</h3>
                  <span>{{genre}} ☆{{rating}} </span><span style="float:right">{{released_date}}</span>
                  <br>
                  <div class="pt-2"> {{ review_text }} </div>
                </div>
              </v-card-title>

              <v-card-actions>
                <v-btn flat color="orange">Kiss</v-btn>
                <v-btn flat color="orange">Comment</v-btn>
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
        artist_name: "언니네 이발관",
        album_name: "후일담",
        review_text: '5집보다 좋은 앨범이다. 동의하지 않는 사람과 논쟁하지 않겠다. 그는 논쟁할 가치가 없는 사람이기 때문이다.',
        released_date: "2001-01-23",
        rating: "4.0",
        genre: "Rock"
    }
  }
  //,  props: ['message']
}
</script>