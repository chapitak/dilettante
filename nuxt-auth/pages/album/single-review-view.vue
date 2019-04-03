<template>
  <section class="section">
    <div class="container">
        <ViewSingleReview/>
    </div>
  </section>
</template>

<script>
import ViewSingleReview from '~/components/ViewSingleReview'

export default {
  data() {
    return {
      reviews: []
    }
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