<template>
  <section class="section">
    
    <div class="container">
      <div><h1 class="title text-xs-center"><b>통계</b></h1></div>
      <br>
      <div v-for="user in users" :key="user.key">
        <ViewSingleUserReviewCount :userId="user.key" :reviewCount="user.connection.aggregate.count" />
      </div>
    </div>
    <br>
  </section>
</template>


<script>
import ViewSingleUserReviewCount from '~/components/ViewSingleUserReviewCount'

export default {
  components: {
    ViewSingleUserReviewCount,
  },
  data() {
    return {
      users: []
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
                reviewsConnection(limit:5000) {
                    groupBy {
                    user {
                        key 
                        connection {
                        aggregate{
                            count
                        }
                        }
                    }
                    }
                }
                }

            `
      }
    }).then(result => {
      this.users = result.data.data.reviewsConnection.groupBy.user 
      var sortingField = "connection.aggregate.count";

      this.users.sort(function(a, b) { // 오름차순
      return b.connection.aggregate.count - a.connection.aggregate.count;
      // 13, 21, 25, 44
        });
      console.log(this.users);
    });
  }, 
  methods: {
  }
}
</script>