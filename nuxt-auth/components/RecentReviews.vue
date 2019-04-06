<template>
  <section class="section">
    
    <div class="container">
      <div><h1 class="title text-xs-center"><b>최근 등록된 리뷰</b></h1></div>
      <div v-for="review in reviews" :key="review._id">
        
        <ViewSingleReview :reviewId="review._id" />
      </div>
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
      reviews: []
    }
  },
  mounted() {
    this.$axios.get('http://jeongkyo.kim:1337/reviews?_limit=10')
      .then(response => {
        // Handle success.
        console.log(
          response.data
        );
        this.reviews = response.data
    })
  }, 
  methods: {
  }
}
</script>