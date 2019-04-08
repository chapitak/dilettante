<template>
  <section class="section">
    
    <div class="container">
      <div><h1 class="title text-xs-center"><b>최근 등록된 리뷰</b></h1></div>
      <div v-for="review in reviews" :key="review._id">
        
        <ViewSingleReview :reviewId="review._id" />
      </div>
      <v-btn @click="appendReviews()">더 보기</v-btn>
    </div>
  </section>
</template>


<script>
import ViewSingleReview from '~/components/ViewSingleReview'

export default {
  components: {
    ViewSingleReview,
  },
  data() {
    return {
      reviews: [],
      page: 1,
      paging: 10
    }
  },
  mounted() {
    this.$axios.get('http://jeongkyo.kim:1337/reviews?_sort=createdAt:desc&_limit=' + this.paging)
      .then(response => {
        // Handle success.
        console.log(
          response.data
        );
        this.reviews = response.data
    })
  }, 
  methods: {
    appendReviews() {
      this.$axios.get('http://jeongkyo.kim:1337/reviews?_sort=createdAt:desc&_limit=' + this.paging + '&_start=' + this.page*this.paging)
        .then(response => {
          // Handle success.
          console.log(
            response.data
          );
          this.reviews = this.reviews.concat(response.data)
      })

    }
  }
}
</script>