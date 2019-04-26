<template>
  <section class="section">
      <div><h1 class="title text-xs-center"><b>최신 포스트</b></h1></div>
        <br>
      <div v-for="post in posts" :key="post._id">
        <SinglePost :postId="post._id" />
      </div>
    <br>
    <div class="text-xs-center"><v-btn large @click="appendPosts()">더 보기</v-btn></div>
  </section>
</template>


<script>
import SinglePost from '~/components/SinglePost'

export default {
  components: {
    SinglePost,
  },
  data() {
    return {
      posts: [],
      page: 1,
      paging: 10
    }
  },
  mounted() {
    this.$axios.get('http://jeongkyo.kim:1337/posts?type_ne=logbook&_sort=createdAt:desc&_limit=' + this.paging)
      .then(response => {
        // Handle success.
        console.log(
          response.data
        );
        this.posts = response.data
    })
  }, 
  methods: {
      appendPosts() {
      this.$axios.get('http://jeongkyo.kim:1337/posts?type_ne=logbook&_sort=createdAt:desc&_limit=' + this.paging + '&_start=' + this.page*this.paging)
        .then(response => {
          // Handle success.
          console.log(
            response.data
          );
          this.posts = this.posts.concat(response.data)
      })

    }
  }
}
</script>

<style  scoped>
 @import "../assets/markdown.css"; 
	.markdown-body {
		box-sizing: border-box;
		min-width: 200px;
		max-width: 980px;
		margin: 0 auto;
		padding: 45px;
	}
	@media (max-width: 767px) {
		.markdown-body {
			padding: 15px;
		}
	}
</style>