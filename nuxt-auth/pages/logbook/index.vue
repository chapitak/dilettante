<template>
  <section class="section">
  <v-layout  row wrap> 
  <div class="logbook" style="width:100%;max-width: 800px;"> 
        <v-timeline dense clipped align-top class="px-0"> 
        
        <template
           v-for="(post, index) in posts"
           style="width:100%;"
             >
          <v-timeline-item
            class="mb-3 "
            color="grey"
            small
            style="min-width:200px"
            v-bind:key="index"
          >
          <span @click="open(post.id)" style="cursor: pointer;"><b>{{ post.title}}</b></span>
            
              <v-flex xs12 md12>
                <div v-if = "post.id == selected_id" >
                  <span style="white-space: pre-line;">
                    {{ post.text }}
                  </span>
                  <v-layout row wrap>              
                  <v-flex xs12 md4>
                    <PostComment :props_post_id="post.id"/>
                  </v-flex>
                  </v-layout>
                  <!-- <logbookContent :props_post_id="selected_id">  </logbookContent> -->
                </div>
              </v-flex>
            
          </v-timeline-item>
        
        </template>
        
        </v-timeline>
        
        
  </div>
  </v-layout>
  </section>
</template>

<script>
import PostComment from '~/components/PostComment.vue'
  export default {
    name: 'logbook',
    components: {
      PostComment
  },
    data() {
        return {
      posts: [],
      selected_id: ''
      
      }
    },
    mounted() {
        this.$axios.get(`http://54.180.32.24:1337/posts?_limit=10&type=logbook`, {
        params: {
        _sort: 'createdAt:desc' // Generates http://localhost:1337/posts?_sort=createdAt:desc
         }
        })
        .then(response => {
        // JSON responses are automatically parsed.
        
        this.posts = response.data
        this.selected_id = this.posts[0].id
        
        
        
        })
        .catch(e => {
        this.errors.push(e)
        })
      
    },
    methods:{
      open: function(post_id){
        this.selected_id = post_id
      }
    }
  }
</script>

<style >
.v-timeline--align-top .v-timeline-item__dot--small{
  top: 0;
}
</style>