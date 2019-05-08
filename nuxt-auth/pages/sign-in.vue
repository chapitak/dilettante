<template>
  <section class="section">
    <div class="container">
      <h2 class="title">Sign In</h2>
      <Notification :message="error" v-if="error"/>
        <form method="post" @submit.prevent="login">
          <div class="field">
            <div class="control">
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
              ></v-text-field>
            </div>
          </div>
          <div class="field">
             <v-text-field
              v-model="password"
              :append-icon="show1 ? 'visibility' : 'visibility_off'"
              :rules="[rules.required]"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              label="Password"
              @click:append="show1 = !show1"
          ></v-text-field>
          </div>
          <div class="control">
            <v-btn type="submit" class="mr-0" style="display:block;float:right;">submit</v-btn>
          </div>
        </form>
        <br><br><br>
        <div class="has-text-centered" style="margin-top: 20px">
          <p>
            Don't have an account? <nuxt-link to="/register">Register</nuxt-link>
          </p>
          <v-btn href="http://jeongkyo.kim:1337/connect/google/" block class="login-button">Login with google</v-btn>
        </div>
    </div>
  </section>
</template>

<script>
import Notification from '~/components/Notification'

export default {
  components: {
    Notification,
  },
  middleware: 'guest',
  data() {
    return {
      email: '',
      password: '',
      error: null,
      show1: false,
      rules: {
        required: value => !!value || 'Required.',
      },
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
    }
  },

  methods: {
    async login() {
      try {
        await this.$auth.loginWith('local', {
          data:{
            identifier: this.email,
            password: this.password          
          }
        })
        this.$router.push('/')
      } catch (e) {
        this.error = e.response.data.message
      }
    }
  }
}
</script>