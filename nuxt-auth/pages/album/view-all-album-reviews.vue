<template>
  <div>
    <v-card-title>
      Nutrition
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
      hide-actions
      :pagination.sync="pagination"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{ props.item.name }}</td>
        <td class="text-xs-right">{{ props.item.calories }}</td>
        <td class="text-xs-right">{{ props.item.fat }}</td>
        <td class="text-xs-right">{{ props.item.carbs }}</td>
        <td class="text-xs-right">{{ props.item.protein }}</td>
        <td class="text-xs-right">{{ props.item.iron }}</td>
      </template>
    </v-data-table>
    <div class="text-xs-center pt-2">
      <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        search: '',
        pagination: {},
        selected: [],
        headers: [
          {
            text: '판점',
            //align: 'left',
            sortable: true,
            value: 'rating'
          },
          { text: 'title', value: 'album_name' },
          { text: 'artist', value: 'artist_name' },
          { text: 'genre', value: 'genre' },
          { text: 'released', value: 'released_date' },
          { text: 'label', value: 'label' },
          { text: 'agency', value: 'agency' },
          { text: 'created', value: 'created_date' }
        ],
        desserts: []
      }
    },
    computed: {
      pages () {
        if (this.pagination.rowsPerPage == null ||
          this.pagination.totalItems == null
        ) return 0

        return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
      }
    }, 
    mounted () {
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
        });         
    }
  }
</script>