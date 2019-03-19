<template>
  <section class="section">
    <div class="container">
      <h1 class="title" align="center">add Index</h1>
      <div>
        
    <v-container>
    <form method="post" @submit.prevent="submit">
      <v-layout row wrap>
        <v-flex
        xs12
        class="px-2 py-0">
          <v-text-field
            label="Url"
            v-model="url"
          ></v-text-field>
         </v-flex>
        <v-flex
          xs12
          md4
          class="px-2 py-0"
        >
          <v-text-field
            v-model="album_name"
            label="앨범명"            
          ></v-text-field>
        </v-flex>

        <v-flex
          xs12
          md4
          class="px-2 py-0"
        >
          <v-text-field
            v-model="artist_name"
            label="아티스트"
          ></v-text-field>
        </v-flex>

        <v-flex
          xs12
          md4
          class="px-2 py-0"
        >
          <v-text-field
            v-model="genre"
            label="장르"
          ></v-text-field>
        </v-flex>
        <v-flex
          xs12
          md4
          class="px-2 py-0"
        >
          <v-text-field
            v-model="released_date"
            label="발매일"
          ></v-text-field>
        </v-flex>

        <v-flex
          xs12
          md4
          class="px-2 py-0"
        >
          <v-text-field
            v-model="label"
            label="발매사"
          ></v-text-field>
        </v-flex>

        <v-flex
          xs12
          md4
          class="px-2 py-0"
        >
          <v-text-field
            v-model="agency"
            label="기획사"
          ></v-text-field>
        </v-flex>
        <v-flex
          xs12
          md4
          class="px-2 py-0"
        >
          <v-rating
          v-model="rating"
          color="yellow darken-3"
          background-color="grey darken-1"
          empty-icon="$vuetify.icons.ratingFull"
          half-increments
          hover
        ></v-rating>
        </v-flex>
        <v-flex 
        class="px-2 py-0"
        xs12>
        <v-textarea
          outline
          name="review"
          label="리뷰"
          value=""
          v-model="review"
          hint="작성해주세요."
        ></v-textarea>
        </v-flex>
      </v-layout>
      <div class="control">
            <v-btn type="submit" style="display:block;float:right;">Register</v-btn>
          </div>
          </form>
    </v-container>
      </div>
    </div>
  </section>
</template>

<script>

export default {
  data() {
    return {
      url: '',
      album_id: '',
      album_name: '',
      artist_name: '',
      genre: '',
      released_date: '',
      label: '',
      agency: '',
      rating: null,
      review: ''
    }
  },
  methods: {
    create_album_info() {
      this.$axios.post('graphql', {
        query: `
        mutation {
          createAlbum(input: {
            data: {
              album_id: "`+this.album_id+`",
              album_name: "`+this.album_name+`",
              artist_id: "`+this.artist_id+`",
              artist_name: "`+this.artist_name+`",
              thumbnail: "`+this.thumbnail+`",
              url: "`+this.url+`",
              released_date: "`+this.released_date+`",,
              genre: "`+this.genre+`",
              label: "`+this.label+`",
              agency: "`+this.agency+`",
              created_user: "`+this.created_user+`",
              created_date: "`+this.created_date+`"
            }
          }) {
            album {
              album_id
              album_name
              artist_id
              artist_name
              thumbnail
              url
              released_date
              genre
              label
              agency
              created_user
              created_date
            }
          }
        }
        `
      })
    },
    create_review() {

    },
    submit() {
      this.create_album_info()
    },
  }
}
</script>