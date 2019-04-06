<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Music Index</h1>
      <v-btn @click="move('/album/view-all-album-reviews')">전체보기</v-btn>
      <v-btn @click="move('/album/add-album-review')">추가</v-btn>      
    </div>
    <div>
      <RecentReviews/>
    </div>
  </section>
</template>

<script>
import RecentReviews from '~/components/RecentReviews'

export default {
  data() {
    return {
      reviews: []
    }
  },
  components: {
    RecentReviews,
  },
  mounted() {
  }, 
  methods: {
    move(target) {
        this.$router.push(target)
      }
    }
  }
  

</script>