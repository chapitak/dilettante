<template>
  <section class="section">
    <div class="container text-xs-center" style="max-width:457.52px" >
      <h1 class="title"><b>음악</b></h1>
      <v-btn @click="move('/album/datatables/')" style="float:right;" flat class="pa-0">목록 전체보기</v-btn>
      <!--<v-btn @click="move('/album/add-album-review')">쓰기</v-btn>-->
    </div>
    <!-- <div>
      <UserReviewsCount/>
    </div> -->
    <div>
      <RecentReviews/>
    </div>
  </section>
</template>

<script>
import RecentReviews from '~/components/RecentReviews'
// import UserReviewsCount from '~/components/UserReviewsCount'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      reviews: []
    }
  },
  components: {
    RecentReviews,
    // UserReviewsCount
  },
  mounted() {
  }, 
  computed: {
  ...mapGetters(['isAuthenticated', 'loggedInUser'])
  },
  methods: {
    move(target) {
        this.$router.push(target + this.loggedInUser._id)
      }
    }
  }
  

</script>