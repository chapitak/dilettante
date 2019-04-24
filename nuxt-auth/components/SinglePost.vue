<template>
  <div class="post">
    <v-card>
      <div class="markdown-body" >
        <h1>{{post.title}}</h1>
        <div><span style="float:right">{{ String(post.createdAt).substring(0,10) }}</span></div><br>
        <div v-html = "post.text">
        </div>
      </div>
    </v-card>
    <PostComment :props_post_id="postId"/>
    <br>    
  </div>

</template>



<script>
import MarkDownIt from 'markdown-it'
import PostComment from '~/components/PostComment.vue'
export default {
  name: 'post',
  props: ['postId'],
  components: {
    PostComment
  },
  data() {
    return {
      post: [],
      errors: []
    }
  },
  methods: {
  },
  // Fetches posts when the component is created.
  mounted() {
    this.$axios.get(`http://54.180.32.24:1337/posts/`+this.postId)
    .then(response => {
      // JSON responses are automatically parsed.
     this.post = response.data
     var md = MarkDownIt()
     this.post.text = md.render(response.data.text)      
    })
    .catch(e => { 
      this.errors.push(e)
    })  
    
     
    
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