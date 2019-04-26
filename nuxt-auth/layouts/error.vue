<template>
  <div class="container">
    <h1 v-if="error.statusCode === 404">페이지를 찾을 수 없어요.</h1>
    <h1 v-else>An error occurred</h1>
    <img src="/goyoung.png" width="100">
    <div>
        <br>
        대신에<br>
        귀여운<br>
        고영을<br>
        드리겠<br>
        습니다<br>
        
        <br>
    </div>
    <nuxt-link to="/">홈으로</nuxt-link>
  </div>
</template>

<script>
export default {
  props: ['error'],
  layout: 'default' // you can set a custom layout for the error page
}
</script>