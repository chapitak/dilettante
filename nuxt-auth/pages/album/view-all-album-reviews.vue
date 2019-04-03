<template>
  <div>
    <v-card-title>
      View All
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
      :items="reviews"
      :search="search"
      hide-actions
      :pagination.sync="pagination"
      class="elevation-1 text-xs-center"
    >
      <template v-slot:items="props">
        <tr> <!-- @click="move()"차후에 이동하도록 하자. https://codepen.io/nsiggel/pen/KRdGgE-->
          <td class="text-xs-center">{{ props.index + 1 }}</td>
          <td class="text-xs-center">{{ props.item.rating }}</td>
          <td class="text-xs-center">{{ props.item.album.album_name }}</td>
          <td class="text-xs-center">{{ props.item.album.artist_name }}</td>
          <td class="text-xs-center">{{ props.item.album.genre }}</td>
          <td class="text-xs-center">{{ props.item.album.released_date.substring(0,10) }}</td>
          <!--<td class="text-xs-center">{{ props.item.album.label }}</td>
          <td class="text-xs-center">{{ props.item.album.agency }}</td>-->
          <td class="text-xs-center" v-if="props.item.created_date !=null" >{{ props.item.created_date.substring(0,10) }}</td>
        </tr>
      </template>
    </v-data-table>
    <div class="text-xs-center pt-2">
      <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex' 
  export default {
    data () {
      return {
        search: '',
        pagination: {
          rowsPerPage: 20,
          totalItems: ''
        },
        selected: [],
        headers: [
          { text: '순번', value: 'index', align: 'center', width: '1%' },
          {
            text: '판점',
            //align: 'left',
            sortable: true,
            value: 'rating',
            align: 'center',
            width: '1%'
          },
          { text: 'title', value: 'album.album_name', align: 'center' },
          { text: 'artist', value: 'album.artist_name' , align: 'center' },
          { text: 'genre', value: 'album.genre' , align: 'center' },
          { text: 'released', value: 'album.released_date',sortable: true, align: 'center'  },
          /*{ text: 'label', value: 'label', align: 'center' },
          { text: 'agency', value: 'agency', align: 'center' },*/
          { text: 'created', value: 'created_date', align: 'center' }
        ],
        reviews: []
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
    computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
    },
    mounted () {
        this.$axios({
        url: 'http://54.180.32.24:1337/graphql',
        method: 'post',
        data: {
            query: `
            query {
                reviews(where: {user: {_id: "`+this.loggedInUser._id+`"} } ) {
                    _id
                    rating
                    review_title
                    review_text
                    created_date
                    album {
                    album_id
                    album_name
                    artist_id
                    artist_name
                    genre
                    released_date
                    label
                    agency
                    created_date
                    }
                }
                }

            `
        }
        }).then((result) => { 
            this.reviews = result.data.data.reviews
            this.pagination.totalItems = result.data.data.reviews.length
            console.log(this.reviews)
        })
        
    }
  }
</script>