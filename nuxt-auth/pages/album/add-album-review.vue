

<template>
  <section class="section">
    <div class="container">
      <h1 class="title" align="center">add Index</h1>
      <div>
        <v-container>
          <form method="post" @submit.prevent="submit">
            <v-layout row wrap>
              <v-flex xs12 class="px-2 py-0">
                <v-text-field label="Url" v-model="url"></v-text-field>
              </v-flex>
              <v-flex xs12 md4 class="px-2 py-0">
                <v-text-field v-model="album_name" label="앨범명"></v-text-field>
              </v-flex>

              <v-flex xs12 md4 class="px-2 py-0">
                <v-text-field v-model="artist_name" label="아티스트"></v-text-field>
              </v-flex>

              <v-flex xs12 md4 class="px-2 py-0">
                <v-text-field v-model="genre" label="장르"></v-text-field>
              </v-flex>
              <v-flex xs12 md4 class="px-2 py-0">
                <v-text-field v-model="released_date" label="발매일"></v-text-field>
              </v-flex>

              <v-flex xs12 md4 class="px-2 py-0">
                <v-text-field v-model="label" label="발매사"></v-text-field>
              </v-flex>

              <v-flex xs12 md4 class="px-2 py-0">
                <v-text-field v-model="agency" label="기획사"></v-text-field>
              </v-flex>
              <v-flex xs12 md4 class="px-2 py-0">
                <v-rating
                  v-model="rating"
                  color="yellow darken-3"
                  background-color="grey darken-1"
                  empty-icon="$vuetify.icons.ratingFull"
                  half-increments
                  hover
                ></v-rating>
              </v-flex>
              <v-flex class="px-2 py-0" xs12>
                <v-textarea outline name="review" label="리뷰" value v-model="review_text" hint="작성해주세요."></v-textarea>
              </v-flex>
            </v-layout>
            <div class="control">
              <v-btn type="submit" style="display:block;float:right;">Register</v-btn>
            </div>
          </form>
        </v-container>
      </div>
    </div>
    <v-snackbar
      v-model="snackbar"
      :bottom="y === 'bottom'"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      :right="x === 'right'"
      :timeout="timeout"
      :top="y === 'top'"
      :vertical="mode === 'vertical'"
    >
      {{ text }}
      <v-btn
        color="pink"
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
const request = require("request");
const cheerio = require("cheerio");

