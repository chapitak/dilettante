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
          @input="filterSearch"
        ></v-text-field>
      </v-flex>
    </v-layout>
    <v-data-table
      :headers="headers"
      :items="reviews"
      :search="filters"
      hide-actions
      :pagination.sync="pagination"
      class="elevation-1 text-xs-center"
      :custom-filter="customFilter"
    >
      <template v-slot:items="props">
        <tr>
          <!-- @click="move()"차후에 이동하도록 하자. https://codepen.io/nsiggel/pen/KRdGgE-->
          <td class="text-xs-center">{{ props.index + 1 }}</td>
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
import { mapGetters } from "vuex";
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
      headers: [
        { text: "순번", value: "index", align: "center", width: "1%" },
        {
          text: "판점",
          //align: 'left',
          sortable: true,
          value: "rating",
          align: "center",
          width: "1%"
        },
        { text: "title", value: "album.album_name", align: "center" },
        { text: "artist", value: "album.artist_name", align: "center" },
        { text: "genre", value: "album.genre", align: "center" },
        {
          text: "released",
          value: "album.released_date",
          sortable: true,
          align: "center"
        },
        /*{ text: 'label', value: 'label', align: 'center' },
          { text: 'agency', value: 'agency', align: 'center' },*/
        { text: "created", value: "created_date", align: "center" }
      ],
      reviews: []
    };
  },
  methods: {
    customFilter(items, filters, filter, headers) {
      // Init the filter class.
      const cf = new this.$MultiFilters(items, filters, filter, headers);

      if (this.search_filter_type === "rating") {
        cf.registerFilter("search", function(searchWord, items) {
          if (searchWord.trim() === "") return items;
          return items.filter(item => {
            return item.rating == searchWord;
          }, searchWord);
        });
      }

      if (this.search_filter_type === "title") {
        cf.registerFilter("search", function(searchWord, items) {
          if (searchWord.trim() === "") return items;
          return items.filter(item => {
            return item.album.album_name.includes(searchWord);
          }, searchWord);
        });
      }

      if (this.search_filter_type === "artist") {
        cf.registerFilter("search", function(searchWord, items) {
          if (searchWord.trim() === "") return items;
          return items.filter(item => {
            return item.album.artist_name.includes(searchWord);
          }, searchWord);
        });
      }
      if (this.search_filter_type === "genre") {
        cf.registerFilter("search", function(searchWord, items) {
          if (searchWord.trim() === "") return items;
          return items.filter(item => {
            return item.album.genre.includes(searchWord);
          }, searchWord);
        });
      }
      if (this.search_filter_type === "released") {
        cf.registerFilter("search", function(searchWord, items) {
          if (searchWord.trim() === "") return items;
          return items.filter(item => {
            return item.album.released_date.includes(searchWord);
          }, searchWord);
        });
      }
      if (this.search_filter_type === "created") {
        cf.registerFilter("search", function(searchWord, items) {
          if (searchWord.trim() === "") return items;
          return items.filter(item => {
            return item.album.created_date.includes(searchWord);
          }, searchWord);
        });
      }

      /*cf.registerFilter('added_by', function (added_by, items) {
          if (added_by.trim() === '') return items;
          return items.filter(item => {
            return item.added_by.toLowerCase() === added_by.toLowerCase();
          }, added_by);
        });*/
      // Its time to run all created filters.
      // Will be executed in the order thay were defined.
      return cf.runFilters();
    },
    /**
     * Handler when user input something at the "Filter" text field.
     */
    filterSearch(val) {
      this.filters = this.$MultiFilters.updateFilters(this.filters, {
        search: val
      });
    },
    /**
     * Handler when user  select some author at the "Author" select.
     */
    filterAuthor(val) {
      this.filters = this.$MultiFilters.updateFilters(this.filters, {
        added_by: val
      });
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
    },
    ...mapGetters(["isAuthenticated", "loggedInUser"])
  },
  mounted() {
    this.$axios({
      url: "http://54.180.32.24:1337/graphql",
      method: "post",
      data: {
        query:
          `
            query {
                reviews(where: {user: {_id: "` +
          this.loggedInUser._id +
          `"} } ) {
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
    }).then(result => {
      this.reviews = result.data.data.reviews;
      this.pagination.totalItems = result.data.data.reviews.length;
      console.log(this.reviews);
    });
  }
};
</script>