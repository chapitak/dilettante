<template>
  <section class="section">
    <div class="container text-xs-center" >
      <h1 class="title">Music Index</h1>
      <v-btn @click="move('/album/view-all-album-reviews')">내 목록 전체보기(트래비스 테스트2)</v-btn>
      <!--<v-btn @click="move('/album/add-album-review')">쓰기</v-btn>-->
    </div>
    <div>
      <UserReviewsCount/>
    </div>
    <div>
      <RecentReviews/>
    </div>
  </section>
</template>

<script>
import RecentReviews from '~/components/RecentReviews'
import UserReviewsCount from '~/components/UserReviewsCount'

export default {
  data() {
    return {
      reviews: []
    }
  },
  components: {
    RecentReviews,
    UserReviewsCount
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