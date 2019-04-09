<template>
  <section class="section">
    <div class="container">
        <ViewSingleReview/>
    </div>
  </section>
</template>

<script>
import ViewSingleReview from '~/components/ViewSingleReview'

export default {
  data() {
    return {
      reviews: []
    }
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
  }, 
  methods: {
    move(target) {
        this.$router.push(target)
      }
    }
  }
  

</script>