export default {
  data() {
    return {
      url: "",
      album_id: "",
      album_name: "",
      artist_id: "",
      artist_name: "",
      thumbnail: "",
      genre: "",
      released_date: "",
      label: "",
      agency: "",
      rating: null,
      review_title: "",
      review_text: "",
      album_exists: false,
      review_exists: false,
      review_update_target_id: "",
      album_target_id: "",

      //이하 스낵바옵션
      snackbar: false,
      y: 'top',
      x: null,
      mode: '',
      timeout: 6000,
      text: '저장이 완료되었습니다.'
    };
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
  },
  watch: {
    url: function() {
      var url_string = this.url; //window.location.href
      var external_url = new URL(url_string);
      var query_string_albumId = external_url.searchParams.get("albumId");
      
      this.$axios.get('https://asia-northeast1-orbital-builder-208407.cloudfunctions.net/function-1?albumId=' + query_string_albumId)
      .then(response => {
        // Handle success.
        console.log(
          response.data
        );
        this.album_id = response.data.json_album_id
        this.album_name = response.data.json_album_name
        this.artist_id = response.data.json_artist_id
        this.artist_name = response.data.json_artist_name
        this.thumbnail = response.data.json_thumbnail
        this.released_date = response.data.json_released_date
        this.genre = response.data.json_genre
        this.label = response.data.json_label
        this.agency = response.data.json_agency

        this.check_album_info(this.album_id)
        this.check_review(this.album_id)
      })      
    }
  },
  mounted() {
  },
  methods: {
    submit() {
      //총 3가지 플로우가 있다. 1. ablum과 review모두 신규, 2. album은 있고 review신규, 3. album은 있고 review는 업데이트. 
      if(this.album_exists == false) {
        this.create_album_info(); //처음 들어가는 앨범은 여기서 생성. 이 안에서 create review까지 해결. 1번이다. 
        this.snackbar=true
        return
      } else {
        
      }
      if(this.review_exists == false) {
        this.create_review(); //2번이다.
      } else {
        this.update_review() //3번이다.
      }
      this.snackbar=true
    },
    check_album_info(album_id) {
      this.$axios({
        url: 'http://54.180.32.24:1337/graphql',
        method: 'post',
        data: {
            query: `
            query {
              albums(where: {album_id : "`+album_id+`"} ) {
                _id
                album_name
              }
            }
            `
        }
        }).then((result) => { 
          if(result.data.data.albums.length == 0){
            this.album_exists = false
            console.log("신규")
            console.log(result.data.data)
            this.album_exists = false
            this.album_target_id = ""
          } else {
            this.album_exists = true
            this.album_target_id = result.data.data.albums[0]._id
            console.log("있음")
          }
        }); 
    },
    check_review(album_id){
      this.$axios({
        url: 'http://54.180.32.24:1337/graphql',
        method: 'post',
        data: {
            query: `
            query {
              reviews(where: {album_id : "`+album_id+`", user: {_id: "`+this.loggedInUser._id+`"} } ) {
                _id
                rating
                review_text
              }
            }
            `
        }
        }).then((result) => { 
          if(result.data.data.reviews.length == 0){
            this.review_exists = false
            console.log("신규")
            console.log(result.data.data)
            this.review_exists = false
            this.review_update_target_id = ""
            this.rating = ""
            this.review_text = ""
          } else {
            this.review_exists = true
            this.review_update_target_id = result.data.data.reviews[0]._id
            this.rating = Number(result.data.data.reviews[0].rating)
            this.review_text = result.data.data.reviews[0].review_text
            console.log("있음")
          }
        }); 
    },
    create_review() {
      this.$axios
        .post(`http://jeongkyo.kim:1337/reviews/`, {
          album_id: this.album_id,
          rating: this.rating,
          review_title: null,
          review_text: this.review_text,
          album: this.album_target_id
        })
        .then(response => {
          // Handle success.
          console.log(
            "Well done, your post has been successfully created: ",
            response.data
          );
            this.review_exists = true
        })
        .catch(error => {
          // Handle error.
          console.log("An error occurred:", error);
        });
    },
    update_review() {
      this.$axios({
        url: 'http://54.180.32.24:1337/graphql',
        method: 'post',
        data: {
            query: `
            mutation {
              updateReview(input: {
                where: {id: "`+this.review_update_target_id+`"},
                data: {
                  rating: "`+this.rating+`",
                  review_title: "`+this.review_title+`",
                  review_text: "`+this.review_text+`",      
                  album: "`+this.review_text+`"      
                }
              }) {
                review {
                  rating
                  review_title
                  review_text
                }
              }
            }
            `
        }
        }).then((result) => { 
        }); 
    },
    create_album_info() {
      this.$axios
        .post(`http://jeongkyo.kim:1337/albums/`, {
          album_id: this.album_id,
          album_name: this.album_name,
          artist_id: this.artist_id,
          artist_name: this.artist_name,
          thumbnail: this.thumbnail,
          url: this.url,
          released_date: this.released_date,
          genre: this.genre,
          label: this.label,
          agency: this.agency,
          created_user: this.created_user
        })
        .then(response => {
          // Handle success.
          console.log(
            "Well done, your post has been successfully created: ",
            response.data
          );
          this.album_target_id = response.data.id
          this.create_review() 
        })
        .catch(error => {
          // Handle error.
          console.log("An error occurred:", error);
        });
    }
  }
};
</script>
