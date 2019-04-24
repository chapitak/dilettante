<template>
  <div class="Comment pa-0 ma-0" v-if="props_post_id">
    <div id="read-comment">
      <v-list style="background:#fafafa">
        <template v-for="(comment, index) in comments">
          <!-- 정보가 있는 사용자 -->
          <v-list-tile v-if="comment.user != null" :key="comment.index">
            <v-list-tile-content>
              <v-list-tile-sub-title>{{comment.user.username}}</v-list-tile-sub-title>
              <v-layout justify-space-around row style="width:100%">
                <div style="width:100%" pa2>{{ comment.content }}</div>
                <div v-if="isAuthenticated" style="float:right">
                  <v-icon
                    @click="deleteComment(comment._id)"
                    small
                    color="red"
                    v-if="loggedInUser._id == comment.user._id"
                  >close</v-icon>
                </div>
              </v-layout>
            </v-list-tile-content>
            <!--<div
                :key="comment.index"
            >   {{comment.comment}}
            </div>-->
          </v-list-tile>
          <!-- 탈퇴한 사용자 -->
          <v-list-tile v-else :key="comment.index">
            <v-list-tile-content>
              <v-list-tile-sub-title>*탈퇴한 사용자*</v-list-tile-sub-title>
              <div style="width:100%" pa2>{{ comment.content }}</div>
            </v-list-tile-content>
            <!--<div
                :key="comment.index"
            >   {{comment.comment}}
            </div>-->
          </v-list-tile>

          <v-divider :key="comment.index" v-if="index+1 < comments.length"></v-divider>
        </template>
      </v-list>
    </div>

    <div id="write-comment" v-if="isAuthenticated">
      <!--<v-form v-model="valid">-->
      <v-form>
        <v-layout row>
          <v-flex grow>
            <v-textarea
              class="pa-2 ma-0"
              rows="1"
              name="Conent Textarea"
              label="코멘트를 작성해주세요"
              v-model="comment"
              required
            >{{comment}}</v-textarea>
          </v-flex>
          <v-flex shrink>
            <v-btn @click="sendComment()" style="float:right" class="mr-0 my-2">등록</v-btn>
          </v-flex>
        </v-layout>
      </v-form>
    </div>
    <div v-else class="text-xs-center">
      <br>코멘트를 남기려면 로그인을 해주세요
    </div>
  </div>
</template>



<script>
import { mapGetters } from "vuex";

export default {
  name: "Comment",
  props: ["props_post_id"],
  data() {
    return {
      comment: "",
      comments: []
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated", "loggedInUser"])
  },
  // watch: {
  //     props_post_id: function () {
  //             this.$axios({
  //             url: 'http://54.180.32.24:1337/graphql',
  //             method: 'post',
  //             data: {
  //                 query: `
  //                 query {
  //                     comments(where: {review: "`+this.props_post_id+`"}) {
  //                         content,
  //                         _id,
  //                         user {
  //                         username,
  //                         _id
  //                     },

  //                     }
  //                     }
  //                 `
  //             }
  //             }).then((result) => {
  //             //this.commentsdatsa = result.data.data.comments
  //             this.comments = result.data.data.comments
  //             console.log(this.comments)
  //             });
  //         console.log(this.comments)
  //     }
  // },
  mounted() {
    this.$axios({
      url: "http://54.180.32.24:1337/graphql",
      method: "post",
      data: {
        query:
          `
                    query {
                        comments(where: {post: "` +
          this.props_post_id +
          `"}) { 
                            content,
                            _id,
                            user {
                            username,
                            _id
                        },
                        
                        }
                        } 
                    `
      }
    }).then(result => {
      //this.commentsdatsa = result.data.data.comments
      this.comments = result.data.data.comments;
      console.log(this.comments);
    });
    console.log(this.comments);
  },

  methods: {
    sendComment() {
      if (this.comment == "") {
        alert("내용을 먼저 작성해주세요");
        return;
      }
      this.$axios
        .post(`http://jeongkyo.kim:1337/comments/`, {
          //post_id: this.props_post_id,
          register_id: this.loggedInUser._id,
          content: this.comment,
          post: this.props_post_id,
          user: this.loggedInUser._id
        })
        .then(response => {
          // Handle success.
          console.log(
            "Well done, your post has been successfully created: ",
            response.data
          );
        })
        .catch(error => {
          // Handle error.
          console.log("An error occurred:", error);
        });
      this.comments.push({
        content: this.comment,
        user: {
          username: this.loggedInUser.username,
          _id: this.loggedInUser._id
        }
      });
      this.comment = "";
    },
    deleteComment(cid) {
      console.log(cid);
      var r = confirm("정말 삭제하시곘습니까?");
      if (r == true) {
        this.$axios.delete(`http://jeongkyo.kim:1337/comments/` + cid)
          .then; /*(response => {
                    // Handle success.
                    console.log(
                    'Well done, your post has been successfully updated: ',
                    response.data
                    );
                
                })
                .catch(error => {
                    // Handle error.
                    console.log('An error occurred:', error);
                });*/
        const idx = this.comments.findIndex(function(item) {
          return item._id === cid;
        }); // findIndex = find + indexOf
        if (idx > -1) this.comments.splice(idx, 1);
      }
    }
  }
};
</script>

<style scoped>
.Comment {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 45px;
}
@media (max-width: 767px) {
  .Comment {
    padding: 15px;
  }
}
</style>

<style>
.Comment .v-list__tile {
  height: auto;
}
</style>