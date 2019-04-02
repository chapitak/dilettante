<template>
  <section class="section">
    <div class="container">
      <h1 class="title">review thread</h1>
      <ViewSingleReview/>
      <ViewSingleReview/>
    </div>
  </section>
</template>


<script>
import ViewSingleReview from '~/components/ViewSingleReview'

export default {
  components: {
    ViewSingleReview,
  },
  data() {
    return {
      email: '',
      password: ''
    }
  },

  methods: {
  }
}
</script>