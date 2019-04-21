<template>
  <div class="ViewSingleReview" v-if="reviewId">
    <br>
    <template>
      <v-layout justify-center>
        <v-flex md8>
          <v-card>
            <div class="pa-2">
              <span>
                &nbsp;&nbsp;&nbsp;
                <b>{{reviewer_name}}</b>
              </span>
            </div>
            <v-parallax :src="parallax_src" height="160"></v-parallax>
            <!--<v-img
                src="http://s3.ap-northeast-2.amazonaws.com/dilettante/4275.jpg"
                aspect-ratio="2.75"
            ></v-img>-->

            <v-card-title primary-title>
              <div style="width:100%">
                <div>{{artist_name}}</div>
                <h3 class="headline mb-0">{{album_name}}</h3>
                <span>{{genre}} ☆{{rating}}</span>
                <span style="float:right">{{released_date.substring(0,10)}}</span>
                <br>
                <div class="pt-2">{{ review_text }}</div>
              </div>
            </v-card-title>

            <v-card-actions class="justify-center">
              <!-- <v-btn flat color="orange"><v-icon light>audiotrack</v-icon> 6</v-btn> -->
              <v-btn style="width:100%;" flat color="orange" @click="move(reviewId)">
                <v-icon light>comment</v-icon>&nbsp;more
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </template>
  </div>
</template>

<script>
export default {
  name: "ViewSingleReview",
  props: ["reviewId"],
  data() {
    return {
      artist_name: "언니네 이발관",
      album_name: "후일담",
      review_text:
        "5집보다 좋은 앨범이다. 동의하지 않는 사람과 논쟁하지 않겠다. 그는 논쟁할 가치가 없는 사람이기 때문이다.",
      released_date: "2001-01-23",
      rating: "4.0",
      genre: "Rock",
      parallax_src: "",
      reviewer_name: ""
    };
  },
  methods: {
    move(target) {
      this.$router.push("/album/reviews/" + target);
    }
  },
  mounted() {
    this.$axios
      .get("http://jeongkyo.kim:1337/reviews/" + this.reviewId)
      .then(response => {
        // Handle success.
        console.log(response.data);

        this.artist_name = response.data.album.artist_name;
        this.album_name = response.data.album.album_name;
        this.review_text = response.data.review_text;
        this.released_date = response.data.album.released_date;
        this.genre = response.data.album.genre;
        this.rating = response.data.rating;
        this.reviewer_name = response.data.user.username;
        this.reviewer_name = response.data.user.username;
        this.parallax_src =
          "http://s3.ap-northeast-2.amazonaws.com/dilettante/" +
          response.data.album.album_id +
          ".jpg";
      });
  },
  watch: {
    /*
    reviewId: function() {
        this.$axios.get('http://jeongkyo.kim:1337/reviews/' + this.reviewId)
        .then(response => {
          // Handle success.
          console.log(
            response.data
          );
          this.review = response.data
          this.parallax_src = "http://s3.ap-northeast-2.amazonaws.com/dilettante/" + this.review.album_id + ".jpg"
      })
    }*/
  }
};
</script>