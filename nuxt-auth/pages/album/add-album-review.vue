<template>
  <section class="section">
    <div class="container">
      <h1 class="title" align="center">add Index</h1>
      <div>
        
    <v-container>
    <form method="post" @submit.prevent="create">
      <v-layout row wrap>
        <v-flex
        xs12
        class="px-2 py-0">
          <v-text-field
            label="Url"
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
import { mapGetters } from 'vuex'

export default {
  middleware: 'auth',
  computed: {
    ...mapGetters(['loggedInUser'])
  }
}
</script>