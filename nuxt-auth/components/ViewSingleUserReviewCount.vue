<template>
  <div class="ViewSingleUserReviewCount">
    <div class="container text-xs-center">
        <b>{{this.username}}</b>&nbsp;&nbsp;{{reviewCount}} 개
    </div>
  </div>
</template>


<script>

export default {
  name: 'ViewSingleUserReviewCount',
  props: ['userId', 'reviewCount'],
  data() {
    return {
      username: ""
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
                users(where:{id:"`+ this.userId +`"}) {
                    username
                }
            }

            `
      }
    }).then(result => {
      this.username = result.data.data.users[0].username
      console.log(this.username);
    });
  }, 
  methods: {
  }
}
</script>