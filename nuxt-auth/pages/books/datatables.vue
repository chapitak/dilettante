<template>
  <div>
    <v-layout row wrap>
      <v-spacer></v-spacer>
      <v-flex xs2>
        <v-select v-model="search_filter_type" :items="filter_type" label="filter"></v-select>
      </v-flex>
      <v-flex xs6>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Search"
          hide-details
        ></v-text-field>
      </v-flex>
    </v-layout>
    <v-data-table
      :items="posts"
      :search="filters"
      hide-actions
      :pagination.sync="pagination"
      class="elevation-1 text-xs-center"
    >
      <template v-slot:items="props">
        <tr @click="move(props.item._id)">
          <!-- @click="move()"차후에 이동하도록 하자. https://codepen.io/nsiggel/pen/KRdGgE-->
          <td class="text-xs-center">{{ (pagination.page-1)*pagination.rowsPerPage + props.index + 1 }}</td>
          <td class="text-xs-center">{{ props.item.rating }}</td>
          <td class="text-xs-center">{{ props.item.album.album_name }}</td>
          <td class="text-xs-center">{{ props.item.album.artist_name }}</td>
          <td class="text-xs-center">{{ props.item.album.genre }}</td>
          <td class="text-xs-center">{{ props.item.album.released_date.substring(0,10) }}</td>
          <!--<td class="text-xs-center">{{ props.item.album.label }}</td>
          <td class="text-xs-center">{{ props.item.album.agency }}</td>-->
          <td
            class="text-xs-center"
            v-if="props.item.created_date !=null"
          >{{ props.item.created_date.substring(0,10) }}</td>
        </tr>
      </template>
    </v-data-table>
    <div class="text-xs-center pt-2" v-if="pages !== undefined">
      <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      search: "",
      search_filter_type: "title",
      filter_type: [
        "rating",
        "title",
        "artist",
        "genre",
        "released",
        "created"
      ],
      filters: {
        search: ""
      },
      pagination: {
        rowsPerPage: 20,
        totalItems: ""
      },
      selected: [],
      posts: []
    };
  },
  methods: {
    move(target) {
        this.$router.push("/books/" + target)
    }
  },
  computed: {
    pages() {
      if (
        this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      )
        return 0;

      return Math.ceil(
        this.pagination.totalItems / this.pagination.rowsPerPage
      );
    }
  },
  mounted() {
    this.$axios({
      url: "http://54.180.32.24:1337/graphql",
      method: "post",
      data: {
        query: // uid: 5be4e9f33d8f73560515f2fa
          `
            query {
            posts(limit: 5000 where: {type: "book"}) {
                _id
                title
                created_date
                type
            }
            }

            `
      }
    }).then(result => {
      this.posts = result.data.data.posts;
      this.pagination.totalItems = result.data.data.posts.length;
      console.log(this.posts);
      this.posts.sort(function(a, b) { // 오름차순
      if(b.album.released_date > a.album.released_date) {
        return 1;
      }
      if(a.album.released_date > b.album.released_date) {
        return -1;
      }
      return 0;
      });
    });
  }
};
</script>